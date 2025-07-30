import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
      throw new Error('NASA API key not found in environment variables.');
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type'); // e.g., 'cad', 'sentry', 'fireball'
    const date = searchParams.get('date'); // YYYY-MM-DD for fireball

    let url = `https://ssd-api.jpl.nasa.gov/cad.api?api_key=${NASA_API_KEY}`; // Default to CAD
    if (type === 'sentry') {
      url = `https://ssd-api.jpl.nasa.gov/sentry.api?api_key=${NASA_API_KEY}`;
    } else if (type === 'fireball' && date) {
      url = `https://ssd-api.jpl.nasa.gov/fireball.api?date-min=${date}&date-max=${date}&api_key=${NASA_API_KEY}`;
    } else if (type === 'fireball') {
      url = `https://ssd-api.jpl.nasa.gov/fireball.api?api_key=${NASA_API_KEY}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch SSD/CNEOS data from NASA API');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
