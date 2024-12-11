import React from 'react'
import "./questioncard.css"
function QuestionCard(props) {
    var tags = ["tag A", "tag B"];
    return (
    <div className='overall-container'>
    <div className="question-card-container">
        <div className="op">
            <div className="tab">
                <div className="tab-image-container">
                    <img className='tab-image' src={props.user_url}/>
                </div>
                <div className="tab-title">
                    {props.username}
                </div>
            </div>
        </div>
        <div className="content">
            <div className="ques-title">
                {props.title}
            </div>
            <div className="ques-cont">
                {props.content}
            </div>
        </div>
    </div>
    <div className="q-tags">
            {props.tags.map((item) => (
                <div className='tag-button'>{item}</div>
            ))}
    </div>
    </div>
    )
}

export default QuestionCard