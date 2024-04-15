import { WritingSystem } from "./writing-system.interface";

export interface Language {
    idLanguage: number;
    languageName: string;
    isoCode: String;
    flag: String;
    writingSystem: WritingSystem;
}