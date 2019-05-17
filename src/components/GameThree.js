import React, { Component } from 'react'
import { connect } from 'react-redux';
import {
  setupQuestionGameThree, 
  incrementCorrectCount, 
  incrementQuestionCount, 
  changeColor,
  restartGame
} from '../actions/gameThreeActions'
import './GameThree.css'

const amountOfQuestions = 10;
class GameThree extends Component {

  componentDidMount(){
    this.props.setupQuestionGameThree();
  }

 
 handleChange = (event) => {
   const value = this.props.gamePicker === 0 ?  event.target.value : event.target.getAttribute('data-url');
    if(this.props.questionCount < amountOfQuestions){ 

      if(value === this.props.correctAnswer){
        this.props.incrementCorrectCount(this.props.correctCount);
        this.props.incrementQuestionCount(this.props.questionCount);
        this.props.setupQuestionGameThree();
      } else {
        this.props.changeColor(true);
        setTimeout(()=> {
          this.props.setupQuestionGameThree();
          this.props.changeColor(false);
          this.props.incrementQuestionCount(this.props.questionCount);
        }, 2000);
      }
    }else {
      if(value === this.props.correctAnswer){
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
  
  render() {

    return (
      <div>        
        {this.props.gamePicker===0?
          <div>
            {this.props.answers.length === 0 ? 
            <p>loading...</p> :
            <p>
                <div>Question: {this.props.questionCount} /10</div>
                <img className="dog-pic" style={{width: '30%', margin: '0 auto'}} src={this.props.imageUrl} alt={this.props.correctAnswer} />
                <div>{this.props.correctCount*10}%</div>
                <div id="myProgress" style={{width: '30%', margin: '0 auto'}}>
                  <div id="myBar" style={{ width: this.props.correctCount * 10 + '%'}}></div>
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
                  <br/><br/> 
                  <button onClick={this.props.restartGame}>START NEW GAME</button>
            </p>
            }           

          </div>
          :
          <div>
             
            {this.props.answers.length === 0 ? 
              <p>loading...</p> :
              <p>
                <b>{this.props.correctAnswer.toUpperCase()} </b>
                <div>Question: {this.props.questionCount} /10</div>
                <br></br>             
                {this.props.images.map((url,index) =>
                <img className={`game2-pic ${(this.props.answers[index]===this.props.correctAnswer)?this.props.greenColor2:this.props.redColor2}`}
                  data-url={this.props.answers[index]}  onClick={this.handleChange}  key={index} src={url}/>             
                )}
                  <div>{this.props.correctCount*10}%</div>  
                  <div id="myProgress" style={{width: '30%', margin: '0 auto'}}>
                      <div id="myBar" style={{ width: this.props.correctCount * 10 + '%'}}></div>
                  </div>

                   <br/><br/> 
                  <button onClick={this.props.restartGame}>START NEW GAME</button>         
              </p> 
            }
         </div>

  }        
          

   
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    ...state.gameThreeReducer
  }
}

export default connect(mapStateToProps, { 
  setupQuestionGameThree, 
  incrementCorrectCount, 
  incrementQuestionCount,
  changeColor,
  restartGame
})(GameThree);