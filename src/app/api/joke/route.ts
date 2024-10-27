// app/api/joke/route.ts
import { NextResponse } from 'next/server';

interface JokeResponse {
  joke: string;
}

export async function GET() {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
    
    if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
      console.error('Error fetching joke:', await response.text());
      return NextResponse.json({ error: 'Failed to fetch joke' }, { status: 500 });
    }

    const data = (await response.json()) as JokeResponse;
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Unexpected error fetching joke:', error);
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}
