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
