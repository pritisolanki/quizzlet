import './Footer.css'

export default function Footer(props){
    return (
        <div className="footer--container">
            <h2 className="footer--h2">You scored {props.score} correct answers</h2>
            <button className="btnSubmit" onClick={props.handleRestart}>Play again</button>
        </div>
    )
}