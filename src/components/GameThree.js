import React, { Component } from 'react'



let  Random=0;

export default class Game3 extends Component {

  componentDidMount(){
    
  }

 
 handleChange = (event) => {

   const value = (Random)? event.target.getAttribute('data-url') : event.target.value

    if(this.props.questionCount < 5){ 

      if(value === this.props.correctAnswer){
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
   
      </div>
    )
  }
}