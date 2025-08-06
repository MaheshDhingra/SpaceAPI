import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Fallback for development

export interface AuthenticatedRequest extends NextRequest {
  user?: { username: string };
}

export function authenticateToken(handler: (request: AuthenticatedRequest, ...args: unknown[]) => Promise<NextResponse>) {
  return async (request: AuthenticatedRequest, ...args: unknown[]) => {
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) {
      return NextResponse.json({ message: 'Authentication token required' }, { status: 401 });
    }

    try {
      const user = jwt.verify(token, JWT_SECRET) as { username: string };
      request.user = user; // Attach user payload to the request
      return handler(request, ...args);
    } catch (error: unknown) {
      console.error('JWT verification error:', error);
      return NextResponse.json({ message: 'Invalid or expired token' }, { status: 403 });
    }
  };
}
