/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderHook, act } from '@testing-library/react';
import { useTranslate } from '../useTranslate';
import { useJokeContext } from '@/app/context/jokeContext';
import { vi, describe, it, beforeEach, expect } from 'vitest';

vi.mock('@/app/context/jokeContext');

describe('useTranslate Hook', () => {
  let mockSetTranslation: ReturnType<typeof vi.fn>;
  let mockJokeContext: any;

  beforeEach(() => {
    mockSetTranslation = vi.fn();
    mockJokeContext = {
      joke: 'Why did the chicken cross the road?',
      selectedLang: 'es',
      setTranslation: mockSetTranslation,
    };

    vi.mocked(useJokeContext).mockReturnValue(mockJokeContext);
  });

  it('calls translate function when joke or selectedLang changes', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ translatedText: 'hello' })
      })
    ) as unknown as typeof fetch;

    
    renderHook(() => useTranslate());

    await act(async () => expect(global.fetch).toHaveBeenCalled());

    expect(global.fetch).toHaveBeenCalledWith('/api/translate', expect.anything());
    expect(mockSetTranslation).toHaveBeenCalledWith('hello');
  });

  it('sets an error message if translation fails', async () => {
    global.fetch = vi.fn(() => Promise.reject(new Error('Network error')));

    
    renderHook(() => useTranslate());
    await act(async () => {});
    // expect(result.current.error).toBe('Network error');
    expect(mockSetTranslation).toHaveBeenCalledWith('Translation failed');
  });
});
