import { ActivityType } from "src/app/shared/interfaces/masters/activity-type.interface"
import { LanguageLevel } from "src/app/shared/interfaces/masters/language-level.interface"
import { SemanticCategory } from "src/app/shared/interfaces/masters/semantic-category.interface"

export interface LessonDisplay {
    idLesson: number
    lessonName: string
    languageLevel: LanguageLevel
    activityType: ActivityType
    isCompleted: boolean
    userCompletedLesson?: UserCompletedLesson
    semanticCategory: SemanticCategory
}

export interface UserCompletedLesson {
    idCompletedLesson: number
    idUserLanguages: number
    idLesson: number
    startDate: Date
    completionDate: Date
    progressPercent: number
}