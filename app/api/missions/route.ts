import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { handleError } from '../../../lib/api-utils';

export async function POST(req: Request) {
  try {
    const { name, objectives, startDate, endDate } = await req.json(); // Example fields for missions
    const result = await query(
      'INSERT INTO missions (name, objectives, start_date, end_date) VALUES ($1, $2, $3, $4) RETURNING *',
      [name, objectives, startDate, endDate]
    );
    return NextResponse.json(result.rows[0], { status: 201 });
  } catch (error: unknown) {
    return handleError(error);
  }
}
