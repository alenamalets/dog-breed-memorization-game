import React, { Component } from 'react'
import { connect } from 'react-redux';
import {getRandomImage} from '../actions/gameTwoActions'
import "./GameOne.css"

 class Game2 extends Component {

  componentDidMount(){
    this.props.getRandomImage();
  }

  handleChange = (event) => {
   
    console.log(event.target.getAttribute('data-url'));
  }

  render() {
    const i="url";
    return (
      <div>
        <h1>I'm a game 2</h1>      

        {this.props.answers.length === 0 ?
            <p>loading...</p> : 
           
            <p>                     
              <p>{this.props.correctAnswer.toUpperCase()}</p>
              
                  {this.props.images.map((url,index) =><p key={index}> <img data-url={i}  onClick={this.handleChange}  key={index} src={url}/> </p>)}
             
           </p>
         
        } 
        
            
        
            
      
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