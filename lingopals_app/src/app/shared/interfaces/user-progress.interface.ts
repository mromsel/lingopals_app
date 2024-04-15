import { UserInfo } from "./user-info.interface";

export interface UserProgress {
    idUserProgressData: number,
    coins: number,
    currentStreak: number,
    streakStartDate: any,
    streakEndDate: any,
    maxStreak: number,
    xpPoints: number,
    user: UserInfo
}