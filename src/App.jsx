import { useState, useEffect } from 'react'
import left from './assets/left.svg'
import right from './assets/right.svg'
import './App.css'
import Intro from './component/Intro'
import Question from './component/Question'

function App() {
  const [quiz, setQuizdata] = useState({ 
      questions:[],
      qstate:false})
  
  function startQuiz(){
    setQuizdata(prevStartquiz => {
        return {
          ...prevStartquiz,
          qstate: !prevStartquiz.qstate
        }
      })
  }

  function handleSubmit(){
    const allElement = document.getElementsByClassName("answer--option")
    for (let item of allElement) {
     for( let liItem of item.children)
     {
        if(liItem.dataset.correctanswer === 'true'){
          liItem.classList.remove("blue");
          liItem.classList.add("correct--answer");
        }

        if( liItem.classList.contains('blue')){
          liItem.classList.remove("blue");
          liItem.classList.add("pink");
        } 
     }
  }
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
  },[]);
  
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
        <div className='right--top'><img src={right}/></div>
        <div className="user-container">
          {!quiz.qstate && <Intro startQuiz={startQuiz}/>}
          {quiz.qstate && quizzlet}
          {quiz.qstate && 
          <div className="btnContainer"> 
            <button className="btnCheckAnswer" onClick={handleSubmit}>Check Answer</button>
          </div>}
        </div>
        <div className="botton--left"><img src={left}/></div>
      </div>
    </div>
  )
}

export default App