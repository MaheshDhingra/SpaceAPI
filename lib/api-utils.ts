import { NextResponse } from 'next/server';

export function handleError(error: unknown) {
  console.error('API Error:', error);
  // In a production environment, you might want to return a more generic error message
  // to prevent leaking sensitive information.
  const errorMessage = process.env.NODE_ENV === 'production'
    ? 'An internal server error occurred.'
    : (error instanceof Error ? error.message : 'An unknown error occurred.');
  return NextResponse.json({ error: errorMessage }, { status: 500 });
}
