import { Language } from "./language.interface";

export interface UsersLanguages {
    idUser: number,
    languageOrigin: Language,
    languageTarget: Language,
    startDate: Date
}