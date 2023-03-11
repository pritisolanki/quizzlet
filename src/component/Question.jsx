import React from 'react'
import "./Question.css"

export default function Question(props){
    function convertHTML(str){
        return str.replace(/&quot;/g, '"').replace(/&#039;/g, '\'');
    }
    const classList= `option ${props.style}`;

    function createAnsweroptions(){
        const answerArr = props.qItem.incorrect_answers.concat(props.qItem.correct_answer);
        const answerOption = answerArr.map((opt,id) => {
            const liLabel = convertHTML(opt);
            return(
                <li className={classList} key={id} 
                    data-correctanswer={id === answerArr.length-1 ? true: false}
                    data-answer={liLabel} 
                    onClick={props.selectAnswer}>
                    {liLabel}
                </li>)
        });
        return answerOption;
    }
    const answers = createAnsweroptions();

    function randomizeAnswers(ansObj){
        for (let i = ansObj.length - 1; i > 0; i -= 1) {
            let rand = Math.floor((i + 1) * Math.random());
            let temp = ansObj[rand];
            ansObj[rand] = ansObj[i];
            ansObj[i] = temp;
        }
        return ansObj
    }
    const randAnswers=randomizeAnswers(answers);

    return(
        <div className="question--container">
            <p className="question">
                {convertHTML(props.qItem.question)}
            </p>
            <div className="answer--choice">
                <ul className='answer--option' id={props.id}> 
                    {randAnswers}
                </ul>
            </div>
        </div>
    )
}