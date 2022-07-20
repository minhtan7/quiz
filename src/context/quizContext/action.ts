import { QuestionState } from "../../API";
import { AnswerObject } from "./questionContext";


export enum ACTIONTYPE {
    StartTraviaPending,
    StartTravia,
    StartTraviaFail,
    CheckAnswer,
    NextQuestion,

}

export interface StartTraviaPending {
    type: ACTIONTYPE.StartTraviaPending,
}

export interface StartTravia {
    type: ACTIONTYPE.StartTravia,
    payload: QuestionState[]
}

export interface StartTraviaFail {
    type: ACTIONTYPE.StartTraviaFail,
}

export interface CheckAnswer {
    type: ACTIONTYPE.CheckAnswer,
    payload: {
        answerObj: AnswerObject,
        addScore: number
    }
}

export interface NextQuestion {
    type: ACTIONTYPE.NextQuestion,
    payload: {
        next: boolean
    }
}



// export type QuizActions = AddPlayer | SetPlayerValue | ResetGame;

export type QuizAction = StartTraviaPending | StartTravia | StartTraviaFail | CheckAnswer | NextQuestion