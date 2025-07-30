import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
      throw new Error('NASA API key not found in environment variables.');
    }

    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type'); // e.g., 'CME', 'FLR', 'SEP', 'MPC', 'GST', 'RBE', 'IPS', 'WS', 'SSC'
    const startDate = searchParams.get('start_date');
    const endDate = searchParams.get('end_date');

    let url = `https://api.nasa.gov/DONKI/${type}?api_key=${NASA_API_KEY}`;
    if (startDate) {
      url += `&startDate=${startDate}`;
    }
    if (endDate) {
      url += `&endDate=${endDate}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Failed to fetch DONKI data from NASA API');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
