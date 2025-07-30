import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET() {
  try {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
      throw new Error('NASA API key not found in environment variables.');
    }

    const response = await fetch(`https://api.nasa.gov/insight_weather/?api_key=${NASA_API_KEY}&feedtype=json&ver=1.0`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.msg || 'Failed to fetch Insight Mars Weather data from NASA API');
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return handleError(error);
  }
}
