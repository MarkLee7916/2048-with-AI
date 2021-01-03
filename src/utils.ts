export function randomIntBetween(lower: number, upper: number) {
    return Math.floor(Math.random() * (upper - lower)) + lower;
}

export function randomItemFromArray<T>(array: T[]) {
    return array[randomIntBetween(0, array.length)];
}

export function numDigitCount(num: number) {
    return num.toString().length;
}

export function roundIntegerUpTo(num: number, target: number) {
    if (target === 0) {
        throw "Can't round up to zero";
    }

    while (num % target !== 0) {
        num++;
    }

    return num;
}

export function wait(time: number) {
    return new Promise(resolve => setTimeout(resolve, time));
}

export function swapRowsAndColumns<T>(matrix: T[][]) {
    if (matrix.length > 0) {
        const swappedMatrix = [];

        for (let col = 0; col < matrix[0].length; col++) {
            swappedMatrix.push(generateFlatColumn(matrix, col));
        }

        return swappedMatrix;
    } else {
        return matrix;
    }
}

export function generateFlatColumn<T>(matrix: T[][], col: number) {
    const column = [];

    for (let row = 0; row < matrix.length; row++) {
        column.push(matrix[row][col]);
    }

    return column;
}
