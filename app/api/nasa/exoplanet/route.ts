import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
      throw new Error('NASA API key not found in environment variables.');
    }

    const { searchParams } = new URL(req.url);
    const table = searchParams.get('table'); // e.g., 'exoplanets', 'compositepars'
    const select = searchParams.get('select'); // comma-separated list of columns
    const where = searchParams.get('where'); // SQL WHERE clause
    const order = searchParams.get('order'); // SQL ORDER BY clause
    const limit = searchParams.get('limit'); // SQL LIMIT clause

    let url = `https://exoplanetarchive.ipac.caltech.edu/cgi-bin/nstedAPI/nph-nstedAPI?table=${table}&format=json&api_key=${NASA_API_KEY}`;
    if (select) {
      url += `&select=${select}`;
    }
    if (where) {
      url += `&where=${where}`;
    }
    if (order) {
      url += `&order=${order}`;
    }
    if (limit) {
      url += `&limit=${limit}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch Exoplanet data from NASA API: ${errorText}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
