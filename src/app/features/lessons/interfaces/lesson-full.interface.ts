import { ActivityType } from "src/app/shared/interfaces/masters/activity-type.interface"
import { WordsInQuiz } from "./words-in-quiz.interface"
import { SemanticCategoryFull } from "src/app/shared/interfaces/words-related/lesson.interface"
import { LanguageLevel } from "src/app/shared/interfaces/masters/language-level.interface"

export interface LessonFull {
    idLesson: number,
    lessonName: string,
    languageLevel: LanguageLevel,
    activityType: ActivityType,
    wordsList: WordsInQuiz[],
    semanticCategory: SemanticCategoryFull
}