  'use client';

  import { useState, useTransition } from 'react';
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


  export default function Home({ initialJoke }) {
    const [joke, setJoke] = useState(initialJoke);
    const [isPending, startTransition] = useTransition();

    const getNewJoke = () => {
      startTransition(async () => {
        const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
        const data = await response.json();
        setJoke(data.joke);
      });
    };
    const translateJoke = () => {
      // Placeholder for translation logic
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
          <ActionButton disabled={isPending} onClick={getNewJoke}>Get New Joke</ActionButton>
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
          <ActionButton onClick={getNewJoke}>Translate</ActionButton>
        </ButtonContainer>
      </Card>
      </>
    );
  }
