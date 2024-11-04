interface TranslateResponse {
  translations: { text: string }[];
}
interface TranslateApiProps {
  text: string;
  targetLang: string
}
interface JokeResponse {
  joke: string;
}

export async function getJoke(): Promise<string> {

  const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');

  if (!response.ok) throw new Error(`Failed to get the joke: ${await response.text()}`);

  const data = (await response.json()) as JokeResponse;
  return data.joke
}

export async function getTranslation({ text, targetLang }: TranslateApiProps): Promise<string> {
  const response = await fetch(`https://api-free.deepl.com/v2/translate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
    },
    //to encode the body, as DeepL expects application/x-www-form-urlencoded data.
    body: new URLSearchParams({
      text,
      target_lang: targetLang
    }),
  });

  if (!response.ok) throw new Error(`Failed to translate text: ${await response.text()}`);

  const data = (await response.json()) as TranslateResponse;
  return data.translations[0].text;
}
