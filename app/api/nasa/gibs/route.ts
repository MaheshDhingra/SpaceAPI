import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
      throw new Error('NASA API key not found in environment variables.');
    }

    const { searchParams } = new URL(req.url);
    const layer = searchParams.get('layer');
    const time = searchParams.get('time'); // YYYY-MM-DD
    const bbox = searchParams.get('bbox'); // minx,miny,maxx,maxy
    const width = searchParams.get('width');
    const height = searchParams.get('height');
    const format = searchParams.get('format') || 'image/jpeg';

    // GIBS API is complex and often uses WMS/WMTS. This is a simplified proxy.
    // A full implementation would require more sophisticated WMS/WMTS client logic.
    // For demonstration, we'll construct a basic WMS GetMap request.
    const url = `https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi?SERVICE=WMS&REQUEST=GetMap&VERSION=1.3.0&LAYERS=${layer}&STYLES=&FORMAT=${format}&CRS=EPSG:4326&BBOX=${bbox}&WIDTH=${width}&HEIGHT=${height}&TIME=${time}&api_key=${NASA_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch GIBS data from NASA API: ${errorText}`);
    }
    // GIBS often returns images, so we might need to handle different content types.
    // For now, we'll assume JSON or text for error handling, and pass through for success.
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await response.json();
      return NextResponse.json(data);
    } else {
      const data = await response.arrayBuffer(); // Handle as binary data (e.g., image)
      return new NextResponse(Buffer.from(data), {
        headers: { 'Content-Type': contentType || 'application/octet-stream' },
      });
    }
  } catch (error) {
    return handleError(error);
  }
}
