import React, { useEffect, useReducer, useState } from "react";
import { areBoardsEqual, BASE_VALUE, Board, boardDeepCopy, computeHorizontalMove, computeVerticalMove, emptyBoard, EMPTY_VALUE, HEIGHT, isFull, Position, totalValue, WIDTH } from "../board";
import { Direction, directions } from "../direction";
import { randomItemFromArray } from "../utils";
import { computeOptimalMove } from "../ai";
import { Grid } from "./Grid";
import { Menu } from "./Menu";

export const Game = () => {
    const [running, setRunning] = useState(true);

    // Handle player board transitions resulting from player moving
    const [board, nextBoard] = useReducer(computeNextBoard, fillRandomTile(emptyBoard));

    // Map a key onto an action
    const keyToAction = new Map<String, () => void>([
        ["ArrowUp", () => nextBoard(directions.up)],
        ["ArrowDown", () => nextBoard(directions.down)],
        ["ArrowLeft", () => nextBoard(directions.left)],
        ["ArrowRight", () => nextBoard(directions.right)],
    ]);

    // Register DOM keyboard movements
    useEffect(() => window.addEventListener("keydown", handleKeypress), []);

    // Make a move from whatever key the user pressed
    function handleKeypress(event: KeyboardEvent) {
        const action = keyToAction.get(event.key);

        if (action !== undefined) {
            action();
        }
    }

    // Given a board, return a board with a random empty tile filled in with the base value
    function fillRandomTile(boardInput: Board) {
        const board = boardDeepCopy(boardInput);
        const emptyCoords = computeEmptyPositions(board);
        const [randRow, randCol] = randomItemFromArray(emptyCoords);

        board[randRow][randCol] = BASE_VALUE;

        return board;
    }

    // Return list of coordinates of positions that haven't been filled
    function computeEmptyPositions(board: Board): Position[] {
        const emptyPositions = [];

        for (let row = 0; row < HEIGHT; row++) {
            for (let col = 0; col < WIDTH; col++) {
                if (board[row][col] === EMPTY_VALUE) {
                    emptyPositions.push([row, col]);
                }
            }
        }

        return emptyPositions;
    }

    // Wrapper around computeMove() that handles game over cases and cases where the board hasn't changed
    function computeNextBoard(board: Board, direction: Direction) {
        if (running) {
            const resultFromMove = computeMove(board, direction);

            if (isGameOver(board)) {
                setRunning(false);
                return board;
            } else if (isFull(resultFromMove) || areBoardsEqual(board, resultFromMove)) {
                return board;
            } else {
                return fillRandomTile(resultFromMove);
            }
        } else {
            return board;
        }
    }

    // Given a board and a direction, return the board that results from that move
    function computeMove(board: Board, [rowMove, colMove]: Direction) {
        if (rowMove !== 0) {
            return computeVerticalMove(board, rowMove);
        } else {
            return computeHorizontalMove(board, colMove);
        }
    }

    // Return true if no more moves can be made that don't result in a full board
    function isGameOver(board: Board) {
        return Object.values(directions).every(direction => {
            const resultFromMove = computeMove(board, direction);

            return isFull(resultFromMove);
        });
    }

    // Get optimal AI move and execute it
    function makeAIMove() {
        const { optimalDirection } = computeOptimalMove(board, computeNextBoard);

        nextBoard(optimalDirection);
    }

    function calculateScore(board: Board) {
        let score = 0;

        for (let row = 0; row < HEIGHT; row++) {
            for (let col = 0; col < WIDTH; col++) {
                if (board[row][col] !== EMPTY_VALUE && board[row][col] !== BASE_VALUE) {
                    score += Math.log2(board[row][col]) * board[row][col];
                }
            }
        }

        return score;
    }

    return (
        <>
            <Menu score={calculateScore(board)} makeAIMove={makeAIMove} newGame={() => location.reload()} running={running} />
            <Grid board={board} running={running} />
        </>
    )
}

