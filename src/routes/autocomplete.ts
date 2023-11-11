import { writable, type Writable } from "svelte/store";
import Dictionary from '$lib/dictionary.txt?raw';


const compares: string[] = Dictionary.split('\n');

export var related: Writable<string[]> = writable([]);

export function CompareWords(word: string) {

}

function PopulateWords(words: string[]) {
    related.set(words);
    // related.set(compares);
}

export function PrintMatrix(userString: string): number[][] {
    let secondString = "mean";

    let length: number = (userString.length > secondString.length) ? userString.length : secondString.length;
    // want square matrix with one extra row and column
    length++;
    let matrix: number[][] = MakeSquareMatrix(length);

    try {
        matrix = SequenceAlignment(matrix, userString, secondString, 2, 1, 3)
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

function IsVowel(c: string): boolean {
    let r = c.toUpperCase();
    return r === "A" || r === "E" || r === "I" || r === "O" || r === "U";
}
function IsConsonant(c: string): boolean {
    let r = c.toUpperCase();
    return r === "B" || r === "C" || r === "D" || r === "F" || r === "G" || r === "H" || r === "J" || r === "K" || r === "L" || r === "M" || r === "N" || r === "P" || r === "Q" || r === "R" || r === "S" || r === "T" || r === "V" || r === "W" || r === "X" || r === "Y" || r === "Z";
}

function SequenceAlignment(matrix: number[][], string1: string, string2: string, gap: number, light: number, heavy: number) {
    let rows: number = matrix.length;
    let columns: number = matrix[0].length;

    if (rows != columns)
        throw new Error("Rows Not Equal To Columns; Matrix Must Be Square");

    for (let i = 1; i < rows; i++) {
        matrix[i][0] = i * gap;
        matrix[0][i] = i * gap;
    }

    for (let i = 1; i < rows; i++) {
        
        for (let j = 1; j < rows; j++) {
            let diagonalPenalty = matrix[i - 1][j - 1];

            if (string1[i - 1] === string2[j - 1])
                diagonalPenalty; // characters match
            else if ((IsVowel(string1[i - 1]) && IsVowel(string2[j - 1]))
                    || (IsConsonant(string1[i - 1]) && IsConsonant(string2[j - 1])))
                diagonalPenalty += light; // vowel/vowel consonant/consonant match
            else
                diagonalPenalty += heavy; // no match


            matrix[i][j] = Math.min(
                diagonalPenalty,
                gap + matrix[i - 1][j],
                gap + matrix[i][j - 1],
            );
        }
    }

    return matrix;
}