export type Direction = [number, number];

export interface Directions {
    left: Direction,
    right: Direction,
    down: Direction,
    up: Direction
}

export const directions: Directions = {
    left: [0, -1],
    right: [0, 1],
    down: [1, 0],
    up: [-1, 0]
}