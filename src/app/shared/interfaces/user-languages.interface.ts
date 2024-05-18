import { Language } from "./language.interface";

export interface UserLanguages {
    id: number,
    idUser: number,
    preferred: boolean,
    languageOrigin: Language,
    languageTarget: Language,
    startDate: Date
}