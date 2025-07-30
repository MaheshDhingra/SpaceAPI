import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, manufacturer, height_m, mass_kg, payload_capacity_kg } = await req.json();
    const result = await query(
      'UPDATE rockets SET name = $1, manufacturer = $2, height_m = $3, mass_kg = $4, payload_capacity_kg = $5 WHERE id = $6 RETURNING *',
      [name, manufacturer, height_m, mass_kg, payload_capacity_kg, id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Rocket not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const result = await query('DELETE FROM rockets WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Rocket not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Rocket deleted successfully' });
  } catch (error: unknown) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
