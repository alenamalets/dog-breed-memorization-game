import React, { Component } from 'react'
import { connect } from 'react-redux';
import {getRandomImage,incrementCorrectCount, incrementQuestionCount, changeColor} from '../actions/gameTwoActions'
import "./GameTwo.css"

 class Game2 extends Component {

  componentDidMount(){
    this.props.getRandomImage();
  }

  handleChange = (event) => {



    if(this.props.questionCount < 5){

      

      if(event.target.getAttribute('data-url') === this.props.correctAnswer){

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
        alert('game has finished')
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
             
        
          {this.props.images.length === 0 ?
            <p>loading...</p> : 
            <p>                     

             <b>{this.props.correctAnswer.toUpperCase()} </b>
             <p>Question: {this.props.questionCount} /5</p>
             <br></br>             
             {this.props.images.map((url,index) =>

             <img className={(this.props.answers[index]===this.props.correctAnswer)?this.props.greenColor:this.props.redColor}
             width={120} height={300} data-url={this.props.answers[index]}  onClick={this.handleChange}  key={index} src={url}/>
             
             )}
             

           </p>
           
         
        } 
        <div id="myProgress" style={{width: '30%', margin: '0 auto'}}>
          <div id="myBar" style={{ width: this.props.correctCount * 20 + '%'}}></div>
        </div>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  return {
   
    ...state.game2reducer
  
  }
}

export default connect(mapStateToProps, {getRandomImage, incrementCorrectCount, incrementQuestionCount, changeColor})(Game2);