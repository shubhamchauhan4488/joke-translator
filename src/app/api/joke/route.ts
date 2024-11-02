// app/api/joke/route.ts
import { getJoke } from '@/app/services/api';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const result = await getJoke()
    return NextResponse.json({joke: result});
  } catch (error) {
    console.error('Unexpected error fetching joke:', error);
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}
