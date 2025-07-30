export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold text-center sm:text-left">SpaceAPI</h1>
        <p className="text-lg text-center sm:text-left max-w-prose">
          A space API for everything you might need from space.
        </p>

        <section className="w-full max-w-prose">
          <h2 className="text-2xl font-semibold mb-4">Core Features: Endpoints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-2">GET Endpoints</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/planets</code> – Get details about all planets in the Solar System (mass, radius, distance, moons).
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/stars</code> – Get information about stars (spectral type, magnitude, distance).
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/satellites</code> – Track real-time positions of major satellites like ISS.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/astronauts</code> – Get details about astronauts.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/cosmic-events</code> – Get information about cosmic events.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/launch-sites</code> – Get details about launch sites.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/rockets</code> – Get information about rockets.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/spaceports</code> – Get details about spaceports.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/celestial-bodies</code> – Get information about celestial bodies.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">POST Endpoints</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/observations</code> – Submit telescope observations (coordinates, time, object).
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/launches</code> – Add upcoming rocket launches to the database.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/missions</code> – Create custom mission logs for space exploration projects.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/astronauts</code> – Add new astronaut data.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/cosmic-events</code> – Add new cosmic event data.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/launch-sites</code> – Add new launch site data.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/rockets</code> – Add new rocket data.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/spaceports</code> – Add new spaceport data.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/celestial-bodies</code> – Add new celestial body data.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">PUT Endpoints</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/missions/:id</code> – Update details of a mission (status, results, objectives).
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/astronauts/:id</code> – Update astronaut details.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/cosmic-events/:id</code> – Update cosmic event details.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/launch-sites/:id</code> – Update launch site details.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/rockets/:id</code> – Update rocket details.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/spaceports/:id</code> – Update spaceport details.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/celestial-bodies/:id</code> – Update celestial body details.
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-2">DELETE Endpoint</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/missions/:id</code> – Delete a mission log.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/astronauts/:id</code> – Delete astronaut data.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/cosmic-events/:id</code> – Delete cosmic event data.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/launch-sites/:id</code> – Delete launch site data.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/rockets/:id</code> – Delete rocket data.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/spaceports/:id</code> – Delete spaceport data.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/celestial-bodies/:id</code> – Delete celestial body data.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="w-full max-w-prose">
          <h2 className="text-2xl font-semibold mb-4">NASA API Endpoints</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium mb-2">GET Endpoints (Proxy to NASA APIs)</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/apod</code> – Astronomy Picture of the Day.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/asteroids-neows</code> – Near Earth Object Web Service.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/donki</code> – Space Weather Database Of Notifications, Knowledge, Information.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/eonet</code> – The Earth Observatory Natural Event Tracker.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/epic</code> – Earth Polychromatic Imaging Camera.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/exoplanet</code> – Programmatic access to NASA's Exoplanet Archive database.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/gibs</code> – Global, full-resolution satellite imagery.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/insight</code> – Mars Weather Service API.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/mars-rover-photos</code> – Image data gathered by NASA's Mars rovers.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/image-video-library</code> – Access the NASA's Image and Video Library.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/open-science-data-repository</code> – Programmatic interface for the Open Science Data Repository.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/satellite-situation-center</code> – Geocentric spacecraft location information.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/ssd-cneos</code> – Solar System Dynamics and Center for Near-Earth Object Studies.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/techport</code> – NASA technology project data.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/techtransfer</code> – Patents, Software, and Tech Transfer Reports.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/tle</code> – Two line element data for earth-orbiting objects.
                </li>
                <li>
                  <code className="bg-black/[.05] dark:bg-white/[.06] font-mono font-semibold px-1 py-0.5 rounded">/api/nasa/vesta-moon-mars-trek-wmts</code> – Web Map Tile Service for Vesta, Moon, and Mars Trek imagery.
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="w-full max-w-prose">
          <h2 className="text-2xl font-semibold mb-4">Database</h2>
          <p className="text-lg">
            Stores planets, stars, satellite data, user observations, and mission logs in PostgreSQL.
          </p>
        </section>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <p className="text-sm text-center">SpaceAPI - Built with Next.js and TypeScript</p>
      </footer>
    </div>
  );
}
