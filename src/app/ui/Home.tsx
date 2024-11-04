'use client'
import Joke from './Joke';
import Translator from './Translator';
import { useMediaQuery } from 'react-responsive'

const Home: React.FC = () => {
  const isTabletOrMobile = useMediaQuery({ maxWidth: 768 })

  return (
    <div
      data-testid='home-container'
      style={{
        display: "flex",
        flexDirection: isTabletOrMobile ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Joke />
      <span
        style={{
          fontSize: "2rem",
          transform: isTabletOrMobile ? "rotate(90deg)" : "none",
          margin: "0 8px",
        }}
      >
        ⇄
      </span>
      <Translator />
    </div>
  );
}

export default Home;