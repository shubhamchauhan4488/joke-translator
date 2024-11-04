'use client'
import Joke from './Joke';
import Translator from './Translator';
import { useMediaQuery } from 'react-responsive'
import { ErrorBoundary } from "react-error-boundary";

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
      <ErrorBoundary fallback={<p>Failed to load jokes. Please try again later.</p>}>
        <Joke />
      </ErrorBoundary>
      <span
        style={{
          fontSize: "2rem",
          transform: isTabletOrMobile ? "rotate(90deg)" : "none",
          margin: "0 8px",
        }}
      >
        ⇄
      </span>
      <ErrorBoundary fallback={<p>Translation service is currently unavailable.</p>}>
        <Translator />
      </ErrorBoundary>
    </div>
  );
}

export default Home;