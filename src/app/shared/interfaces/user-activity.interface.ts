
export interface UserActivity {
    idUserActivity: number,
    idUser: number,
    type: string,
    idLesson?: number,
    date?: Date
}

export const activityTypes: string[] = ["REVIEW", "LESSON"]