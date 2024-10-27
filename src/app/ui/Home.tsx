'use client';

import { useState, useTransition } from 'react';
import styled from 'styled-components';

interface HomeProps {
  initialJoke: string;
}

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
`;

const LanguageDropdownContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`;

const LanguageDropdown = styled.select`
  padding: 8px;
  margin: 0 8px;
  background-color: #444;
  color: #fff;
  border: 1px solid #555;
  border-radius: 4px;
`;

const JokeText = styled.p`
  font-size: 1.125rem;
  font-weight: bold;
  margin-bottom: 16px;
  color: #bbb;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 15px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 10px;
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

export default function Home({ initialJoke }: HomeProps) {
  const [joke, setJoke] = useState<string>(initialJoke);
  const [isPending, startTransition] = useTransition();

  const getNewJoke = () => {
    startTransition(async () => {
      try {
        const response = await fetch('/api/joke');
        if (!response.ok) {
          throw new Error('Failed to fetch joke');
        }
        const data = await response.json();
        setJoke(data.joke);
      } catch (error) {
        console.error(error);
        setJoke("Couldn't fetch a new joke.");
      }
    });
  };

  const translateJoke = () => {
    // Placeholder for translation logic
    setJoke("Translated joke (not yet implemented)");
  };

  return (
    <>
      <Card>
        {isPending ? (
          <>Loading...</>
        ) : (
          <JokeText>{joke}</JokeText>
        )}
        <ButtonContainer>
          <ActionButton disabled={isPending} onClick={getNewJoke}>
            Get New Joke
          </ActionButton>
        </ButtonContainer>
      </Card>
      <span>⇄</span>
      <Card>
        <LanguageDropdownContainer>
          <LanguageDropdown defaultValue="en">
            <option value="en">English</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
            {/* Add more language options as needed */}
          </LanguageDropdown>
        </LanguageDropdownContainer>
        <JokeText>{joke}</JokeText>
        <ButtonContainer>
          <ActionButton onClick={translateJoke}>Translate</ActionButton>
        </ButtonContainer>
      </Card>
    </>
  );
}
