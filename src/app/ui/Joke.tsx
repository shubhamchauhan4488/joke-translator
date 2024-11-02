'use client';

import { useTransition } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import styled from 'styled-components';
import { Button } from './components/Button';
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

const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export default function Joke() {
  const {joke, setJoke} = useJokeContext()
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
        <Skeleton count={3} width={400} height={20} baseColor="#006560" />
      ) : (
        <StyledText>{joke}</StyledText>
      )}
      <ButtonContainer>
        <Button onClick={crackJoke} loading={isPending} variant="primary" size="medium">
          Crack a Joke !
        </Button>
      </ButtonContainer>
    </Card>
  );
}
