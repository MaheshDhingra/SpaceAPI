import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const { name, type, discovery_date, discovered_by } = await req.json();
    const result = await query(
      'UPDATE celestial_bodies SET name = $1, type = $2, discovery_date = $3, discovered_by = $4 WHERE id = $5 RETURNING *',
      [name, type, discovery_date, discovered_by, id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Celestial body not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const result = await query('DELETE FROM celestial_bodies WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Celestial body not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Celestial body deleted successfully' });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}
