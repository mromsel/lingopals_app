import { UserLanguages } from "src/app/shared/interfaces/user-related/user-languages.interface";
import { WordsInQuiz } from "./words-in-quiz.interface";
import { ActivityType } from "src/app/shared/interfaces/masters/activity-type.interface";

export interface ReviewWords {
    languageLevel?: any,
    userLanguages: UserLanguages,
    activityType: ActivityType,
    wordsList: WordsInQuiz[]
}