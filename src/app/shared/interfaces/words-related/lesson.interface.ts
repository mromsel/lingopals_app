import { Word } from "./word.interface"

export interface Lesson {
    idLesson: number,
    lessonName: string,
    languageLevel: {
        idLevel: number,
        levelName: string
    },
    listWordsOrigin: Array<Word>,
    listWordsDestiny: Array<Word>,
}