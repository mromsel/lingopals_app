import { LanguageLevel } from "../../interfaces/language-level.interface"
import { Language } from "../../interfaces/language.interface"

export interface UserLanguagesCreate {
    idUser: number
    languageOrigin: Language
    languageTarget: Language
    languageLevel: LanguageLevel
    setPreferred: boolean
}