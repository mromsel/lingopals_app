import { Language } from "./language.interface";

export interface UserInfo {
    idUser: number;
    username: string;
    email: string;
    profileImageUrl: string;
    preferredLanguage: Language;
    timeZone: string;
}