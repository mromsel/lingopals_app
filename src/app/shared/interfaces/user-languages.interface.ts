import { Language } from "./language.interface";

export interface UserLanguages {
    idUserLanguages: number,
    user: any,
    preferred: boolean,
    languageOrigin: Language,
    languageTarget: Language,
    startDate: Date
}