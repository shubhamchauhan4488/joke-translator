import { useJokeContext } from '@/app/context/jokeContext';
import { useEffect, useState, useTransition } from 'react';

export function useTranslate() {
  const { joke, selectedLang, setTranslation } = useJokeContext()
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect( () => {
    (async () => {
      await translate(joke, selectedLang)
    })()
  }, [joke, selectedLang])
  
  const translate = async (text: string, targetLang: string) => {
    setError(null); // reset error
    startTransition(async () => {
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, targetLang }),
        });
        const {translatedText} = await response.json();
        console.log('client side response', translatedText)
  
        setTranslation(translatedText)
      } catch (err) {
        setError((err as Error).message || 'Translation failed');
        setTranslation('Translation failed')
      }
    });
  };

  return { isPending, error };
}
