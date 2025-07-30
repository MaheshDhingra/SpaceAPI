import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { handleError } from '../../../lib/api-utils';

export async function GET() {
  try {
    const result = await query('SELECT * FROM rockets');
    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { name, manufacturer, height_m, mass_kg, payload_capacity_kg } = await req.json();
    const result = await query(
      'INSERT INTO rockets (name, manufacturer, height_m, mass_kg, payload_capacity_kg) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, manufacturer, height_m, mass_kg, payload_capacity_kg]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
