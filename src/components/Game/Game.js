import React from "react";

import { sample } from "../../utils";
import { WORDS } from "../../data";
import { checkGuess } from "../../game-helpers";
import GuessInput from "../GuessInput";

import GuessResults from "../GuessResults";

import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import WonBanner from "../WonBanner";
import LostBanner from "../LostBanner/LostBanner";
import VisualKeyboard from "../VisualKeyboard";

function Game() {
  const [answer, setAnswer] = React.useState(() => sample(WORDS));
  const [gameStatus, setGameStatus] = React.useState("running");
  const [guesses, setGuesses] = React.useState([]);

  function handleSubmitGuess(tentativeGuess) {
    const nextGuess = [...guesses, tentativeGuess];
    setGuesses(nextGuess);
    if (tentativeGuess.toUpperCase() === answer) {
      setGameStatus("won");
    } else if (nextGuess.length >= NUM_OF_GUESSES_ALLOWED) {
      setGameStatus("lost");
    }
  }

  function handleRestart() {
    const newAnswer = sample(WORDS);
    setAnswer(newAnswer);
    setGuesses([]);
    setGameStatus("running");
  }

  const validatedGuesses = guesses.map((guess) => checkGuess(guess, answer));
  return (
    <>
      <GuessResults validatedGuesses={validatedGuesses} />
      <GuessInput
        gameStatus={gameStatus}
        handleSubmitGuess={handleSubmitGuess}
      />
      <VisualKeyboard validatedGuesses={validatedGuesses} />
      {gameStatus === "won" && (
        <WonBanner
          numOfGuesses={guesses.length}
          handleRestart={handleRestart}
        />
      )}
      {gameStatus === "lost" && (
        <LostBanner answer={answer} handleRestart={handleRestart} />
      )}
    </>
  );
}

export default Game;
