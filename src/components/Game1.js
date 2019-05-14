import React, { Component } from 'react'
import {getRandomImage} from '../actions/getRandomImage'
import {getDogs} from '../actions/getDogs'
import { connect } from 'react-redux';
import './Game1.css'


class Game1 extends Component {

  state={
    questionCounter:0,
    correctAnswer:0
  } 

  componentDidMount(){  
    this.props.getRandomImage();
    this.props.getDogs();
  }
 
  substractName = (name) => {
    name = decodeURIComponent(name);
    name = name.substring(30);
    name = name.substring(0, name.lastIndexOf("/"));
    const newName = name.includes("-") ? name.substring(0, name.lastIndexOf("-")) : name
    return newName;
  }  

  answersNoRepeat = (dogsList, answers) => {
      for(let i=0; i<2; i++){
          const filterTarget = answers[i];
          dogsList = dogsList.filter(dog => {
              return dog !== filterTarget;
          })
          const randomAnswer = dogsList[Math.floor(Math.random() * dogsList.length)];
          answers[i+1] = randomAnswer;
          //console.log(dogsList);
      }
  }

  shuffle = (array) => {

    let currentIndex = array.length;
    let temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  };





  handleChange=(event)=> {   
    const imageUrl = this.props.randomImage;
    const correctAnswer = this.substractName (imageUrl)    
    const maxQuestionCount=4;  
    if(maxQuestionCount===this.state.questionCounter) {
      if(event.target.value===correctAnswer){           
        this.setState({correctAnswer: this.state.correctAnswer+1})
        this.setState({questionCounter: this.state.questionCounter+1}) 
        this.props.getRandomImage()                     
        console.log("correct answer")
      }else{
        console.log("oops");
        setTimeout(()=>{
          this.props.getRandomImage();
          this.setState({questionCounter: this.state.questionCounter+1}) 
          alert(`Finish, your score ${this.state.correctAnswer * 20}%`)
        },2000);
      } 
    }
    if(maxQuestionCount > this.state.questionCounter){
        if(event.target.value===correctAnswer){           
          this.setState({correctAnswer: this.state.correctAnswer+1})
          this.setState({questionCounter: this.state.questionCounter+1}) 
          this.props.getRandomImage()                     
          console.log("correct answer")
        }else{
          console.log("oops");
          setTimeout(()=>{
            this.props.getRandomImage();
            this.setState({questionCounter: this.state.questionCounter+1}) 
          },2000);
        } 
     }
   
    //  console.log("questionCounter",this.state.questionCounter)
    //  console.log("correctAnswer",this.state.correctAnswer)
  
  }
  

  render() {
    const imageUrl = this.props.randomImage;
    const answers = ['','',''];
    answers[0] = this.substractName (imageUrl);

    this.answersNoRepeat(this.props.dogs, answers);
    this.shuffle(answers);

    return (
      <div>
        <h1>I'm a game 1</h1>
        <img src={imageUrl} alt="random dog"></img>  
        <div id="myProgress" style={{width: 1000, marginLeft: 200}}>
          <div id="myBar" style={{ width: this.state.correctAnswer *200}}></div>
        </div>
        <p>please choose correct answer:</p>
        {answers.map((answer,index )=> 
          <div className="radio" key={index} >
          <label key={answer} >
            <input type="radio" value={answer} id={answer} name="answer" onChange={this.handleChange}   />{answer}
          </label>  
         </div>)}
      </div>
       
    )
  }
}

const mapStateToProps = (state) => {
 // console.log("state", state);
  return {
      randomImage: state.randomImage,
      dogs: Object.keys(state.dogsList)
  }
} 

export default connect(mapStateToProps, { getRandomImage, getDogs })(Game1)
