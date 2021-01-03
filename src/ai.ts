import { areBoardsEqual, Board, emptyTileCount, EMPTY_VALUE } from "./board";
import { Direction, directions } from "./direction";
import { swapRowsAndColumns } from "./utils";

interface OptimalMove {
    optimalDirection: Direction,
    optimalHeuristic: number
}

const MAX_SEARCH_DEPTH = 6;

export function computeOptimalMove(board: Board, computeNextBoard: (board: Board, direction: Direction) => Board): OptimalMove {
    return Object.values(directions).reduce(({ optimalDirection, optimalHeuristic }: OptimalMove, direction: Direction) => {
        const boardFromMove = computeNextBoard(board, direction);
        const heuristic = expect(boardFromMove, 1, computeNextBoard);

        if (heuristic > optimalHeuristic && !areBoardsEqual(board, boardFromMove)) {
            return { optimalDirection: direction, optimalHeuristic: heuristic };
        } else {
            return { optimalDirection: optimalDirection, optimalHeuristic: optimalHeuristic };
        }

    }, { optimalDirection: directions.left, optimalHeuristic: Number.NEGATIVE_INFINITY });
}

// Simulate a random tile placement by taking an average of all the heuristics
function expect(board: Board, depth: number, computeNextBoard: (board: Board, direction: Direction) => Board): number {
    if (depth == MAX_SEARCH_DEPTH) {
        return computeHeuristic(board);
    }

    const sum: number = Object.values(directions).reduce((sum: number, direction: Direction) => {
        const boardFromMove = computeNextBoard(board, direction);

        return sum + max(boardFromMove, depth + 1, computeNextBoard);
    }, 0);

    return sum / 4;
}

// For all moves the AI could make, return most optimal
function max(board: Board, depth: number, computeNextBoard: (board: Board, direction: Direction) => Board): number {
    if (depth == MAX_SEARCH_DEPTH) {
        return computeHeuristic(board);
    }

    return Object.values(directions).reduce((maxHeuristic: number, direction: Direction) => {
        const boardFromMove = computeNextBoard(board, direction);

        return Math.max(expect(boardFromMove, depth + 1, computeNextBoard), maxHeuristic);
    }, Number.NEGATIVE_INFINITY);
}

// Return a score evaluating how good a board is, where a higher score means a better board
function computeHeuristic(board: Board) {
    return emptyTileCount(board) + computeMonotonicity(board);
}

// Return a score based on how sorted the rows and columns are
function computeMonotonicity(board: Board) {
    let heuristicScore = 0;

    const areRowsIncreasing = board.reduce((increasing, row) =>
        increasing && isIncreasing(row)
        , true);

    const areRowsDecreasing = board.reduce((decreasing, row) =>
        decreasing && isDecreasing(row)
        , true);

    const areColsIncreasing = swapRowsAndColumns(board).reduce((increasing, col) =>
        increasing && isIncreasing(col)
        , true);

    const areColsDecreasing = swapRowsAndColumns(board).reduce((decreasing, col) =>
        decreasing && isDecreasing(col)
        , true);

    heuristicScore += areRowsDecreasing || areRowsIncreasing ? 6 : 0;
    heuristicScore += areColsDecreasing || areColsIncreasing ? 6 : 0;

    return heuristicScore;
}

// Return true if row is sorted
function isIncreasing(boardRow: number[]) {
    for (let i = 0; i < boardRow.length - 1; i++) {
        if (boardRow[i] !== EMPTY_VALUE && boardRow[i + 1] < boardRow[i]) {
            return false;
        }
    }

    return true;
}

// Return true if row is reverse sorted
function isDecreasing(boardRow: number[]) {
    return isIncreasing(boardRow.reverse());
}
