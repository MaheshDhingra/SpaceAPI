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
    <>
      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">JWT Authentication</h2>
        <form onSubmit={(e) => { e.preventDefault(); /* Prevent default form submission */ }}>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <div className="flex space-x-4 justify-center">
              <button
                type="button" /* Use type="button" to prevent form submission */
                onClick={() => handleAuth('register')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 text-lg font-semibold"
              >
                Register
              </button>
              <button
                type="button" /* Use type="button" to prevent form submission */
                onClick={() => handleAuth('login')}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 text-lg font-semibold"
              >
                Login
              </button>
            </div>
          {authMessage && <p className="mt-4 text-center text-base text-gray-700">{authMessage}</p>}
          {token && (
            <div className="mt-6 p-4 bg-gray-100 rounded-lg">
              <p className="font-semibold text-lg mb-2">JWT Token:</p>
              <textarea
                readOnly
                value={token}
                className="w-full h-32 p-3 border rounded-lg bg-gray-50 text-sm break-all resize-y"
              />
            </div>
          )}
          <button
            onClick={handleProtectedPost}
            className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 mt-6 text-lg font-semibold"
            disabled={!token}
          >
            Test Protected POST
          </button>
          {protectedMessage && <p className="mt-4 text-center text-base text-gray-700">{protectedMessage}</p>}
          </div>
        </form>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Core Features: Endpoints</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">GET Endpoints</h3>
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
            <h3 className="text-xl font-semibold mb-4 text-gray-800">POST Endpoints</h3>
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
            <h3 className="text-xl font-semibold mb-4 text-gray-800">PUT Endpoints</h3>
            <ApiTest endpoint="/api/missions/:id" method="PUT" params={['id']} body={{ status: 'Completed' }} />
            <ApiTest endpoint="/api/astronauts/:id" method="PUT" params={['id']} body={{ rank: 'Captain' }} />
            <ApiTest endpoint="/api/cosmic-events/:id" method="PUT" params={['id']} body={{ description: 'Annual meteor shower' }} />
            <ApiTest endpoint="/api/launch-sites/:id" method="PUT" params={['id']} body={{ status: 'Active' }} />
            <ApiTest endpoint="/api/rockets/:id" method="PUT" params={['id']} body={{ status: 'Retired' }} />
            <ApiTest endpoint="/api/spaceports/:id" method="PUT" params={['id']} body={{ operator: 'Roscosmos' }} />
            <ApiTest endpoint="/api/celestial-bodies/:id" method="PUT" params={['id']} body={{ moons: 5 }} />
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">DELETE Endpoint</h3>
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

      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">NASA API Endpoints</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800">GET Endpoints (Proxy to NASA APIs)</h3>
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
        <h2 className="text-3xl font-bold mb-6 text-center">Database Information</h2>
        <p className="text-lg text-center text-gray-700">
          This application stores planets, stars, satellite data, user observations, and mission logs in a PostgreSQL database.
        </p>
      </section>
    </>
  );
}
