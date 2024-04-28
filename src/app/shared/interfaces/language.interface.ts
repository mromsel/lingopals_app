import { WritingSystem } from "./writing-system.interface";

export interface Language {
    idLanguage: number;
    languageName: string;
    isoCode: string;
    flag: string;
    writingSystem: WritingSystem;
}