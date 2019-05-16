import React, { Component } from 'react'
import {
  getRandomImage, incrementCorrectCount, incrementQuestionCount, handleClick,changeColor
} from '../actions/gameOneActions'
import { connect } from 'react-redux';
import './GameOne.css'

class GameOne extends Component {
  componentDidMount(){
    this.props.getRandomImage();
    console.log(this.props.isInAnswerMode);
  }

  handleChange = (event) => {
    if(this.props.questionCount < 5){ 
      if(event.target.value === this.props.correctAnswer){
        this.props.incrementCorrectCount(this.props.correctCount);
        this.props.incrementQuestionCount(this.props.questionCount);
        this.props.getRandomImage();
      } else {

      
        this.props.changeColor(true);

        setTimeout(()=> {
          this.props.getRandomImage();
          this.props.changeColor(false);
          this.props.incrementQuestionCount(this.props.questionCount);

        }, 2000);
      }
    }else {
      if(event.target.value === this.props.correctAnswer){
        this.props.incrementCorrectCount(this.props.correctCount);
        setTimeout(()=> {
          alert('game has finished')
        }, 1000)
      }else {
        this.props.changeColor(true);
        setTimeout(()=> {
          this.props.changeColor(false);
          alert('game has finished')
        }, 2000);
       
      }
    }
  }

  displayAnswers = () => {
    return this.props.answers.length === 0 ?
      <p>loading...</p> : 
      
      this.props.answers.map((answer, index) => {
        return (
          
          <div className="radio" key={index} >
            
            <label key={answer} className={(answer===this.props.correctAnswer)?this.props.greenColor:this.props.redColor}>
              {answer}
              <input type="radio" value={answer} id={answer} name="answer" 
              onChange={this.handleChange} />
            </label>  
          </div>
        );
      });
  }

  render() {
    return (
      <div>
        <p>Question: {this.props.questionCount} /5</p>
        <img style={{width: '30%', margin: '0 auto'}} src={this.props.imageUrl} alt={this.props.correctAnswer} />
        <div id="myProgress" style={{width: '30%', margin: '0 auto'}}>
          <div id="myBar" style={{ width: this.props.correctCount * 20 + '%'}}></div>
        </div>
        {this.displayAnswers()}
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
  getRandomImage, incrementCorrectCount, incrementQuestionCount, handleClick ,changeColor
})(GameOne);