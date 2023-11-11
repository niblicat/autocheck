import { writable, type Writable } from "svelte/store";
import Dictionary from '$lib/dictionary.txt?raw';
import { sequence } from "@sveltejs/kit/hooks";

const compares: string[] = Dictionary.split('\n');

export var related: Writable<string[]> = writable([]);

export function PopulateWords(word: string) {
    related.set([
        word
    ]);
    // related.set(compares);
}

export function PrintMatrix(userstring: string): number[][] {
    let secondString = "cold";
    let matrix: number[][] = MakeMatrix(userstring.length, secondString.length);

    return SequenceAlignment(matrix, 2, 1, 3);
}

// Initialise as all zeroes
function MakeMatrix(rows: number, columns: number) : number[][] {
    let matrix: number[][] = [];

    for (let i = 0; i < rows; i++) {
        matrix[i] = [];
        for (let j = 0; j < columns; j++) {
            matrix[i][j] = 0;
        }
    }

    return matrix;
}

function SequenceAlignment(matrix: number[][], gap: number, light: number, heavy: number) {
    let rows: number = matrix.length;
    let columns: number = matrix[0].length;

    alert(rows);
    alert(columns);

    

    return matrix;
}