import React from "react";

interface Props {
    score: number;
    runAIGame: () => void;
    newGame: () => void;
    running: boolean;
}

export const Menu = ({ score, runAIGame, newGame, running }: Props) => {
    const gameOverVisibility = running ? "hidden" : "visible";

    return (
        <div id="menu">
            <h1 id="title">2048 with AI</h1>
            <p><strong>How to play:</strong> Use your arrow keys to move the tiles.</p>
            <p>Score: <strong>{score}</strong></p>
            <button onClick={runAIGame}>Run AI Game</button>
            <button onClick={newGame}>New Game</button>
            <p style={{ visibility: gameOverVisibility, fontSize: "20px" }}><strong>Game Over!</strong></p>
        </div>
    )
}
