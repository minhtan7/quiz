import api from "./apiService"
import { shuffleArray } from "./utils"

//get result form api 
export type Question = {
    category: string,
    correct_answer: string,
    difficulty: string
    incorrect_answers: string[],
    question: string,
    type: string
}

export type QuestionState = Question & { answer: string[] }

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export const fetchQuizQuestions = async (amount: number, difficulty: Difficulty) => {
    try {
        const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`
        const data = await (await fetch(url)).json()
        return data.results.map((question: Question) => (
            {
                ...question,
                answer: shuffleArray([...question.incorrect_answers, question.correct_answer])
            }
        ))
    } catch (error) {
        console.log(error)
    }
}

export const getUsers = async (email: string) => {
    try {
        const data = await api.get(`/users?email=${email}`)
        return data.data[0]
    } catch (error) {
        console.log(error)
    }
}

export const createUser = async (user: { email: string, name: string }) => {
    try {
        const data = await api.post("/users", user)
        return data.data
    } catch (error) {
        return error
    }
}