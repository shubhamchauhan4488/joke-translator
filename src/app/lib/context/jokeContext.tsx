'use client';

import { createContext, useState, ReactNode, useContext } from 'react';

interface JokeContextProps {
  joke: string;
  translation: string;
  selectedLang: string;
  setJoke: (joke: string) => void;
  setSelectedLang: (lang: string) => void;
  setTranslation: (translation: string) => void;
}

const JokeContext = createContext<JokeContextProps | undefined>(undefined);

export function JokeProvider({ children, initialJoke, initialTranslation }: { 
  children: ReactNode;
  initialJoke: string;
  initialTranslation: string;
}) {
  const [joke, setJoke] = useState(initialJoke);
  const [translation, setTranslation] = useState(initialTranslation);
  const [selectedLang, setSelectedLang] = useState<string>('ES');
  
  return (
    <JokeContext.Provider value={{ joke, setJoke, selectedLang, setSelectedLang, translation, setTranslation }}>
      {children}
    </JokeContext.Provider>
  );
}

// Custom hook for easier context access
export function useJokeContext() {
  const context = useContext(JokeContext);
  if (!context) throw new Error('useJokeContext must be used within a JokeProvider');
  return context;
}