-- Create planets table
CREATE TABLE IF NOT EXISTS planets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mass NUMERIC,
    radius NUMERIC,
    distance NUMERIC,
    moons INTEGER,
    type VARCHAR(50),
    orbital_period_days NUMERIC
);

-- Create stars table
CREATE TABLE IF NOT EXISTS stars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    spectral_type VARCHAR(50),
    magnitude NUMERIC,
    distance_light_years NUMERIC,
    constellation VARCHAR(255)
);

-- Create satellites table
CREATE TABLE IF NOT EXISTS satellites (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    norad_id VARCHAR(50),
    latitude NUMERIC,
    longitude NUMERIC,
    altitude_km NUMERIC,
    velocity_km_s NUMERIC,
    launch_date DATE
);

-- Create observations table
CREATE TABLE IF NOT EXISTS observations (
    id SERIAL PRIMARY KEY,
    observer_name VARCHAR(255),
    coordinates VARCHAR(255) NOT NULL,
    time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    object_name VARCHAR(255) NOT NULL,
    telescope_used VARCHAR(255),
    notes TEXT
);

-- Create missions table
CREATE TABLE IF NOT EXISTS missions (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    objectives TEXT,
    start_date DATE,
    end_date DATE,
    status VARCHAR(50),
    results TEXT,
    agency VARCHAR(255),
    cost_usd NUMERIC
);

-- Create astronauts table
CREATE TABLE IF NOT EXISTS astronauts (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    nationality VARCHAR(255),
    birth_date DATE,
    missions_count INTEGER
);

-- Create cosmic_events table
CREATE TABLE IF NOT EXISTS cosmic_events (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(255),
    date DATE,
    description TEXT,
    galaxy VARCHAR(255)
);

-- Create launch_sites table
CREATE TABLE IF NOT EXISTS launch_sites (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    country VARCHAR(255)
);

-- Create rockets table
CREATE TABLE IF NOT EXISTS rockets (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    manufacturer VARCHAR(255),
    height_m NUMERIC,
    mass_kg NUMERIC,
    payload_capacity_kg NUMERIC
);

-- Create spaceports table (similar to launch sites but broader)
CREATE TABLE IF NOT EXISTS spaceports (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    country VARCHAR(255),
    operational_status VARCHAR(50)
);

-- Create celestial_bodies table (for general celestial objects)
CREATE TABLE IF NOT EXISTS celestial_bodies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50),
    discovery_date DATE,
    discovered_by VARCHAR(255)
);

-- Insert sample data for planets
INSERT INTO planets (name, mass, radius, distance, moons, type, orbital_period_days) VALUES
('Mercury', 3.301e23, 2439.7, 57.9e6, 0, 'Terrestrial', 87.97),
('Venus', 4.867e24, 6051.8, 108.2e6, 0, 'Terrestrial', 224.7),
('Earth', 5.972e24, 6371, 149.6e6, 1, 'Terrestrial', 365.25),
('Mars', 6.39e23, 3389.5, 227.9e6, 2, 'Terrestrial', 687),
('Jupiter', 1.898e27, 69911, 778.5e6, 79, 'Gas Giant', 4332.59),
('Saturn', 5.683e26, 58232, 1433.5e6, 82, 'Gas Giant', 10759.22),
('Uranus', 8.681e25, 25362, 2872.5e6, 27, 'Ice Giant', 30688.5),
('Neptune', 1.024e26, 24622, 4495.1e6, 14, 'Ice Giant', 60182),
('Pluto', 1.309e22, 1188.3, 5.9e9, 5, 'Dwarf Planet', 90560),
('Eris', 1.66e22, 1163, 10.1e9, 1, 'Dwarf Planet', 203830);

-- Insert sample data for stars
INSERT INTO stars (name, spectral_type, magnitude, distance_light_years, constellation) VALUES
('Sun', 'G2V', -26.74, 0.000015813, 'N/A'),
('Sirius', 'A1V', -1.46, 8.6, 'Canis Major'),
('Alpha Centauri A', 'G2V', 0.01, 4.37, 'Centaurus'),
('Alpha Centauri B', 'K1V', 1.33, 4.37, 'Centaurus'),
('Proxima Centauri', 'M5.5V', 11.05, 4.24, 'Centaurus'),
('Vega', 'A0V', 0.03, 25.04, 'Lyra'),
('Betelgeuse', 'M1-2Ia-Iab', 0.42, 642.5, 'Orion'),
('Rigel', 'B8Ia', 0.13, 863, 'Orion'),
('Deneb', 'A2Ia', 1.25, 2615, 'Cygnus'),
('Altair', 'A7V', 0.77, 16.7, 'Aquila');

-- Insert sample data for satellites
INSERT INTO satellites (name, norad_id, latitude, longitude, altitude_km, velocity_km_s, launch_date) VALUES
('ISS', '25544', 51.7, 10.2, 408, 7.66, '1998-11-20'),
('Hubble Space Telescope', '20580', 28.5, 15.1, 535, 7.59, '1990-04-24'),
('Starlink-1001', '44712', 45.1, -70.5, 550, 7.6, '2019-11-11'),
('Sentinel-2A', '40908', 30.0, 20.0, 786, 7.49, '2015-06-23'),
('Terra', '25994', -15.0, 40.0, 705, 7.5, '1999-12-18'),
('GOES-16', '41866', 0.0, -75.2, 35786, 3.07, '2016-11-19'),
('GPS IIF-12', '41484', 0.0, 100.0, 20200, 3.87, '2016-02-05'),
('Aqua', '27424', -20.0, -10.0, 705, 7.5, '2002-05-04');

-- Insert sample data for observations
INSERT INTO observations (observer_name, coordinates, time, object_name, telescope_used, notes) VALUES
('John Doe', 'RA 10h 30m, Dec +20d 15m', '2023-01-15 22:00:00+00', 'Orion Nebula', 'Celestron 8"', 'Clear night, excellent visibility.'),
('Jane Smith', 'RA 05h 35m, Dec -05d 22m', '2023-02-20 01:30:00+00', 'Jupiter', 'Meade LX200', 'Saw 4 Galilean moons.'),
('Alice Brown', 'RA 14h 00m, Dec +50d 00m', '2023-03-10 23:45:00+00', 'Andromeda Galaxy', 'Dobsonian 10"', 'Faint but visible spiral arms.'),
('Robert Green', 'RA 00h 42m, Dec +41d 16m', '2023-04-05 20:00:00+00', 'Triangulum Galaxy', 'Refractor 4"', 'Smaller than Andromeda, but still impressive.'),
('Emily White', 'RA 18h 51m, Dec +33d 00m', '2023-05-12 00:10:00+00', 'Ring Nebula', 'SCT 11"', 'Distinct donut shape visible.');

-- Insert sample data for missions
INSERT INTO missions (name, objectives, start_date, end_date, status, results, agency, cost_usd) VALUES
('Apollo 11', 'First human lunar landing', '1969-07-16', '1969-07-24', 'Completed', 'Successful lunar landing and return.', 'NASA', 25000000000),
('Mars Rover Perseverance', 'Seek signs of ancient microbial life, collect rock and soil samples', '2020-07-30', NULL, 'Active', NULL, 'NASA', 2700000000),
('Voyager 1', 'Study outer planets and interstellar space', '1977-09-05', NULL, 'Active', 'First spacecraft to enter interstellar space.', 'NASA', 865000000),
('James Webb Space Telescope', 'Observe the universe in infrared, study exoplanets', '2021-12-25', NULL, 'Active', 'Revolutionizing astronomy with unprecedented images.', 'NASA, ESA, CSA', 10000000000),
('New Horizons', 'First reconnaissance of Pluto and its moons', '2006-01-19', NULL, 'Extended Mission', 'Successfully flew by Pluto and Arrokoth.', 'NASA', 700000000);

-- Insert sample data for astronauts
INSERT INTO astronauts (name, nationality, birth_date, missions_count) VALUES
('Neil Armstrong', 'American', '1930-08-05', 2),
('Buzz Aldrin', 'American', '1930-01-20', 1),
('Yuri Gagarin', 'Russian', '1934-03-09', 1),
('Valentina Tereshkova', 'Russian', '1937-03-06', 1),
('Sally Ride', 'American', '1951-05-26', 2),
('Chris Hadfield', 'Canadian', '1959-08-29', 3),
('Sunita Williams', 'American', '1965-09-19', 2);

-- Insert sample data for cosmic_events
INSERT INTO cosmic_events (name, type, date, description, galaxy) VALUES
('Supernova 1987A', 'Supernova', '1987-02-24', 'A supernova in the Large Magellanic Cloud.', 'Large Magellanic Cloud'),
('Perseid Meteor Shower', 'Meteor Shower', '2023-08-12', 'Annual meteor shower associated with the comet Swift–Tuttle.', 'Milky Way'),
('Great Conjunction', 'Planetary Conjunction', '2020-12-21', 'Jupiter and Saturn appeared closest in the night sky.', 'Milky Way'),
('Total Solar Eclipse', 'Solar Eclipse', '2024-04-08', 'A total solar eclipse visible across North America.', 'Milky Way'),
('Gamma-Ray Burst GRB 080319B', 'Gamma-Ray Burst', '2008-03-19', 'The brightest object ever observed by human eyes in the universe.', 'Unknown');

-- Insert sample data for launch_sites
INSERT INTO launch_sites (name, location, country) VALUES
('Cape Canaveral Space Force Station', 'Florida', 'USA'),
('Baikonur Cosmodrome', 'Kazakhstan', 'Kazakhstan'),
('Guiana Space Centre', 'Kourou', 'French Guiana'),
('Vandenberg Space Force Base', 'California', 'USA'),
('Xichang Satellite Launch Center', 'Sichuan', 'China');

-- Insert sample data for rockets
INSERT INTO rockets (name, manufacturer, height_m, mass_kg, payload_capacity_kg) VALUES
('Saturn V', 'Boeing, North American Aviation, Douglas, IBM', 110.6, 2970000, 43500),
('Falcon 9', 'SpaceX', 70, 549000, 22800),
('Soyuz-2', 'Progress Rocket Space Centre', 46.3, 313000, 7800),
('Atlas V', 'Lockheed Martin', 58.3, 334500, 18500),
('Ariane 5', 'ArianeGroup', 54.6, 780000, 21000);

-- Insert sample data for spaceports
INSERT INTO spaceports (name, location, country, operational_status) VALUES
('Kennedy Space Center', 'Florida', 'USA', 'Operational'),
('Vostochny Cosmodrome', 'Amur Oblast', 'Russia', 'Operational'),
('Jiuquan Satellite Launch Center', 'Gansu', 'China', 'Operational'),
('Tanegashima Space Center', 'Kagoshima', 'Japan', 'Operational'),
('European Spaceport', 'Kourou', 'French Guiana', 'Operational');

-- Insert sample data for celestial_bodies
INSERT INTO celestial_bodies (name, type, discovery_date, discovered_by) VALUES
('Pluto', 'Dwarf Planet', '1930-02-18', 'Clyde Tombaugh'),
('Eris', 'Dwarf Planet', '2005-01-05', 'Michael E. Brown, Chad Trujillo, David L. Rabinowitz'),
('Halley''s Comet', 'Comet', NULL, 'Edmond Halley'),
('Kepler-186f', 'Exoplanet', '2014-04-17', 'NASA Kepler Space Telescope'),
('Messier 87', 'Galaxy', '1781-03-18', 'Charles Messier');

-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
