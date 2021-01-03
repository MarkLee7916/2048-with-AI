export type Board = number[][];

export type Position = [number, number];

export const HEIGHT = 4;

export const WIDTH = 4;

export const EMPTY_VALUE = -1;

export const BASE_VALUE = 2;

export const emptyBoard = generateEmptyBoard();

export function boardDeepCopy(board: Board) {
    return board.map(row => row.map(tile => tile));
}

// Return the number of tiles that haven't been filled yet
export function emptyTileCount(board: Board) {
    let count = 0;

    for (let row = 0; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
            if (board[row][col] === EMPTY_VALUE) {
                count++;
            }
        }
    }

    return count;
}

// Return true if every tile in the grid has a number in it
export function isFull(board: Board) {
    return emptyTileCount(board) === 0;
}

// Return true if all the numbers in each board are the same for every tile
export function areBoardsEqual(board1: Board, board2: Board) {
    for (let row = 0; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
            if (board1[row][col] !== board2[row][col]) {
                return false;
            }
        }
    }

    return true;
}

// Sum up all the values in a board
export function totalValue(board: Board) {
    let total = 0;

    for (let row = 0; row < HEIGHT; row++) {
        for (let col = 0; col < WIDTH; col++) {
            if (board[row][col] !== EMPTY_VALUE) {
                total += board[row][col];
            }
        }
    }

    return total;
}

// Return the board that results from a horizontal move in some direction
export function computeHorizontalMove(boardInput: Board, move: number) {
    const board = boardDeepCopy(boardInput);

    for (let i = 0; i < WIDTH; i++) {
        for (let col = Math.max(1, move * (WIDTH - 2)); col >= 0 && col < WIDTH; col -= move) {
            for (let row = 0; row < HEIGHT; row++) {
                if (board[row][col + move] === EMPTY_VALUE) {
                    swap(board, [row, col + move], [row, col]);
                } else if (board[row][col] === board[row][col + move]) {
                    board[row][col + move] *= 2;
                    board[row][col] = EMPTY_VALUE;
                }
            }
        }
    }

    return board;
}

// Return the board that results from a horizontal move in some direction
export function computeVerticalMove(boardInput: Board, move: number) {
    const board = boardDeepCopy(boardInput);

    for (let i = 0; i < HEIGHT; i++) {
        for (let row = Math.max(1, move * (HEIGHT - 2)); row >= 0 && row < HEIGHT; row -= move) {
            for (let col = 0; col < WIDTH; col++) {
                if (board[row + move][col] === EMPTY_VALUE) {
                    swap(board, [row + move, col], [row, col]);
                } else if (board[row][col] === board[row + move][col]) {
                    board[row + move][col] *= 2;
                    board[row][col] = EMPTY_VALUE;
                }
            }
        }
    }

    return board;
}

// Swap the numbers at the given positions for the given board
export function swap(board: Board, [row1, col1]: Position, [row2, col2]: Position) {
    const temp = board[row1][col1];

    board[row1][col1] = board[row2][col2];
    board[row2][col2] = temp;
}

function generateEmptyBoard(): Board {
    return Array(HEIGHT).fill(Array(WIDTH).fill(EMPTY_VALUE));
}

