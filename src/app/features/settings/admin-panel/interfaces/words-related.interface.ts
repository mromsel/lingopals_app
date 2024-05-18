import { Lesson } from "src/app/shared/interfaces/lesson.interface";
import { WordReference } from "src/app/shared/interfaces/word-reference.interface";

export interface WordsRelated {
    categories: any[],
    lessons: Lesson[],
    wordReferences: WordReference[],
}