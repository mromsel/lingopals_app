import { User } from "./user.interface";
import { XPLevel } from "../masters/xp-level.interface";

export interface UserProgress {
    idUserProgressData: number,
    coins: number,
    currentStreak: number,
    streakStartDate: any,
    streakEndDate: any,
    maxStreak: number,
    xpPoints: number,
    xpLevel: XPLevel,
    user: User
}