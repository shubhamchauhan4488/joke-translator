'use client'
import { useState } from 'react';
import Joke from './Joke';
import Translator from './Translator';

interface HomeProps {
  initialJoke: string;
}

export default function Home({ initialJoke }: HomeProps) {
  const [currentJoke, setCurrentJoke] = useState<string>(initialJoke);

  return (
    <>
      <Joke initialJoke={initialJoke} onJokeFetched={setCurrentJoke} />
      <span>⇄</span>
      <Translator joke={currentJoke} />
    </>
  );
}
