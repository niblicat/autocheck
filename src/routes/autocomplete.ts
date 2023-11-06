import { writable, type Writable } from "svelte/store";

export let related: Writable<string[]> = writable([]);

export function PopulateWords(word: string) {
    related.set([
        word
    ]);
}
