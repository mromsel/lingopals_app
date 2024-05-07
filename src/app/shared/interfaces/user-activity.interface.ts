import { ActivityResult } from "src/app/shared/interfaces/activity-result.interface"

export interface UserActivity {
    idUserActivity?: number,
    idUser: number,
    type: string,
    xpGained?: number,
    idLesson?: number,
    date?: Date,
    results: ActivityResult[]
}

export const activityTypes: string[] = ["REVIEW", "LESSON"]