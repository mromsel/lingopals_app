import { Word } from "src/app/shared/interfaces/word.interface"

export interface LessonFull {
    idLesson: number,
    lessonName: string,
    wordsList: WordsInLesson[]
}

export interface WordsInLesson {
    wordOrigin: Word,
    wordTarget: Word
}