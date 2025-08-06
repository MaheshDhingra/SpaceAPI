"use client";

import { useState } from 'react';
import ApiTest from './components/ApiTest';

export default function Home() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [token, setToken] = useState<string | null>(null);
  const [authMessage, setAuthMessage] = useState('');
  const [protectedMessage, setProtectedMessage] = useState('');

  const handleAuth = async (type: 'register' | 'login') => {
    setAuthMessage('');
    setToken(null);
    try {
      const response = await fetch('/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, type }),
      });
      const data = await response.json();
      if (response.ok) {
        setAuthMessage(data.message);
        setToken(data.token);
      } else {
        setAuthMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      setAuthMessage('Network error during authentication.');
      console.error('Authentication fetch error:', error);
    }
  };

  const handleProtectedPost = async () => {
    setProtectedMessage('');
    if (!token) {
      setProtectedMessage('Please log in first to get a token.');
      return;
    }
    try {
      const response = await fetch('/api/protected', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ protectedData: 'This is sensitive data!' }),
      });
      const data = await response.json();
      if (response.ok) {
        setProtectedMessage(`Success: ${data.message}`);
      } else {
        setProtectedMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setProtectedMessage('Network error during protected POST.');
      console.error('Protected POST fetch error:', error);
    }
  };

  return (
    <div>
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">JWT Authentication</h2>
        <div className="flex flex-col space-y-4 p-4 border rounded-lg shadow-md">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded"
          />
          <div className="flex space-x-2">
            <button
              onClick={() => handleAuth('register')}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Register
            </button>
            <button
              onClick={() => handleAuth('login')}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Login
            </button>
          </div>
          {authMessage && <p className="mt-2 text-sm text-gray-700">{authMessage}</p>}
          {token && (
            <div className="mt-4 p-2 bg-gray-100 rounded">
              <p className="font-semibold">JWT Token:</p>
              <textarea
                readOnly
                value={token}
                className="w-full h-24 p-2 border rounded bg-gray-50 text-sm break-all"
              />
            </div>
          )}
          <button
            onClick={handleProtectedPost}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 mt-4"
            disabled={!token}
          >
            Test Protected POST
          </button>
          {protectedMessage && <p className="mt-2 text-sm text-gray-700">{protectedMessage}</p>}
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Core Features: Endpoints</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-2">GET Endpoints</h3>
            <ApiTest endpoint="/api/planets" method="GET" />
            <ApiTest endpoint="/api/stars" method="GET" />
            <ApiTest endpoint="/api/satellites" method="GET" />
            <ApiTest endpoint="/api/astronauts" method="GET" />
            <ApiTest endpoint="/api/cosmic-events" method="GET" />
            <ApiTest endpoint="/api/launch-sites" method="GET" />
            <ApiTest endpoint="/api/rockets" method="GET" />
            <ApiTest endpoint="/api/spaceports" method="GET" />
            <ApiTest endpoint="/api/celestial-bodies" method="GET" />
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">POST Endpoints</h3>
            <ApiTest endpoint="/api/observations" method="POST" body={{ coordinates: '45.0, 45.0', time: '2024-01-01T00:00:00Z', object: 'Mars' }} />
            <ApiTest endpoint="/api/launches" method="POST" body={{ rocket: 'Falcon 9', date: '2024-12-31' }} />
            <ApiTest endpoint="/api/missions" method="POST" body={{ name: 'My Mission', objective: 'Explore Mars' }} />
            <ApiTest endpoint="/api/astronauts" method="POST" body={{ name: 'John Doe', rank: 'Commander' }} />
            <ApiTest endpoint="/api/cosmic-events" method="POST" body={{ name: 'Meteor Shower', date: '2024-08-12' }} />
            <ApiTest endpoint="/api/launch-sites" method="POST" body={{ name: 'Cape Canaveral', location: 'Florida, USA' }} />
            <ApiTest endpoint="/api/rockets" method="POST" body={{ name: 'Saturn V', company: 'NASA' }} />
            <ApiTest endpoint="/api/spaceports" method="POST" body={{ name: 'Baikonur Cosmodrome', location: 'Kazakhstan' }} />
            <ApiTest endpoint="/api/celestial-bodies" method="POST" body={{ name: 'Pluto', type: 'Dwarf Planet' }} />
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">PUT Endpoints</h3>
            <ApiTest endpoint="/api/missions/:id" method="PUT" params={['id']} body={{ status: 'Completed' }} />
            <ApiTest endpoint="/api/astronauts/:id" method="PUT" params={['id']} body={{ rank: 'Captain' }} />
            <ApiTest endpoint="/api/cosmic-events/:id" method="PUT" params={['id']} body={{ description: 'Annual meteor shower' }} />
            <ApiTest endpoint="/api/launch-sites/:id" method="PUT" params={['id']} body={{ status: 'Active' }} />
            <ApiTest endpoint="/api/rockets/:id" method="PUT" params={['id']} body={{ status: 'Retired' }} />
            <ApiTest endpoint="/api/spaceports/:id" method="PUT" params={['id']} body={{ operator: 'Roscosmos' }} />
            <ApiTest endpoint="/api/celestial-bodies/:id" method="PUT" params={['id']} body={{ moons: 5 }} />
          </div>
          <div>
            <h3 className="text-xl font-medium mb-2">DELETE Endpoint</h3>
            <ApiTest endpoint="/api/missions/:id" method="DELETE" params={['id']} />
            <ApiTest endpoint="/api/astronauts/:id" method="DELETE" params={['id']} />
            <ApiTest endpoint="/api/cosmic-events/:id" method="DELETE" params={['id']} />
            <ApiTest endpoint="/api/launch-sites/:id" method="DELETE" params={['id']} />
            <ApiTest endpoint="/api/rockets/:id" method="DELETE" params={['id']} />
            <ApiTest endpoint="/api/spaceports/:id" method="DELETE" params={['id']} />
            <ApiTest endpoint="/api/celestial-bodies/:id" method="DELETE" params={['id']} />
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">NASA API Endpoints</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-medium mb-2">GET Endpoints (Proxy to NASA APIs)</h3>
            <ApiTest endpoint="/api/nasa/apod" method="GET" />
            <ApiTest endpoint="/api/nasa/asteroids-neows" method="GET" />
            <ApiTest endpoint="/api/nasa/donki" method="GET" />
            <ApiTest endpoint="/api/nasa/eonet" method="GET" />
            <ApiTest endpoint="/api/nasa/epic" method="GET" />
            <ApiTest endpoint="/api/nasa/exoplanet" method="GET" />
            <ApiTest endpoint="/api/nasa/gibs" method="GET" />
            <ApiTest endpoint="/api/nasa/insight" method="GET" />
            <ApiTest endpoint="/api/nasa/mars-rover-photos" method="GET" />
            <ApiTest endpoint="/api/nasa/image-video-library" method="GET" />
            <ApiTest endpoint="/api/nasa/open-science-data-repository" method="GET" />
            <ApiTest endpoint="/api/nasa/satellite-situation-center" method="GET" />
            <ApiTest endpoint="/api/nasa/ssd-cneos" method="GET" />
            <ApiTest endpoint="/api/nasa/techport" method="GET" />
            <ApiTest endpoint="/api/nasa/techtransfer" method="GET" />
            <ApiTest endpoint="/api/nasa/tle" method="GET" />
            <ApiTest endpoint="/api/nasa/vesta-moon-mars-trek-wmts" method="GET" />
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Database</h2>
        <p className="text-lg">
          Stores planets, stars, satellite data, user observations, and mission logs in PostgreSQL.
        </p>
      </section>
    </div>
  );
}
