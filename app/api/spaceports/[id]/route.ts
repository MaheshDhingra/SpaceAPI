import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params as { id: string };
    const { name, location, country, operational_status } = await req.json();
    const result = await query(
      'UPDATE spaceports SET name = $1, location = $2, country = $3, operational_status = $4 WHERE id = $5 RETURNING *',
      [name, location, country, operational_status, id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Spaceport not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}

export async function DELETE(req: Request, context: { params: { id: string } }) {
  try {
    const { id } = context.params as { id: string };
    const result = await query('DELETE FROM spaceports WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Spaceport not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Spaceport deleted successfully' });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}
