import { useJokeContext } from '@/app/lib/context/jokeContext';
import { useEffect, useTransition } from 'react';

export function useTranslate() {
  const { joke, selectedLang, setTranslation } = useJokeContext()
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    (async () => {
      await translate(joke, selectedLang)
    })()
  }, [joke, selectedLang])

  const translate = async (text: string, targetLang: string) => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, targetLang }),
        });
        const { translatedText } = await response.json();

        setTranslation(translatedText)
      } catch (err) {
        throw new Error('Translation failed' + err)
      }
    });
  };

  return { isPending };
}
