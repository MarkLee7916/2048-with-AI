import React from "react";
import { Board } from "../board";
import { Tile } from "./tile";

interface Props {
    board: Board;
    running: boolean;
}

const GAME_OVER_OPACITY = 0.3;

export const Grid = ({ board, running }: Props) => {
    const opacity = running ? 1 : GAME_OVER_OPACITY;

    function renderRow(row: number[], rowIndex: number) {
        return (
            <tr className="row" key={rowIndex}>
                {row.map((tileNum, colIndex) =>
                    <Tile num={tileNum} key={colIndex} />
                )}
            </tr>
        );
    }

    return (
        <table id="grid" style={{ opacity: opacity }}>
            <tbody>
                {board.map((row, index) => renderRow(row, index))}
            </tbody>
        </table>
    );
}