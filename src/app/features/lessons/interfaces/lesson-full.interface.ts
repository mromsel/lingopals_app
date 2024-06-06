import { ActivityType } from "src/app/shared/interfaces/masters/activity-type.interface"
import { WordsInQuiz } from "./words-in-quiz.interface"

export interface LessonFull {
    idLesson: number,
    lessonName: string,
    activityType: ActivityType,
    wordsList: WordsInQuiz[]
}