/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import Home from '../Home';
import { useJokeContext } from '../../context/jokeContext';
import { useMediaQuery } from 'react-responsive';
import '@testing-library/jest-dom';

vi.mock('../../context/jokeContext');
vi.mock('react-responsive', () => ({
  useMediaQuery: vi.fn(),
}));

vi.mock('../Joke', () => ({
  default: () => <div data-testid="joke-component">Joke Component</div>,
}));

vi.mock('../Translator', () => ({
  default: () => <div data-testid="translator-component">Translator Component</div>,
}));

describe('Home Component', () => {
  let mockJokeContext: any;

  beforeEach(() => {
    mockJokeContext = {
      joke: 'Why did the chicken cross the road? To get to the other side!',
      translation: '¿Por qué cruzó la calle el pollo? ¡Para llegar al otro lado!',
    };
    vi.mocked(useJokeContext).mockReturnValue(mockJokeContext);
  });

  it('renders the Joke and Translator components', () => {
    vi.mocked(useMediaQuery).mockReturnValue(false);
    render(<Home />);

    expect(screen.getByTestId('joke-component')).toBeInTheDocument();
    expect(screen.getByTestId('translator-component')).toBeInTheDocument();
  });

  it('renders the Home component with a row layout for non-mobile screens', () => {
    vi.mocked(useMediaQuery).mockReturnValue(false);
    render(<Home />);

    const homeContainer = screen.getByTestId('home-container');
    expect(homeContainer).toHaveStyle({ flexDirection: 'row' });
  });

  it('renders the Home component with a column layout for mobile screens', () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);
    render(<Home />);

    const homeContainer = screen.getByTestId('home-container');
    expect(homeContainer).toHaveStyle({ flexDirection: 'column' });
  });

  it('renders the translation arrow with appropriate styles', () => {
    vi.mocked(useMediaQuery).mockReturnValue(true);
    render(<Home />);

    const arrow = screen.getByText('⇄');
    expect(arrow).toBeInTheDocument();
    expect(arrow).toHaveStyle({ transform: 'rotate(90deg)' });
  });
});
