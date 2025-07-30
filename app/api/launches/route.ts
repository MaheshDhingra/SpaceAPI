import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { handleError } from '../../../lib/api-utils';

export async function POST(req: Request) {
  try {
    const { name, date, rocket } = await req.json(); // Example fields for launches
    const result = await query(
      'INSERT INTO launches (name, date, rocket) VALUES ($1, $2, $3) RETURNING *',
      [name, date, rocket]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
