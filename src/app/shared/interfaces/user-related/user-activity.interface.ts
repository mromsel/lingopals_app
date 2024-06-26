import { ActivityResult } from "src/app/features/lessons/interfaces/activity-result.interface"
import { UserLanguages } from "./user-languages.interface"
import { ActivityType } from "../masters/activity-type.interface"

export interface UserActivity {
    idUserActivity?: number,
    idUser: number,
    userLanguages?: UserLanguages,
    activityType?: ActivityType,
    xpGained?: number,
    idLesson?: number,
    date?: Date,
    results: ActivityResult[]
}

export const activityTypes: string[] = ["REVIEW", "LESSON"]