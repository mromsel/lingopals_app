import { Language } from "../masters/language.interface";

export interface User {
    idUser: number;
    username: string;
    email: string;
    profileImageUrl: string;
    preferredLanguage: Language;
    timeZone: string;
}