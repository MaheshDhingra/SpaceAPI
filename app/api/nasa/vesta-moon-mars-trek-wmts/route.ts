import { NextResponse } from 'next/server';
import { handleError } from '../../../../lib/api-utils';

export async function GET(req: Request) {
  try {
    const NASA_API_KEY = process.env.NASA_API_KEY;
    if (!NASA_API_KEY) {
      throw new Error('NASA API key not found in environment variables.');
    }

    const { searchParams } = new URL(req.url);
    const tileMatrixSet = searchParams.get('tile_matrix_set'); // e.g., 'Moon_LRO_NAC_Mosaic_Global_100m'
    const tileMatrix = searchParams.get('tile_matrix'); // zoom level
    const tileRow = searchParams.get('tile_row');
    const tileCol = searchParams.get('tile_col');
    const format = searchParams.get('format') || 'image/jpeg';

    // This is a simplified proxy for WMTS. A full implementation would require
    // more sophisticated WMTS client logic and understanding of tile matrix sets.
    const url = `https://trek.nasa.gov/tiles/${tileMatrixSet}/wmts?request=GetTile&service=WMTS&version=1.0.0&layer=${tileMatrixSet}&style=default&format=${format}&TileMatrixSet=${tileMatrixSet}&TileMatrix=${tileMatrix}&TileRow=${tileRow}&TileCol=${tileCol}&api_key=${NASA_API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch Vesta/Moon/Mars Trek WMTS data from NASA API: ${errorText}`);
    }
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
