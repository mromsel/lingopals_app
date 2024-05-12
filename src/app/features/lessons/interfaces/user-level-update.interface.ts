import { XPLevel } from "src/app/shared/interfaces/xp-level.interface";

export interface UserLevelUpdate {
    initialXpPoints: number;
    initialLevel: XPLevel;
    xpGained: number;
    finalXpPoints: number;
    isLevelUp: boolean;
    newLevel?: XPLevel;
}