'use client';
import React from 'react';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Dropdown from './components/Dropdown';
import { useTranslate } from '../lib/hooks/useTranslate';
import { useJokeContext } from '../context/jokeContext';
import Card from './components/Card';
import Text from './components/Text';

const languageMap = {
  English: 'EN',
  Arabic: 'AR',
  Spanish: 'ES',
  French: 'FR',
  Dutch: 'NL',
  'Chinese-simplified': 'ZH-HANS',
  'Chinese-traditional': 'ZH-HANT',
};

export default function Translator() {
  const { selectedLang, setSelectedLang, translation } = useJokeContext()
  const { isPending, error } = useTranslate();

  const handleDropdownOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = e.target.value;
    setSelectedLang(selectedLanguage);
  }

  return (
    <Card>
      {isPending ? (
        <Skeleton
          containerClassName='skeleton-wrapper'
          count={2.5} inline={true} height={15} baseColor="#006560" />
      ) : (
        <Text>{translation}</Text>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Dropdown
        id='langugage-dropdown'
        onChange={handleDropdownOnChange}
        value={selectedLang}
        disabled={isPending}
        ariaLabel='Language-Dropdown'
        options={Object.entries(languageMap).map(([language, code]) => ({ key: code, value: language }))}
      />
    </Card>
  );
}
