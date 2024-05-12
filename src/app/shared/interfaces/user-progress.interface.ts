import { UserInfo } from "./user-info.interface";
import { XPLevel } from "./xp-level.interface";

export interface UserProgress {
    idUserProgressData: number,
    coins: number,
    currentStreak: number,
    streakStartDate: any,
    streakEndDate: any,
    maxStreak: number,
    xpPoints: number,
    xpLevel: XPLevel,
    user: UserInfo
}