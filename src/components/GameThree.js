import React, { Component } from 'react'

import {
  startGameThree, incrementCorrectCount, incrementQuestionCount, changeColor
} from '../actions/gameThreeActions'
import { connect } from 'react-redux';
import './GameOne.css'


const Random=0;
 class GameThree extends Component {

  componentDidMount(){
    this.props.startGameThree();
  }

 
 handleChange = (event) => {

   const value = (Random)? event.target.getAttribute('data-url') : event.target.value

    if(this.props.questionCount < 5){ 

      if(value === this.props.correctAnswer){
        this.props.incrementCorrectCount(this.props.correctCount);
        this.props.incrementQuestionCount(this.props.questionCount);
        this.props.startGameThree();
      } else {

      
        this.props.changeColor(true);

        setTimeout(()=> {
          this.props.startGameThree();
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
        setTimeout(()=> {
          alert('game has finished')
        }, 2000);
       
      }
    }
  }
  render() {

    return (
      <div>
        <h1>I'm a game 3</h1>
        {this.props.gamePicker===0?
          <p>Game1</p>:
          <p>Game2</p>
      }
   
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    console.log(state.game3reducer.gamePicker)
  return {
  ...state.game3reducer
  }
}

export default connect(mapStateToProps, { 
  startGameThree, incrementCorrectCount, incrementQuestionCount,changeColor
})(GameThree);