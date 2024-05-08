import { Language } from "./language.interface";

export interface UserLanguages {
    idUserLanguages: number,
    idUser: number,
    languageOrigin: Language,
    languageTarget: Language,
    startDate: Date
}