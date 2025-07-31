import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const spaceTrackUser = process.env.SPACETRACK_USER;
    const spaceTrackPassword = process.env.SPACETRACK_PASSWORD;

    if (!spaceTrackUser || !spaceTrackPassword) {
      throw new Error('Space-Track credentials not found in environment variables.');
    }

    const { searchParams } = new URL(req.url);
    const noradId = searchParams.get('norad_id'); // NORAD ID of the object
    const date = searchParams.get('date'); // YYYY-MM-DD

    const url = `https://www.space-track.org/ajaxauth/login`;
    const loginResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `identity=${spaceTrackUser}&password=${spaceTrackPassword}`,
    });

    if (!loginResponse.ok) {
      throw new Error('Failed to log in to Space-Track.');
    }

    const tleUrl = `https://www.space-track.org/basicspacedata/query/class/tle_public/NORAD_CAT_ID/${noradId}/EPOCH/${date}/orderby/NORAD_CAT_ID%20asc/format/json`;
    const response = await fetch(tleUrl, {
      headers: {
        Cookie: loginResponse.headers.get('set-cookie') || '',
      },
    });
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
