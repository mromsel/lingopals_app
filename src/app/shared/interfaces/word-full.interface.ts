import { Language } from "./language.interface";
import { WordReference } from "./word-reference.interface";

export interface WordFull {
    idWord: number,
    wordReference: WordReference,
    language: Language,
    wordString: string,
    definition: string
}