import React, { Component } from 'react'
import { connect } from 'react-redux';
import {getRandomImage} from '../actions/gameTwoActions'
import "./GameOne.css"

 class Game2 extends Component {

  componentDidMount(){
    this.props.getRandomImage();
  }

  handleChange = (event) => {
   
    console.log(event.target.getAttribute('src'));
  }

  render() {
    const i="url";
    return (
      <div>
        <h1>I'm a game 2</h1>      

        {this.props.answers.length === 0 ?
            <p>loading...</p> : 
            <p>                     
              {this.props.correctAnswer.toUpperCase()}
              
                  {this.props.images.map((url,index) => <img data-url={i}  onClick={this.handleChange}  key={index} src={url}/> )} 
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
  console.log("state",state.game2reducer.correctAnswer);
  
  return {
   
    ...state.game2reducer
  
  }
}

export default connect(mapStateToProps, {getRandomImage})(Game2);