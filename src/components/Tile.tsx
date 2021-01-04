import React from "react";
import { EMPTY_VALUE } from "../board";
import { numDigitCount, roundIntegerUpTo } from "../utils";

interface Props {
    num: number
}

// Colour of tiles that haven't been filled yet
const BLANK_BACKGROUND_COLOR = "#C0C0C0";

// Colour of tiles whose number is higher than what we have stored in the map
const HIGH_NUMBER_BACKGROUND_COLOR = "#E1909B";

// Increasing this value increases the size of the text inside tiles
const TILE_FONT_SIZE_MODIFIER = 200;

// Map a number onto the background color of the tile containing that number
const numToBackgroundColor = new Map([
    [2, "#f6d8ac"],
    [4, "#db9833"],
    [8, "#2a6592"],
    [16, "#B8E190"],
    [32, "#E1D890"],
    [64, "#C390E1"]
]);

export const Tile = ({ num }: Props) => {
    // Get background colour from the tile number
    function backgroundColor(num: number) {
        if (num !== EMPTY_VALUE) {
            const color = numToBackgroundColor.get(num);

            return color === undefined ? HIGH_NUMBER_BACKGROUND_COLOR : color;
        } else {
            return BLANK_BACKGROUND_COLOR;
        }
    }

    // Calculate suitable font size to fit a number onto its tile
    function fontSize() {
        return `${TILE_FONT_SIZE_MODIFIER / roundIntegerUpTo(numDigitCount(num), 5)}px`;
    }

    return (
        <td className="tile" style={{
            backgroundColor: backgroundColor(num),
            fontSize: fontSize(),
        }}
        >
            {num === EMPTY_VALUE ? '' : num}
        </td>
    );
}