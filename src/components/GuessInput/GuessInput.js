import React from "react";

function GuessInput({ gameStatus, handleSubmitGuess }) {
  const [tentativeGuess, setTentativeGuess] = React.useState("");

  const handleGuess = (event) => {
    event.preventDefault();
    // console.log({ guess });
    handleSubmitGuess(tentativeGuess);
    setTentativeGuess("");
  };
  return (
    <form className="guess-input-wrapper" onSubmit={handleGuess}>
      <label htmlFor="guess-input">Enter guess:</label>
      <input
        required
        disabled={gameStatus !== "running"}
        id="guess-input"
        type="text"
        minLength={5}
        maxLength={5}
        pattern="[a-zA-Z]{5}"
        title="5 letter word"
        value={tentativeGuess}
        onChange={(event) => {
          const nextGuess = event.target.value.toUpperCase();

          setTentativeGuess(nextGuess);
        }}
      />
    </form>
  );
}

export default GuessInput;
