import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
      throw new Error('NASA API key not found in environment variables.');
    }

    const { searchParams } = new URL(req.url);
    const projectId = searchParams.get('project_id');
    const search = searchParams.get('search');
    const year = searchParams.get('year');

    let url = `https://api.nasa.gov/techport/api/v1/projects?api_key=${NASA_API_KEY}`;
    if (projectId) {
      url = `https://api.nasa.gov/techport/api/v1/projects/${projectId}?api_key=${NASA_API_KEY}`;
    } else if (search) {
      url += `&q=${search}`;
    }
    if (year) {
      url += `&year=${year}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to fetch Techport data from NASA API');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
