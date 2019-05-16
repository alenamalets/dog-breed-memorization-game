import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  startGameOne, 
  incrementCorrectCount, 
  incrementQuestionCount, 
  changeColor,
  restartGame
} from '../actions/gameOneActions'
import './GameOne.css'

const amountOfQuestions = 10;
class GameOne extends Component {
  componentDidMount() {
    this.props.startGameOne();
    console.log(this.props.isInAnswerMode);
  }

  handleChange = (event) => {
    if (this.props.questionCount < amountOfQuestions) {
      if (event.target.value === this.props.correctAnswer) {
        this.props.incrementCorrectCount(this.props.correctCount);
        this.props.incrementQuestionCount(this.props.questionCount);
        this.props.startGameOne();
      } else {


        this.props.changeColor(true);

        setTimeout(() => {
          this.props.startGameOne();
          this.props.changeColor(false);
          this.props.incrementQuestionCount(this.props.questionCount);

        }, 2000);
      }
    } else {
      if (event.target.value === this.props.correctAnswer) {
        this.props.incrementCorrectCount(this.props.correctCount);
        setTimeout(() => {
          alert('game has finished')
        }, 1000)
      } else {
        this.props.changeColor(true);
        setTimeout(() => {
          this.props.changeColor(false);
          alert('game has finished')
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
          <p>Question: {this.props.questionCount} /10</p>

          <img className="dog-pic" src={this.props.imageUrl} alt={this.props.correctAnswer} />
          <div>{this.props.correctCount * 10}%</div>
          <div id="myProgress" style={{ width: '30%', margin: '0 auto' }}>
            <div id="myBar" style={{ width: this.props.correctCount * 10 + '%' }}></div>
          </div>
          {this.displayAnswers()}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.randomImage
  }
}

export default connect(mapStateToProps, {
  startGameOne, 
  incrementCorrectCount, 
  incrementQuestionCount, 
  changeColor, 
  restartGame
})(GameOne);