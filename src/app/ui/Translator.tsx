'use client';

import { useState, useTransition } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin: 20px;
  background-color: #333;
  border-radius: 8px;
  width: 500px;
  max-width: 100%;
  height: 300px;
  box-shadow: 0px 4px 20px rgba(0, 101, 96, 0.5);
`;

const JokeText = styled.p`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 16px;
  color: #bbb;
`;

const LanguageDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const LanguageDropdown = styled.select`
  padding: 8px;
  border: 1px solid #555;
  border-radius: 10px;
  background-color: #006560;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #45a049;
  }

  &:disabled {
    color: black;
    background-color: #ccc;
  }
`;

interface JokeTranslatorProps {
  joke: string;
}

const languageMap = {
  English: 'EN',
  Arabic: 'AR',
  Spanish: 'ES',
  French: 'FR',
  Dutch: 'NL',
  'Chinese-simplified': 'ZH-HANS',
  'Chinese-traditional': 'ZH-HANT',
};

export default function Translator({ joke }: JokeTranslatorProps) {
  const [translatedJoke, setTranslatedJoke] = useState<string>(joke);
  const [selectedLang, setSelectedLang] = useState<string>('ES');
  const [isPending, startTransition] = useTransition();

  const translateJoke = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setSelectedLang(selectedLanguage);

    startTransition(async () => {
      try {
        const response = await fetch('/api/translate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: joke,
            target_lang: selectedLanguage,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to translate joke');
        }

        const data = await response.json();
        setTranslatedJoke(data.translatedText);
      } catch (error) {
        console.error('Translation error:', error);
        setTranslatedJoke("Translation failed.");
      }
    });
  };

  return (
    <Card>
      {isPending ? (
        <Skeleton count={3} width={400} height={20} baseColor="#006560" />
      ) : (
        <JokeText>{translatedJoke}</JokeText>
      )}
      <LanguageDropdownContainer>
        <LanguageDropdown onChange={translateJoke} value={selectedLang} disabled={isPending}>
          {Object.entries(languageMap).map(([language, code]) => (
            <option key={code} value={code}>
              {language}
            </option>
          ))}
        </LanguageDropdown>
      </LanguageDropdownContainer>
    </Card>
  );
}
