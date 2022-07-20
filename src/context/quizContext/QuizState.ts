import { QuestionState } from "../../API";
import { AnswerObject } from "./questionContext";


export interface startTriviaProps {
    setLoading: (value: boolean) => void,
    setGameOver: (value: boolean) => void,
    setQuestions: (value: QuestionState[]) => void,
    setScore: (value: number) => void,
    setUserAnswers: (value: AnswerObject[]) => void,
    setNumber: (value: number) => void
}

export type checkAnswerProps = {
    e: React.MouseEvent<HTMLButtonElement>,
    gameOver: boolean,
    questions: QuestionState[],
    number: number,
    setScore: (value: (v: number) => void) => void,
    setUserAnswers: (value: (v: AnswerObject[]) => void) => void
}