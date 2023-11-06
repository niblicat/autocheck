import { writable, type Writable } from "svelte/store";
import * as readline from 'readline';
import * as fs from 'fs';
import Dictionary from '$lib/dictionary.txt?raw';


// const compares: string[] = [];

// var text = fs.readFileSync('dictionary.txt').toString('utf-8');
const compares: string[] = Dictionary.split('\n');

export var related: Writable<string[]> = writable([]);

export function PopulateWords(word: string) {
    related.set([
        word
    ]);
    related.set(compares);
}
