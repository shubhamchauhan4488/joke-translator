import Home from './ui/Home';
import "./page.css";

interface JokePageProps {
  initialJoke: string;
}

async function fetchInitialJoke(): Promise<JokePageProps> {
  const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single');
  const data = await response.json();
  return { initialJoke: data.joke };
}

export default async function Page() {
  const data = await fetchInitialJoke();

  return (
    <div className='container'>
        <Home initialJoke={data.initialJoke} />
    </div>
  );
}