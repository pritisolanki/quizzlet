import { useState, useEffect } from 'react'
import left from './assets/left.svg'
import right from './assets/right.svg'
import './App.css'
import Intro from './component/Intro'
import Question from './component/Question'
import Footer from './component/Footer'

const initialState = {
  questions:[],
  qstate:false,
  qsubmit:true,
  score:0,
  restart:false
};

function App() {
  const [quiz, setQuizdata] = useState(initialState);

  function startQuiz(){
    setQuizdata(prevStartquiz => {
        return {
          ...prevStartquiz,
          qstate: !prevStartquiz.qstate
        }
      })
  }
  function handleRestart(){
    setQuizdata(initialState);
  }
  function handleSubmit(){
    const allElement = document.getElementsByClassName("answer--option");
    let userScore = 0

    for (let item of allElement) {
      for( let liItem of item.children)
      {
          if(liItem.dataset.correctanswer === 'true'){
            liItem.classList.contains('blue')? userScore= userScore+1: '';
            liItem.classList.remove("blue");
            liItem.classList.add("correct--answer");
          }

          if( liItem.classList.contains('blue')){
            liItem.classList.remove("blue");
            liItem.classList.add("pink");
          } 
      }
    }
  
    setQuizdata(prevStartquiz => {
      return {
        ...prevStartquiz,
        restart: true,
        qsubmit:false,
        score:userScore
      }
    })
  }

  function setData(data){
    setQuizdata(prevStartquiz => {
      return {
        ...prevStartquiz,
        questions: data
      }
    })   
  }
  
 useEffect( () =>{
      fetch('https://opentdb.com/api.php?amount=5&category=18&difficulty=hard&type=multiple')
      .then(res => res.json())
      .then(data => setData(data.results))
  },[quiz.questions.length]);
  
  function selectAnswer(e){
    e.currentTarget.classList.remove("default")
    e.currentTarget.classList.contains("blue") ? e.currentTarget.classList.remove("blue") : e.currentTarget.classList.add("blue")
  }

  const quizzlet = quiz.questions.map((item,index)=>{
     const inputStyle = item.userAnswer? "user--selected" : "default"
     return (<Question key={index} qItem={item} selectAnswer={selectAnswer} style={inputStyle} />)
  })
 
  return (
    <div className="main--container">
      <div className="quiz--container">
        <div className='right--top'>
            <img src={right}/></div>
        <div className="user-container">
          {!quiz.qstate && <Intro startQuiz={startQuiz}/>}
          {quiz.qstate && <h2 className='playText'>Today's Trivia!</h2>}
          {quiz.qstate && quizzlet}
          {quiz.qstate && quiz.qsubmit &&
          <div className="btnContainer" id="submitbtn"> 
            <button className="btnCheckAnswer" onClick={handleSubmit}>Check Answers</button>
          </div>}
          {quiz.restart && <Footer score={quiz.score} handleRestart={handleRestart}/>}
        </div>
        <div className="botton--left"><img src={left}/></div>
      </div>
    </div>
  )
}

export default App