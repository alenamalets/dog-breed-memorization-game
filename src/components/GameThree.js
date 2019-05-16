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
          <div>
               <p>Question: {this.props.questionCount} /5</p>
              <img style={{width: '30%', margin: '0 auto'}} src={this.props.imageUrl} alt={this.props.correctAnswer} />
              <div id="myProgress" style={{width: '30%', margin: '0 auto'}}>
                <div id="myBar" style={{ width: this.props.correctCount * 20 + '%'}}></div>
              </div>

            { this.props.answers.map((answer, index) => {
            return (
              
              <div className="radio" key={index} >
                
                <label key={answer} className={(answer===this.props.correctAnswer)?this.props.greenColor:this.props.redColor}>
                  {answer}
                  <input type="radio" value={answer} id={answer} name="answer" 
                  onChange={this.handleChange} />
                </label>  
              </div>
            );
          })}
              
          </div>
          :
          <div>

              <b>{this.props.correctAnswer.toUpperCase()} </b>
             <p>Question: {this.props.questionCount} /5</p>
             <br></br>             
             {this.props.images.map((url,index) =>

             <img className="game2-pic" data-url={this.props.answers[index]}  onClick={this.handleChange}  key={index} src={url}/>
             
             )}


          <div id="myProgress" style={{width: '30%', margin: '0 auto'}}>
               <div id="myBar" style={{ width: this.props.correctCount * 20 + '%'}}></div>
           </div>
            
            </div>
      }
   
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  ...state.game3reducer
  }
}

export default connect(mapStateToProps, { 
  startGameThree, incrementCorrectCount, incrementQuestionCount,changeColor
})(GameThree);