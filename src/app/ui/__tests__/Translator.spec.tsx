/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/react';
import Translator from '../Translator';
import { useJokeContext } from '../../context/jokeContext';
import { useTranslate } from '../../lib/hooks/useTranslate';
import { describe, it, beforeEach, vi, expect } from 'vitest';
import '@testing-library/jest-dom';

vi.mock('../../context/jokeContext', () => ({
  useJokeContext: vi.fn(() => ({
    selectedLang: 'EN',
    setSelectedLang: vi.fn(),
    translation: 'Why did the chicken cross the road? To get to the other side!',
  })),
}));

vi.mock('../../lib/hooks/useTranslate', () => ({
  useTranslate: vi.fn(() => ({
    isPending: false,
    error: null,
  })),
}));

describe('Translator Component', () => {
  let mockSetSelectedLang: ReturnType<typeof vi.fn>;
  let mockJokeContext: any;
  let mockUseTranslate: any;

  beforeEach(() => {
    mockSetSelectedLang = vi.fn();
    mockJokeContext = {
      selectedLang: 'EN',
      setSelectedLang: mockSetSelectedLang,
      translation: 'Why did the chicken cross the road? To get to the other side!',
    };
    mockUseTranslate = {
      isPending: false,
      error: null,
    };
    vi.mocked(useJokeContext).mockReturnValue(mockJokeContext);
    vi.mocked(useTranslate).mockReturnValue(mockUseTranslate);
  });

  it('renders the initial translation', () => {
    render(<Translator />);
    expect(screen.getByText('Why did the chicken cross the road? To get to the other side!')).toBeInTheDocument();
  });

  it('displays error message when an error occurs', () => {
    vi.mocked(useTranslate).mockReturnValue({ ...mockUseTranslate, error: 'Translation failed' });
    render(<Translator />);

    expect(screen.getByText('Translation failed')).toBeInTheDocument();
  });

  it('updates selected language when dropdown changes', () => {
    render(<Translator />);
    const dropdown = screen.getByLabelText('Language-Dropdown');
    fireEvent.change(dropdown, { target: { value: 'FR' } });

    expect(mockSetSelectedLang).toHaveBeenCalledWith('FR');
  });

  it('disables dropdown when loading', () => {
    vi.mocked(useTranslate).mockReturnValue({ ...mockUseTranslate, isPending: true });
    render(<Translator />);
    const dropdown = screen.getByLabelText('Language-Dropdown');

    expect(dropdown).toBeDisabled();
  });
});
