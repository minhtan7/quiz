import React, { useContext } from 'react'
import QuestionCard from '../../components/QuestionCard'
import { ACTIONTYPE } from '../../context/quizContext/action'
import { QuizContext, startTrivia } from '../../context/quizContext/questionContext'
import { UserContext } from '../../context/userContext/userContext'
import { Wrapper } from './Anime.style'

const TOTAL_QUESTION = 10
export const Animepage: React.FC = () => {
  const { state, dispatch } = useContext(QuizContext)
  const {userState, userDispatch}= useContext(UserContext)
  const { loading, questions, number, userAnswers, score, gameOver } = state
   const checkAnswer  = (e: React.MouseEvent<HTMLButtonElement>)=>{
    if(!gameOver){
      const answer = e.currentTarget.value
      const correct = questions[number].correct_answer === answer
      let addScore = correct? 1 : 0
      const answerObj = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      }
      dispatch({type: ACTIONTYPE.CheckAnswer, payload: {answerObj, addScore}})
    }
  }
   const nextQuestion = ()=>{
     let next = !(number+1 === TOTAL_QUESTION)
     dispatch({type: ACTIONTYPE.NextQuestion, payload: {next}})
  }

  return (
    <Wrapper>
      <h1>QUIZZ</h1>
      <p>{userState.name}</p>
      {gameOver || userAnswers.length === TOTAL_QUESTION ? (
        <button className='start' onClick={()=>startTrivia(dispatch)}>
          Start
        </button>) : null}

      {!gameOver ? <p className='score'>Score: {score} </p> : null}
      {loading && <p>Loading Questions...</p>}
      {!loading && !gameOver && (
        <QuestionCard
          questionNo={number + 1}
          totalQuestion={TOTAL_QUESTION}
          question={questions[number]?.question}
          answers={questions[number]?.answer}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          callback={checkAnswer}
        />)}
      {!gameOver && !loading && userAnswers.length===number+1 && number!==TOTAL_QUESTION-1?(
      <button className='next' onClick={nextQuestion}>
        Next 
        </button>
      ):null}
    </Wrapper>
  )
}
