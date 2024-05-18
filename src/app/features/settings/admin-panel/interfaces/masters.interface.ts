import { ActivityType } from "src/app/shared/interfaces/activity-type.interface";
import { GrammaticalCategory } from "src/app/shared/interfaces/grammatical-category.interface";
import { LanguageLevel } from "src/app/shared/interfaces/language-level.interface";
import { Language } from "src/app/shared/interfaces/language.interface";
import { WritingSystem } from "src/app/shared/interfaces/writing-system.interface";
import { XPLevel } from "src/app/shared/interfaces/xp-level.interface";

export interface Masters {
    activityTypes: ActivityType[],
    grammaticalCategories: GrammaticalCategory[],
    languageLevels: LanguageLevel[],
    languages: Language[],
    profiles: any[],
    writingSystems: WritingSystem[],
    xpLevels: XPLevel[],
}