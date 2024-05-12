import { Language } from "./language.interface";

export interface UserLanguages {
    id: number,
    idUser: number,
    languageOrigin: Language,
    languageTarget: Language,
    startDate: Date
}