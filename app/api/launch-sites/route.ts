import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { handleError } from '../../../lib/api-utils';

export async function GET() {
  try {
    const result = await query('SELECT * FROM launch_sites');
    return NextResponse.json(result.rows);
  } catch (error: any) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { name, location, country } = await req.json();
    const result = await query(
      'INSERT INTO launch_sites (name, location, country) VALUES ($1, $2, $3) RETURNING *',
      [name, location, country]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    return handleError(error);
  }
}
