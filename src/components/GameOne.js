import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  setupQuestionGameOne,
  incrementCorrectCount,
  incrementQuestionCount,
  changeColor,
  restartGame,
  handleClick,
  handleKeyPress
} from '../actions/gameOneActions'
import './GameOne.css'
import KeyHandler, { KEYPRESS } from 'react-key-handler';

const amountOfQuestions = 5;

class GameOne extends Component {

  componentDidMount() {
    this.props.setupQuestionGameOne();
  }

  displayAnswers = () => {
    return (
      <div>
        {this.props.answers.map((answer, index) => {
          return (
            <div className="radio" key={index} >
                <label key={answer} className={
                  this.props.givenAnswer ? answer === this.props.correctAnswer ? 'green' : 'red' : ''
                }>
                {answer}
                <input type="radio" value={answer} id={answer} name="answer"
                  onChange={this.props.handleClick} checked={this.props.simulateClick[index]} />
              </label>
            </div>
          );
        })}
        <br></br>
        <button onClick={this.props.restartGame}>START NEW GAME</button>
      </div>
    )
  }

  render() {
    return (
      this.props.answers.length === 0 ? <p>loading...</p> :
      <div className="progress">
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="1"
          onKeyHandle={event => {
            this.props.handleKeyPress(event)
            this.props.handleClick({ target: { value: this.props.answers[0] }})
          }}
        />
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="2"
          onKeyHandle={event => {
            this.props.handleKeyPress(event)
            this.props.handleClick({ target: { value: this.props.answers[1] }})
          }}
        />
        <KeyHandler
          keyEventName={KEYPRESS}
          keyValue="3"
          onKeyHandle={event => {
            this.props.handleKeyPress(event)
            this.props.handleClick({ target: { value: this.props.answers[2] }})
          }}
        />
       
          <p>Question: {this.props.questionCount} / {amountOfQuestions}</p>

          <img className="dog-pic" src={this.props.imageUrl} alt={this.props.correctAnswer} />
          <div>{this.props.correctCount * 20}%</div>
          <div id="myProgress" style={{ width: '30%', margin: '0 auto' }}>
            <div id="myBar" style={{ width: this.props.correctCount * 20 + '%' }}></div>
          </div>
          {this.displayAnswers()}
        </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.gameOneReducer
  }
}

export default connect(mapStateToProps, {
  setupQuestionGameOne, 
  incrementCorrectCount, 
  incrementQuestionCount, 
  changeColor, 
  restartGame,
  handleClick,
  handleKeyPress
})(GameOne);