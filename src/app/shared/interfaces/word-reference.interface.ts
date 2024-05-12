import { LanguageLevel } from "./language-level.interface";

export interface WordReference {
    idWordRef: number;
    englishWord: string;
    imageUrl: string;
    languageLevel: LanguageLevel;
    category: any;
}