import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  setupQuestionGameTwo, 
  incrementCorrectCount, 
  incrementQuestionCount, 
  changeColor,
  restartGame
} from '../actions/gameTwoActions'
import "./GameTwo.css"

const amountOfQuestions = 5;

class GameTwo extends Component {

  componentDidMount(){
    this.props.setupQuestionGameTwo();
  }

  handleChange = (event) => {
    if(this.props.questionCount < amountOfQuestions){      
      if(event.target.getAttribute('data-url') === this.props.correctAnswer){
        this.props.incrementCorrectCount(this.props.correctCount);
        this.props.incrementQuestionCount(this.props.questionCount);
        this.props.setupQuestionGameTwo();
      } 
      else {
        this.props.changeColor(true);
        setTimeout(()=> {
          this.props.setupQuestionGameTwo();
          this.props.changeColor(false);
          this.props.incrementQuestionCount(this.props.questionCount);
        }, 2000);
      }
    } 
    
    else {
      if(event.target.getAttribute('data-url') === this.props.correctAnswer){
        this.props.incrementCorrectCount(this.props.correctCount);
        setTimeout(() => {
          alert('GAME HAS FINISHED')
        }, 1000)
      } 
      else {
        this.props.changeColor(true);
        setTimeout(()=> {
          this.props.changeColor(false);
          alert('GAME HAS FINISHED')
        }, 2000);
      }
    }
  }

  render() {
    return (
      <div>            
        { this.props.images.length === 0 ? <p>loading...</p> : 
          <div>        
            <p><b>Сhoose the correct picture by breed name:</b></p>        
            <b>{this.props.correctAnswer.toUpperCase()} </b>
            <p>Question: {this.props.questionCount} / {amountOfQuestions}</p>
            <br/>
            { this.props.images.map((url,index) =>
              <img className= {`game2-pic ${(this.props.answers[index]===this.props.correctAnswer)?this.props.greenColor:this.props.redColor}`}
              data-url={this.props.answers[index]}  onClick={this.handleChange}  alt={index} key={index} src={url}/>
            )}
          </div>
        } 
        <div>{this.props.correctCount*20}%</div>
        <div id="myProgress" style={{width: '30%', margin: '0 auto'}}>
          <div id="myBar" style={{ width: this.props.correctCount * 20 + '%'}}></div>
        </div>
        <br></br>
        <button onClick={this.props.restartGame}>START NEW GAME</button>  
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  
  return {
    ...state.gameTwoReducer
  }
}

export default connect(mapStateToProps, {
  setupQuestionGameTwo, 
  incrementCorrectCount, 
  incrementQuestionCount, 
  changeColor,
  restartGame
})(GameTwo);