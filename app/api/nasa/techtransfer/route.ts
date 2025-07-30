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
    const type = searchParams.get('type'); // 'patent', 'software', 'report'
    const page = searchParams.get('page');

    let url = `https://api.nasa.gov/techtransfer/patent/?api_key=${NASA_API_KEY}`; // Default to patent
    if (type === 'software') {
      url = `https://api.nasa.gov/techtransfer/software/?api_key=${NASA_API_KEY}`;
    } else if (type === 'report') {
      url = `https://api.nasa.gov/techtransfer/report/?api_key=${NASA_API_KEY}`;
    }

    if (query) {
      url += `&query=${query}`;
    }
    if (page) {
      url += `&page=${page}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch TechTransfer data from NASA API');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
