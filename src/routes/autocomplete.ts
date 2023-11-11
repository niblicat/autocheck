import { writable, type Writable } from "svelte/store";
import Dictionary from '$lib/dictionary.txt?raw';


const compares: string[] = Dictionary.split('\n');

export var related: Writable<string[]> = writable([]);

export function PopulateWords(word: string) {
    related.set([
        word
    ]);
    // related.set(compares);
}

export function PrintMatrix(userString: string): number[][] {
    let secondString = "cold";

    let length: number = (userString.length > secondString.length) ? userString.length : secondString.length;
    // want square matrix with one extra row and column
    length++;
    let matrix: number[][] = MakeSquareMatrix(length);

    try {
        matrix = SequenceAlignment(matrix, 2, 1, 3)
    } catch (error) {
        let message;
        if (error instanceof Error) message = error.message;
        else message = String(error);
        reportError({message});
    }

    return matrix;
}

// Initialise as all zeroes
function MakeSquareMatrix(length: number) : number[][] {
    let matrix: number[][] = [];

    for (let i = 0; i < length; i++) {
        matrix[i] = [];
        for (let j = 0; j < length; j++) {
            matrix[i][j] = 0;
        }
    }

    return matrix;
}

function SequenceAlignment(matrix: number[][], gap: number, light: number, heavy: number) {
    let rows: number = matrix.length;
    let columns: number = matrix[0].length;
    if (rows != columns) throw new Error("Rows Not Equal To Columns; Matrix Must Be Square");

    for (let i = 1; i < (columns); i++) {
        matrix[i][0] = i * gap;
        matrix[0][i] = i * gap;
    }

    

    return matrix;
}