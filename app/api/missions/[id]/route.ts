import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';
import { handleError } from '../../../../lib/api-utils';

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const { status, results, objectives } = await req.json();
    const result = await query(
      'UPDATE missions SET status = $1, results = $2, objectives = $3 WHERE id = $4 RETURNING *',
      [status, results, objectives, id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Mission not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error: any) {
    return handleError(error);
  }
}

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const result = await query('DELETE FROM missions WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Mission not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Mission deleted successfully' });
  } catch (error: any) {
    return handleError(error);
  }
}
