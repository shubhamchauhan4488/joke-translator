'use client';

import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';
import Dropdown from './components/Dropdown';
import { useTranslate } from '../lib/hooks/useTranslate';
import { useJokeContext } from '../context/jokeContext';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  margin: 20px;
  background-color: #333;
  border-radius: 8px;
  max-width: 100%;
  height: 300px;
  box-shadow: 0px 4px 20px rgba(0, 101, 96, 0.5);
`;

const StyledText = styled.p`
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
        <Skeleton count={3} width={400} height={20} baseColor="#006560" />
      ) : (
        <StyledText>{translation}</StyledText>
      )}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <LanguageDropdownContainer>
        <Dropdown
          id='langugage-dropdown'
          onChange={handleDropdownOnChange}
          value={selectedLang}
          disabled={isPending}
          ariaLabel='Language-Dropdown'
          options={Object.entries(languageMap).map(([language, code]) => ({ key: code, value: language }))}
        />
      </LanguageDropdownContainer>
    </Card>
  );
}
