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

function MakeMatrix(word1: string, word2: string) : Number[][] {
    let size1 = word1.length;
    let size2 = word2.length;

    let matrix: Number[][] = [];

    // Initialise as all zeroes
    for (let i = 0; i < size1; i++) {
        matrix[i] = [];
        for (let j = 0; j < size2; j++) {
            matrix[i][j] = 0;
        }
    }

    return matrix;
}