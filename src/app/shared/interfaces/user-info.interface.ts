import { Language } from "./language.interface";
import { UserLanguages } from "./user-languages.interface";

export interface UserInfo {
    idUser: number;
    username: string;
    email: string;
    profileImageUrl: string;
    preferredLanguage: Language;
    preferredUserLanguages: UserLanguages;
    timeZone: string;
}