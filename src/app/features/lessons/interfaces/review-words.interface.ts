import { UserLanguages } from "src/app/shared/interfaces/user-languages.interface";
import { WordsInQuiz } from "./words-in-quiz.interface";
import { ActivityType } from "src/app/shared/interfaces/activity-type.interface";

export interface ReviewWords {
    languageLevel?: any,
    userLanguages: UserLanguages,
    activityType: ActivityType,
    wordsList: WordsInQuiz[]
}