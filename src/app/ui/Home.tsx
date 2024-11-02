'use client'
import Joke from './Joke';
import Translator from './Translator';
import  useMediaQuery from "../lib/hooks/useMediaQuery";

export default function Home() {

  const isSmallScreen = useMediaQuery("(max-width: 768px)");

  return (
    <div
      style={{
        display: "flex",
        flexDirection: isSmallScreen ? "column" : "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Joke />
      <span
        style={{
          fontSize: "2rem",
          transform: isSmallScreen ? "rotate(90deg)" : "none",
          margin: "0 8px",
        }}
      >
        ⇄
      </span>
      <Translator />
    </div>
  );
}
