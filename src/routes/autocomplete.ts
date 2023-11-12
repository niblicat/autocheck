import { writable, type Writable } from "svelte/store";
import Dictionary from '$lib/dictionary.txt?raw';

const compares: string[] = Dictionary.split('\n');

export var related: Writable<string[]> = writable([]);

// turns 3d string array into 2d results array of given size numStrings
function Unfold3DTo2D(dblarray: string[][], numStrings: number): string[] {
    let results: string[] = [];

    for (const array of dblarray) {
        if (array === undefined)
            continue;

        results = results.concat(array);

        if (results.length >= numStrings)
            break;
    }

    return results.slice(0, numStrings);
}

// handles comparing the user word with every word in the dictionary
export function CompareWords(word: string, count: number, gap: number, light: number, heavy: number) {
    // compare words and enter into vector by penalty size
    let maxPenalty = Math.max(...compares.map(el => el.length)) * 3;

    let results: string[][] = [];

    // initialise results 3d array
    for (let i = 0; i < maxPenalty; i++) {
        results[i] = [];
    }

    compares.forEach(element => {
        const length: number = Math.max(word.length, element.length);
        let myMatrix = MakeSquareMatrix(length);

        try {
            myMatrix = SequenceAlignment(myMatrix, word, element, gap, light, heavy)
        } catch (error) {
            let message;
            if (error instanceof Error) message = error.message;
            else message = String(error);
            reportError({message});
        }

        const myPenalty = PenaltyScore(myMatrix);
        results[myPenalty].push(element);
    });

    const final = Unfold3DTo2D(results, count);
    PopulateWords(final);
}

// puts all of the words from the given string array into the on screen textbox
export function PopulateWords(words: string[]) {
    related.set(words);
}

// for debugging purposes
// prints the sequence alignment matrix
export function PrintMatrix(userString: string): number[][] {
    let secondString = "mean";

    let length: number = Math.max(userString.length, secondString.length);
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
function MakeSquareMatrix(length: number): number[][] {
    let matrix: number[][] = [];

    for (let i = 0; i < length; i++) {
        matrix[i] = [];
        for (let j = 0; j < length; j++) {
            matrix[i][j] = 0;
        }
    }

    return matrix;
}

// returns true if the character is a vowel
function IsVowel(c: string): boolean {
    const r = c.toUpperCase();
    return r === "A" || r === "E" || r === "I" || r === "O" || r === "U";
}

// returns true if the character is a consonant
function IsConsonant(c: string): boolean {
    const r = c.toUpperCase();
    return r === "B" || r === "C" || r === "D" || r === "F" || r === "G" || r === "H" || r === "J" || r === "K" || r === "L" || r === "M" || r === "N" || r === "P" || r === "Q" || r === "R" || r === "S" || r === "T" || r === "V" || r === "W" || r === "X" || r === "Y" || r === "Z";
}

// returns strings with the same length as the maximum length string by filling shorter string with spaces
function EqualiseStrings(string1: string, string2: string): [string, string] {
    const max = Math.max(string1.length, string2.length);

    const result1 = string1.padEnd(max, " ");
    const result2 = string2.padEnd(max, " ");

    return [result1, result2];
}

// algorithm to create penalty matrix from two strings and penalties
function SequenceAlignment(matrix: number[][], string1: string, string2: string, gap: number, light: number, heavy: number) {
    const rows: number = matrix.length;
    const columns: number = matrix[0].length;

    const [mstring1, mstring2]: [string, string] = EqualiseStrings(string1, string2);

    if (rows != columns)
        throw new Error("Rows Not Equal To Columns; Matrix Must Be Square");

    for (let i = 1; i < rows; i++) {
        matrix[i][0] = i * gap;
        matrix[0][i] = i * gap;
    }

    for (let i = 1; i < rows; i++) {
        
        for (let j = 1; j < rows; j++) {
            let diagonalPenalty = matrix[i - 1][j - 1];

            if (mstring1[i - 1] === mstring2[j - 1])
                diagonalPenalty; // characters match
            else if ((IsVowel(mstring1[i - 1]) && IsVowel(mstring2[j - 1]))
                    || (IsConsonant(mstring1[i - 1]) && IsConsonant(mstring2[j - 1])))
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

// max penalty is 3*strlen

// returns the last item (penalty score) in the matrix
function PenaltyScore(matrix: number[][]): number {
    let rows: number = matrix.length;
    let columns: number = matrix[0].length;

    return matrix[rows - 1][columns - 1];
}