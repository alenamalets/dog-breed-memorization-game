import React, { Component } from 'react'
import {getRandomImage} from '../actions/getRandomImage'
import { connect } from 'react-redux';


const shuffle = function (array) {

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
const answers = ['option1', 'option2', 'option3'];

class Game1 extends Component {

componentDidMount(){
   
   shuffle(answers);
    this.props.getRandomImage();  
 
}
  render() {
    return (
      <div>
        <h1>I'm a game 1</h1>
        <img src={this.props.randomImage}></img>     
        <p>please choose correct answer:</p>
    {answers.map((answer,index )=> <div className="radio" key={index} ><input type="radio" value={answer}  />{answer}</div>)}


      </div>
       
      

   
    )
  }
}

const mapStateToProps = (state) => {
  console.log("state", state.randomImage);
  return {
      randomImage: state.randomImage
  }
}

export default connect(mapStateToProps, { getRandomImage })(Game1)
