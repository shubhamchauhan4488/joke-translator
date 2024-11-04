import Home from './ui/Home';
import "./page.css";
import { JokeProvider } from './lib/context/jokeContext';
import { getJoke, getTranslation } from './lib/services/api';

export default async function Page() {
  const joke = await getJoke();
  const translation = await getTranslation({ text: joke, targetLang: 'ES' }); // 'ES' -> Spanish default

  return (
    <JokeProvider initialJoke={joke} initialTranslation={translation}>
      <div className="container">
        <Home />
      </div>
    </JokeProvider>
  );
}