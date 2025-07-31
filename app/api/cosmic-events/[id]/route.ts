import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, type, date, description, galaxy } = await req.json();
    const result = await query(
      'UPDATE cosmic_events SET name = $1, type = $2, date = $3, description = $4, galaxy = $5 WHERE id = $6 RETURNING *',
      [name, type, date, description, galaxy, id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Cosmic event not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const result = await query('DELETE FROM cosmic_events WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Cosmic event not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Cosmic event deleted successfully' });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}
