import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { handleError } from '../../../lib/api-utils';

export async function GET() {
  try {
    const result = await query('SELECT * FROM astronauts');
    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    return handleError(error);
  }
}

export async function POST(req: Request) {
  try {
    const { name, nationality, birth_date, missions_count } = await req.json();
    const result = await query(
      'INSERT INTO astronauts (name, nationality, birth_date, missions_count) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, nationality, birth_date, missions_count]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
