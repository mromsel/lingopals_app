import { GrammaticalCategory } from "./grammatical-category.interface";
import { LanguageLevel } from "./language-level.interface";

export interface WordReference {
    idWordRef: number;
    englishWord: string;
    englishDefinition: string;
    grammaticalCategory: GrammaticalCategory;
    languageLevel: LanguageLevel;
    category: any;
    imageUrl: string;
}