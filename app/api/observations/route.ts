import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { handleError } from '../../../lib/api-utils';

export async function POST(req: Request) {
  try {
    const { coordinates, time, object } = await req.json();
    const result = await query(
      'INSERT INTO observations (coordinates, time, object) VALUES ($1, $2, $3) RETURNING *',
      [coordinates, time, object]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
