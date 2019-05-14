import React, { Component } from 'react'
import {getRandomImage} from '../actions/getRandomImage'
import {getDogs} from '../actions/getDogs'
import { connect } from 'react-redux';
import './Game1.css'

class Game1 extends Component {
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
          console.log(dogsList);
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
        <div id="myProgress">
          <div id="myBar" style={{ width: this.props.score / 100 }}></div>
        </div>
        <button onclick="move()">Click Me</button> 
        <p>please choose correct answer:</p>
        {answers.map((answer,index )=> 
          <div className="radio" key={index} >
            <input type="radio" value={answer} />{answer}
         </div>)}
      </div>
       
    )
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
      randomImage: state.randomImage,
      dogs: Object.keys(state.dogsList)
  }
}

export default connect(mapStateToProps, { getRandomImage, getDogs })(Game1)
