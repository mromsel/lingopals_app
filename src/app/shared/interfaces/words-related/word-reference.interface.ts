import { GrammaticalCategory } from "../masters/grammatical-category.interface";
import { LanguageLevel } from "../masters/language-level.interface";

export interface WordReference {
    idWordRef: number;
    englishWord: string;
    englishDefinition: string;
    grammaticalCategory: GrammaticalCategory;
    languageLevel: LanguageLevel;
    // category?: any;
    imageUrl: string;
}