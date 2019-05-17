import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  setupQuestionGameOne,
  incrementCorrectCount,
  incrementQuestionCount,
  changeColor,
  restartGame
} from '../actions/gameOneActions'
import './GameOne.css'

const amountOfQuestions = 5;

class GameOne extends Component {

  componentDidMount() {
    this.props.setupQuestionGameOne();
  }

  handleChange = (event) => {

    if (this.props.questionCount < amountOfQuestions) {
      if (event.target.value === this.props.correctAnswer) {
        this.props.incrementCorrectCount(this.props.correctCount);
        this.props.incrementQuestionCount(this.props.questionCount);
        this.props.setupQuestionGameOne();
      } 
      else {
        this.props.changeColor(true);
        setTimeout(() => {
          this.props.setupQuestionGameOne();
          this.props.changeColor(false);
          this.props.incrementQuestionCount(this.props.questionCount);
        }, 2000);
      }
    } 

    else {
      if (event.target.value === this.props.correctAnswer) {
        this.props.incrementCorrectCount(this.props.correctCount);
        setTimeout(() => {
          alert('GAME HAS FINISHED')
        }, 1000)
      } 
      else {
        this.props.changeColor(true);
        setTimeout(() => {
          this.props.changeColor(false);
          alert('GAME HAS FINISHED')
        }, 2000);
      }
    }
  }

  displayAnswers = () => {
    return (
      <div>
        {this.props.answers.map((answer, index) => {
          return (
            <div className="radio" key={index} >
              <label key={answer} className={(answer === this.props.correctAnswer) ? this.props.greenColor : this.props.redColor}>
                {answer}
                <input type="radio" value={answer} id={answer} name="answer"
                  onChange={this.handleChange} />
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
        <div className="progress" >
          <div>
            <p><b>Сhoose the correct breed name</b></p>
            <p>Question: {this.props.questionCount} / {amountOfQuestions}</p>
            <img className="dog-pic" src={this.props.imageUrl} alt={this.props.correctAnswer} />
            <div>{this.props.correctCount * 20}%</div>
            <div id="myProgress" style={{ width: '30%', margin: '0 auto' }}>
              <div id="myBar" style={{ width: this.props.correctCount * 20 + '%' }}></div>
            </div>
            {this.displayAnswers()}
          </div>
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
  restartGame
})(GameOne);