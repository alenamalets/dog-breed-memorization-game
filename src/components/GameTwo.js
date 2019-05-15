import React, { Component } from 'react'
import { connect } from 'react-redux';
import {getRandomImage} from '../actions/gameTwoActions'

 class Game2 extends Component {

  componentDidMount(){
    this.props.getRandomImage();
  }
  render() {
    return (
      <div>
        <h1>I'm a game 2</h1>
      </div>
    )
  }
}



const mapStateToProps = (state) => {
  console.log("state",state.game2reducer);
  
  return {
    ...state.game2reducer
  }
}

export default connect(mapStateToProps, {getRandomImage})(Game2);