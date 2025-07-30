import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
      throw new Error('NASA API key not found in environment variables.');
    }

    const { searchParams } = new URL(req.url);
    const q = searchParams.get('q'); // search term
    const mediaType = searchParams.get('media_type'); // 'image', 'video', 'audio'
    const yearStart = searchParams.get('year_start');
    const yearEnd = searchParams.get('year_end');
    const page = searchParams.get('page');

    let url = `https://images-api.nasa.gov/search?api_key=${NASA_API_KEY}`;
    if (q) {
      url += `&q=${q}`;
    }
    if (mediaType) {
      url += `&media_type=${mediaType}`;
    }
    if (yearStart) {
      url += `&year_start=${yearStart}`;
    }
    if (yearEnd) {
      url += `&year_end=${yearEnd}`;
    }
    if (page) {
      url += `&page=${page}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.reason || 'Failed to fetch NASA Image and Video Library data from NASA API');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
