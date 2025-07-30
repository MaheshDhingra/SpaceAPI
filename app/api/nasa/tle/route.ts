import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
      throw new Error('NASA API key not found in environment variables.');
    }

    const { searchParams } = new URL(req.url);
    const noradId = searchParams.get('norad_id'); // NORAD ID of the object
    const date = searchParams.get('date'); // YYYY-MM-DD

    const url = `https://www.space-track.org/basicspacedata/query/class/tle_public/NORAD_CAT_ID/${noradId}/EPOCH/${date}/orderby/NORAD_CAT_ID%20asc/format/json/api_key/${NASA_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch TLE data from Space-Track API: ${errorText}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
