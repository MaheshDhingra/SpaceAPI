import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { query } from '@/lib/db'; // Import the query function

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Fallback for development

export async function POST(request: Request) {
  try {
    const { username, password, type } = await request.json();

    if (!username || !password || !type) {
      return NextResponse.json({ error: 'Missing username, password, or type' }, { status: 400 });
    }

    if (type === 'register') {
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        await query('INSERT INTO users (username, password) VALUES ($1, $2)', [username, hashedPassword]);
        const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
        return NextResponse.json({ message: 'User registered successfully', token }, { status: 201 });
      } catch (error: any) {
        if (error.code === '23505') { // Unique violation code for PostgreSQL
          return NextResponse.json({ error: 'Username already exists' }, { status: 409 });
        }
        console.error('Registration error:', error);
        return NextResponse.json({ error: 'Internal server error during registration' }, { status: 500 });
      }
    } else if (type === 'login') {
      const result = await query('SELECT * FROM users WHERE username = $1', [username]);
      const user = result.rows[0];

      if (!user) {
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) { 
        return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
      }

      const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '1h' });
      return NextResponse.json({ message: 'Login successful', token }, { status: 200 });
    } else {
      return NextResponse.json({ error: 'Invalid request type' }, { status: 400 });
    }
  } catch (error) {
    console.error('Authentication error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
