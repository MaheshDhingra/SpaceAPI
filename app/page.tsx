import ApiTest from './components/ApiTest';

export default function Home() {
  return (
    <div>
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
