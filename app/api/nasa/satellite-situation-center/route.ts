import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
      throw new Error('NASA API key not found in environment variables.');
    }

    const { searchParams } = new URL(req.url);
    const spacecraftId = searchParams.get('spacecraft_id');
    const startTime = searchParams.get('start_time'); // YYYY-MM-DDTHH:MM:SSZ
    const endTime = searchParams.get('end_time'); // YYYY-MM-DDTHH:MM:SSZ

    let url = `https://sscweb.gsfc.nasa.gov/WS/sscr/2/locations/${spacecraftId}/${startTime}/${endTime}?api_key=${NASA_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch Satellite Situation Center data from NASA API: ${errorText}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
