import { ActivityType } from "src/app/shared/interfaces/masters/activity-type.interface";
import { GrammaticalCategory } from "src/app/shared/interfaces/masters/grammatical-category.interface";
import { LanguageLevel } from "src/app/shared/interfaces/masters/language-level.interface";
import { Language } from "src/app/shared/interfaces/masters/language.interface";
import { Profile } from "src/app/shared/interfaces/masters/profile.interface";
import { SemanticCategory } from "src/app/shared/interfaces/masters/semantic-category.interface";
import { WritingSystem } from "src/app/shared/interfaces/masters/writing-system.interface";
import { XPLevel } from "src/app/shared/interfaces/masters/xp-level.interface";

export interface Masters {
    activityTypes: ActivityType[],
    grammaticalCategories: GrammaticalCategory[],
    languageLevels: LanguageLevel[],
    languages: Language[],
    profiles: Profile[],
    semanticCategories: SemanticCategory[]
    writingSystems: WritingSystem[],
    xpLevels: XPLevel[],
}