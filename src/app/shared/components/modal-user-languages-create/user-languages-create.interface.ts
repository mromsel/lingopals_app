import { LanguageLevel } from "../../interfaces/masters/language-level.interface"
import { Language } from "../../interfaces/masters/language.interface"

export interface UserLanguagesCreate {
    idUser: number
    languageOrigin: Language
    languageTarget: Language
    languageLevel: LanguageLevel
    setPreferred: boolean
}