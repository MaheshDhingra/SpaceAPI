import { NextResponse } from 'next/server';
import { query } from '../../../../lib/db';

type TParams = {
  params: {
    id: string;
  };
};

export async function PUT(req: Request, { params }: TParams) {
  try {
    const { id } = params;
    const { name, nationality, birth_date, missions_count } = await req.json();
    const result = await query(
      'UPDATE astronauts SET name = $1, nationality = $2, birth_date = $3, missions_count = $4 WHERE id = $5 RETURNING *',
      [name, nationality, birth_date, missions_count, id]
    );
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Astronaut not found' }, { status: 404 });
    }
    return NextResponse.json(result.rows[0]);
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: TParams) {
  try {
    const { id } = params;
    const result = await query('DELETE FROM astronauts WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return NextResponse.json({ error: 'Astronaut not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Astronaut deleted successfully' });
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}
