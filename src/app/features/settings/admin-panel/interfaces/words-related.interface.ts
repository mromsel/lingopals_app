import { Lesson } from "src/app/shared/interfaces/words-related/lesson.interface";
import { WordReference } from "src/app/shared/interfaces/words-related/word-reference.interface";

export interface WordsRelated {
    categories: any[],
    lessons: Lesson[],
    wordReferences: WordReference[],
}