import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { handleError } from '../../../lib/api-utils';

export async function GET() {
  try {
    const result = await query('SELECT * FROM cosmic_events');
    return NextResponse.json(result.rows);
  } catch (error: any) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { name, type, date, description, galaxy } = await req.json();
    const result = await query(
      'INSERT INTO cosmic_events (name, type, date, description, galaxy) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, type, date, description, galaxy]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: any) {
    return handleError(error);
  }
}
