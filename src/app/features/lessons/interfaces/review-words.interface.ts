import { UserLanguages } from "src/app/shared/interfaces/user-languages.interface";
import { WordsInQuiz } from "./words-in-quiz.interface";

export interface ReviewWords {
    languageLevel?: any,
    userLanguages: UserLanguages,
    wordsList: WordsInQuiz[]
}