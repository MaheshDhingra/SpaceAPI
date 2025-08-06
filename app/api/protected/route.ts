import { NextResponse } from 'next/server';
import { authenticateToken, AuthenticatedRequest } from '../../../lib/auth';

async function protectedPostHandler(request: AuthenticatedRequest) {
  // This is a protected route. Only authenticated users can reach here.
  const { user } = request;

  if (!user) {
    // This case should ideally not be reached if middleware works correctly,
    // but it's a good safeguard.
    return NextResponse.json({ message: 'User not authenticated' }, { status: 401 });
  }

  try {
    const data = await request.json();
    console.log(`Protected POST received from user ${user.username}:`, data);
    return NextResponse.json({ message: `Data received successfully from ${user.username}`, data }, { status: 200 });
  } catch (error) {
    console.error('Error processing protected POST request:', error);
    return NextResponse.json({ message: 'Error processing request' }, { status: 500 });
  }
}

export const POST = authenticateToken(protectedPostHandler);
