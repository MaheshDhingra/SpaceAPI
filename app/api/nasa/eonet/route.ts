import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
      throw new Error('NASA API key not found in environment variables.');
    }

    const { searchParams } = new URL(req.url);
    const source = searchParams.get('source');
    const status = searchParams.get('status');
    const limit = searchParams.get('limit');

    let url = `https://eonet.gsfc.nasa.gov/api/v3/events?api_key=${NASA_API_KEY}`;
    if (source) {
      url += `&source=${source}`;
    }
    if (status) {
      url += `&status=${status}`;
    }
    if (limit) {
      url += `&limit=${limit}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.description || 'Failed to fetch EONET data from NASA API');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
