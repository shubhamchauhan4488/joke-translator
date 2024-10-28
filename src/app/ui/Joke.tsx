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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const ActionButton = styled.button`
  padding: 10px 15px;
  background-color: #006560;
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

interface JokeFetcherProps {
  initialJoke: string;
  onJokeFetched: (joke: string) => void;
}

export default function Joke({ initialJoke, onJokeFetched }: JokeFetcherProps) {
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
        onJokeFetched(data.joke); // Pass the fetched joke to the parent component
      } catch (error) {
        console.error(error);
        setJoke("Couldn't fetch a new joke.");
      }
    });
  };

  return (
    <Card>
      {isPending ? (
        <Skeleton count={3} width={400} height={20} baseColor="#006560" />
      ) : (
        <JokeText>{joke}</JokeText>
      )}
      <ButtonContainer>
        <ActionButton disabled={isPending} onClick={getNewJoke}>
          Get New Joke
        </ActionButton>
      </ButtonContainer>
    </Card>
  );
}
