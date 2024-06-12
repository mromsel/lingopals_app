import { GrammaticalCategory } from "../masters/grammatical-category.interface";
import { LanguageLevel } from "../masters/language-level.interface";
import { SemanticCategory } from "../masters/semantic-category.interface";

export interface WordReference {
    idWordRef: number;
    englishWord: string;
    englishDefinition: string;
    grammaticalCategory: GrammaticalCategory;
    languageLevel: LanguageLevel;
    semanticCategory: SemanticCategory;
    imageUrl: string;
}