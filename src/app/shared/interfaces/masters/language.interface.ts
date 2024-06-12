import { Image } from "./image.interface";
import { WritingSystem } from "./writing-system.interface";

export interface Language {
    idLanguage: number;
    languageName: string;
    isoCode: string;
    flag: Image;
    writingSystem: WritingSystem;
}