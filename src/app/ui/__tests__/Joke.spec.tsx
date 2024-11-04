/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import Joke from '../Joke';
import { useJokeContext } from '../../lib/context/jokeContext';
import '@testing-library/jest-dom';

vi.mock('../../lib/context/jokeContext');

describe('Joke Component', () => {
  let mockSetJoke: vi.Mock;
  let mockJokeContext: any;

  beforeEach(() => {
    mockSetJoke = vi.fn();
    mockJokeContext = {
      joke: 'Why did the chicken cross the road? To get to the other side!',
      setJoke: mockSetJoke,
    };
    vi.mocked(useJokeContext).mockReturnValue(mockJokeContext);
  });

  it('renders the initial joke', () => {
    render(<Joke />);
    expect(screen.getByText('Why did the chicken cross the road? To get to the other side!')).toBeInTheDocument();
  });

  it('updates joke when the button is clicked', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve(
        new Response(JSON.stringify({ joke: 'A new joke frpm the api' }), {
          status: 200,
        })
      )
    ) as vi.MockedFunction<typeof fetch>;

    render(<Joke />);
    const button = screen.getByText('Crack a Joke!');
    fireEvent.click(button);
    await screen.findByText("Crack a Joke!");

    expect(global.fetch).toHaveBeenCalledWith('/api/joke');
    expect(mockSetJoke).toHaveBeenCalledWith('A new joke frpm the api');
  });
});
