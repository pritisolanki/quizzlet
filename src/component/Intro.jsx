import './Intro.css'

export default function Intro(props){
    return (
        <div className="intro--container">
            <h1 className="intro--h1">Quizzical</h1>
            <p className="intro--text">What you know about Computers!</p>
            <button className="btnSubmit" onClick={props.startQuiz}>Start quiz</button>
        </div>
    )
}