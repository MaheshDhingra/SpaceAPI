import { NextResponse } from 'next/server';
import { query } from '../../../lib/db';
import { handleError } from '../../../lib/api-utils';

export async function GET() {
  try {
    const result = await query('SELECT * FROM stars');
    return NextResponse.json(result.rows);
  } catch (error: unknown) {
    return handleError(error);
  }
}
