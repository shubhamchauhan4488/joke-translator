import Home from './ui/Home';
import "./page.css";

type JokeData = {
  joke: string;
};

export default async function Page() {
  const response = await fetch('https://v2.jokeapi.dev/joke/Any?type=single', { cache: 'no-store' });
  const data: JokeData = await response.json();
  return (
    <div className='container'>
        <Home initialJoke={data.joke} />
    </div>
  );
}