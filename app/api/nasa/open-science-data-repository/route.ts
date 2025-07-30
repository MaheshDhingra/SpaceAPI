import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
      throw new Error('NASA API key not found in environment variables.');
    }

    const { searchParams } = new URL(req.url);
    const query = searchParams.get('query');
    const page = searchParams.get('page');
    const pageSize = searchParams.get('page_size');

    let url = `https://osdr.nasa.gov/osdr/api/search?api_key=${NASA_API_KEY}`;
    if (query) {
      url += `&query=${query}`;
    }
    if (page) {
      url += `&page=${page}`;
    }
    if (pageSize) {
      url += `&page_size=${pageSize}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch Open Science Data Repository data from NASA API');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
