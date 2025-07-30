import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { name, location, country } = await req.json();
    const result = await query(
      'UPDATE launch_sites SET name = $1, location = $2, country = $3 WHERE id = $4 RETURNING *',
      [name, location, country, id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Launch site not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const result = await query('DELETE FROM launch_sites WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Launch site not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Launch site deleted successfully' });
  } catch (error: unknown) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
