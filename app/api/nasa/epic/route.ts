import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
      throw new Error('NASA API key not found in environment variables.');
    }

    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date'); // YYYY-MM-DD
    const archive = searchParams.get('archive') || 'natural'; // 'natural' or 'enhanced'

    let url = `https://api.nasa.gov/EPIC/api/${archive}/date/${date}?api_key=${NASA_API_KEY}`;
    if (!date) {
      url = `https://api.nasa.gov/EPIC/api/${archive}/all?api_key=${NASA_API_KEY}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Failed to fetch EPIC data from NASA API');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
