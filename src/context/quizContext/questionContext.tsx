import React, { createContext, useReducer } from "react";
import { Difficulty, fetchQuizQuestions, QuestionState } from "../../API";
import { ACTIONTYPE, QuizAction } from "./action";

export type AnswerObject = {
    question: string,
    answer: string,
    correct: boolean,
    correctAnswer: string
}

interface QuizState {
    loading: boolean,
    questions: QuestionState[],
    number: number,
    userAnswers: AnswerObject[],
    score: number,
    gameOver: boolean
}
const initialQuizState: QuizState = {
    loading: false,
    questions: [],
    number: 0,
    userAnswers: [],
    score: 0,
    gameOver: true,
}

export const QuizContext = createContext<{
    state: QuizState;
    dispatch: React.Dispatch<QuizAction>;
}>({
    state: initialQuizState,
    dispatch: () => null,
});

function quizReducer(state: QuizState, action: QuizAction): QuizState {
    switch (action.type) {
        case ACTIONTYPE.StartTraviaPending:
            return {...state, loading: true}
        case ACTIONTYPE.StartTravia:
            return {
                ...state, questions: action.payload,
                loading: false, gameOver: false
            };
        case ACTIONTYPE.StartTraviaFail:
            return {...state, loading: false}
        case ACTIONTYPE.CheckAnswer:
            return {
                ...state, userAnswers: [...state.userAnswers, action.payload.answerObj], score: state.score + action.payload.addScore
            }
        case ACTIONTYPE.NextQuestion:
            if(action.payload.next){
                return {...state, number: state.number+1}
            }
            return {...state, gameOver:true}
        default:
            throw new Error();
    }
}

export const QuizProvider = ({ children }: { children: any }): React.ReactElement => {
    const [state, dispatch] = useReducer(quizReducer, initialQuizState);
    return (
        <QuizContext.Provider value={{ state, dispatch }} >
            {children}
        </QuizContext.Provider>
    )
}



const TOTAL_QUESTION = 10

export const startTrivia = async (dispatch: React.Dispatch<QuizAction>) => {
    try {
        dispatch({ type: ACTIONTYPE.StartTraviaPending})
        const newQuestions = await fetchQuizQuestions(TOTAL_QUESTION, Difficulty.EASY)
        dispatch({ type: ACTIONTYPE.StartTravia, payload: newQuestions })
    } catch (error) {
        dispatch({ type: ACTIONTYPE.StartTraviaFail})
    }
}

export const getUser = async (dispatch: React.Dispatch<QuizAction>) => {
    try {
        dispatch({ type: ACTIONTYPE.StartTraviaPending})
        const newQuestions = await fetchQuizQuestions(TOTAL_QUESTION, Difficulty.EASY)
        dispatch({ type: ACTIONTYPE.StartTravia, payload: newQuestions })
    } catch (error) {
        dispatch({ type: ACTIONTYPE.StartTraviaFail})
    }
}
