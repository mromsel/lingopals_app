import { WordsInQuiz } from "./words-in-quiz.interface"

export interface LessonFull {
    idLesson: number,
    lessonName: string,
    wordsList: WordsInQuiz[]
}