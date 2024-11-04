'use client';

import { useTransition } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';
import { Button } from './components/Button';
import { useJokeContext } from '../context/jokeContext';
import Card from './components/Card';
import Text from './components/Text';

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default function Joke() {
  const { joke, setJoke } = useJokeContext()
  const [isPending, startTransition] = useTransition();

  const crackJoke = () => {
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

  return (
    <Card>
      {isPending ? (
        <Skeleton
          containerClassName='skeleton-wrapper'
          count={2.5}
          inline={true}
          height={15}
          baseColor="#006560" />) : (
        <Text>{joke}</Text>
      )}
      <ButtonContainer>
        <Button onClick={crackJoke} loading={isPending} variant="primary" size="medium">
          Crack a Joke !
        </Button>
      </ButtonContainer>
    </Card>
  );
}
