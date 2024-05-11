import { ActivityResult } from "src/app/shared/interfaces/activity-result.interface"
import { UserLanguages } from "./user-languages.interface"

export interface UserActivity {
    idUserActivity?: number,
    idUser: number,
    userLanguages?: UserLanguages,
    type: string,
    xpGained?: number,
    idLesson?: number,
    date?: Date,
    results: ActivityResult[]
}

export const activityTypes: string[] = ["REVIEW", "LESSON"]