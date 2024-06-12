import { Language } from "../masters/language.interface";
import { Profile } from "../masters/profile.interface";

export interface User {
    idUser: number;
    username: string;
    email: string;
    profileImageUrl: string;
    preferredLanguage: Language;
    timeZone: string;
    profile: Profile
}