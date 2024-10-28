// app/api/translate/route.ts
import { NextResponse } from 'next/server';

interface TranslateResponse {
  translations: { text: string }[];
}

export async function POST(req: Request) {
  try {
    const { text, target_lang } = await req.json();

    if (!text || !target_lang) {
      return NextResponse.json(
        { error: 'Both text and target_lang parameters are required.' },
        { status: 400 }
      );
    }

    const response = await fetch(`https://api-free.deepl.com/v2/translate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `DeepL-Auth-Key ${process.env.NEXT_PUBLIC_DEEPL_API_KEY}`,
      },
      //to encode the body, as DeepL expects application/x-www-form-urlencoded data.
      body: new URLSearchParams({
        text,
        target_lang,
      }),
    });

    if (!response.ok || !response.headers.get('content-type')?.includes('application/json')) {
      console.error('Error fetching translation:', await response.text());
      return NextResponse.json({ error: 'Failed to fetch translation' }, { status: 500 });
    }

    const data = (await response.json()) as TranslateResponse;
    return NextResponse.json({ translatedText: data.translations[0].text });

  } catch (error) {
    console.error('Unexpected error fetching translation:', error);
    return NextResponse.json({ error: 'Unexpected error occurred' }, { status: 500 });
  }
}
