'use client';

import { useState } from 'react';

interface ApiTestProps {
  endpoint: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  params?: string[];
  body?: object;
}

type ApiResponse = Record<string, unknown> | { error: string } | null;

export default function ApiTest({ endpoint, method, params = [], body: defaultBody }: ApiTestProps) {
  const [response, setResponse] = useState<ApiResponse>(null);
  const [loading, setLoading] = useState(false);
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [body, setBody] = useState(defaultBody ? JSON.stringify(defaultBody, null, 2) : '');

  // Generate a unique and valid ID prefix for this component instance
  const uniqueIdPrefix = `${endpoint.replace(/[^a-zA-Z0-9]/g, '_')}-${method.toLowerCase()}`;

  const handleParamChange = (param: string, value: string) => {
    setParamValues({ ...paramValues, [param]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    let url = endpoint;
    if (params.length > 0) {
      url = params.reduce((acc, param) => acc.replace(`:${param}`, paramValues[param]), endpoint);
    }

    try {
      const options: RequestInit = {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (method === 'POST' || method === 'PUT') {
        options.body = body;
      }

      const res = await fetch(url, options);
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error(error);
      setResponse({ error: 'Failed to fetch' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="border p-4 rounded-lg mb-4 shadow-md dark:shadow-gray-700">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center mb-4">
          <span className={`font-bold text-lg ${
            method === 'GET' ? 'text-green-600 dark:text-green-400' :
            method === 'POST' ? 'text-blue-600 dark:text-blue-400' :
            method === 'PUT' ? 'text-yellow-600 dark:text-yellow-400' :
            'text-red-600 dark:text-red-400'
          }`}>{method}</span>
          <code className="ml-4 bg-gray-100 dark:bg-gray-800 p-2 rounded text-lg">{endpoint}</code>
        </div>
        {params.map((param) => (
          <div key={param} className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor={`${uniqueIdPrefix}-${param}`}>{param}</label>
            <input
              id={`${uniqueIdPrefix}-${param}`}
              type="text"
              value={paramValues[param] || ''}
              onChange={(e) => handleParamChange(param, e.target.value)}
              className="w-full p-2 border rounded bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        ))}
        {(method === 'POST' || method === 'PUT') && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1" htmlFor={`${uniqueIdPrefix}-body`}>Body</label>
            <textarea
              id={`${uniqueIdPrefix}-body`}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full p-2 border rounded font-mono bg-gray-50 dark:bg-gray-700 focus:ring-2 focus:ring-blue-500"
              rows={5}
            />
          </div>
        )}
        <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors" disabled={loading}>
          {loading ? 'Loading...' : 'Test'}
        </button>
      </form>
      {response && (
        <div className="mt-4">
          <h4 className="font-semibold text-lg">Response</h4>
          <pre className="bg-gray-100 dark:bg-black p-4 rounded overflow-auto mt-2">
            {JSON.stringify(response, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
