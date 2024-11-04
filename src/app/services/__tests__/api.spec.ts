import { getJoke, getTranslation } from '../api';
import { describe, it, beforeEach, expect, vi } from 'vitest';



describe('getJoke', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('fetches a joke successfully', async () => {
    (global.fetch as vi.Mock).mockResolvedValueOnce({ 
      ok: true, 
      status: 200, 
      text: async () => '', 
      json: async () =>( { joke: 'Why did the chicken cross the road? To get to the other side!' })
    }
    );

    const joke = await getJoke();
    expect(joke).toBe('Why did the chicken cross the road? To get to the other side!');
    expect(global.fetch).toHaveBeenCalledWith('https://v2.jokeapi.dev/joke/Any?type=single');
  });

  it('throws an error when fetching joke fails', async () => {
    (global.fetch as vi.Mock).mockRejectedValueOnce(new Error('Failed to fetch joke'));

    await expect(getJoke()).rejects.toThrow('Failed to fetch joke');
  });
});

describe('getTranslation', () => {
  beforeEach(() => {
    global.fetch = vi.fn();
  });

  it('translates text successfully', async () => {
    (global.fetch as vi.Mock).mockResolvedValueOnce({ 
      ok: true, 
      status: 200, 
      text: async () => '', 
      json: async () => ( { translations: [{ text: '¿Por qué cruzó la carretera el pollo?' }] })
    }
    );

    const translatedText = await getTranslation({ text: 'Why did the chicken cross the road?', targetLang: 'ES' });
    expect(translatedText).toBe('¿Por qué cruzó la carretera el pollo?');
    expect(global.fetch).toHaveBeenCalledWith('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
      },
      body: expect.any(URLSearchParams),
    });
  });

  it('throws an error when translation fails', async () => {
    (global.fetch as vi.Mock).mockRejectedValueOnce(new Error('Failed to translate text'));

    await expect(
      getTranslation({ text: 'Why did the chicken cross the road?', targetLang: 'ES' })
    ).rejects.toThrow('Failed to translate text');
  });
});
