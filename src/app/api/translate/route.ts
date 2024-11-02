import { getTranslation } from '@/app/services/api';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { text, targetLang } = await req.json();

    if (!text || !targetLang) {
      return NextResponse.json(
        { error: 'Both text and targetLang parameters are required.' },
        { status: 400 }
      );
    }
    
    const result = await getTranslation({ text, targetLang })

    return NextResponse.json({ translatedText: result });

  } catch (error) {
    console.error('Unexpected error fetching translation:', error);
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}
