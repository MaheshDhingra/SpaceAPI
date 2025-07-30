import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { handleError } from '../../../lib/api-utils';

export async function GET() {
  try {
    const result = await query('SELECT * FROM celestial_bodies');
    return NextResponse.json(result.rows);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { name, type, discovery_date, discovered_by } = await req.json();
    const result = await query(
      'INSERT INTO celestial_bodies (name, type, discovery_date, discovered_by) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, type, discovery_date, discovered_by]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}
