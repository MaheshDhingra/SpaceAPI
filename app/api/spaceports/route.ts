import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { handleError } from '../../../lib/api-utils';

export async function GET() {
  try {
    const result = await query('SELECT * FROM spaceports');
    return NextResponse.json(result.rows);
  } catch (error: any) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { name, location, country, operational_status } = await req.json();
    const result = await query(
      'INSERT INTO spaceports (name, location, country, operational_status) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, location, country, operational_status]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    return handleError(error);
  }
}
