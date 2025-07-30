import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
      throw new Error('NASA API key not found in environment variables.');
    }

    const { searchParams } = new URL(req.url);
    const rover = searchParams.get('rover'); // 'curiosity', 'opportunity', 'spirit'
    const sol = searchParams.get('sol'); // Martian sol (day)
    const earthDate = searchParams.get('earth_date'); // Earth date YYYY-MM-DD
    const camera = searchParams.get('camera'); // FHAZ, RHAZ, MAST, CHEMCAM, MAHLI, MARDI, NAVCAM, PANCAM, MINITES
    const page = searchParams.get('page');

    let url = `https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?api_key=${NASA_API_KEY}`;
    if (sol) {
      url += `&sol=${sol}`;
    } else if (earthDate) {
      url += `&earth_date=${earthDate}`;
    } else {
      throw new Error('Either "sol" or "earth_date" parameter is required.');
    }

    if (camera) {
      url += `&camera=${camera}`;
    }
    if (page) {
      url += `&page=${page}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.errors || 'Failed to fetch Mars Rover Photos data from NASA API');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
