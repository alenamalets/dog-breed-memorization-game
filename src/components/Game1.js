import React, { Component } from 'react'
import {getRandomImage} from '../actions/getRandomImage'
import { connect } from 'react-redux';

class Game1 extends Component {

  componentDidMount(){
    this.props.getRandomImage();
}
  render() {
    return (
      <div>
        <h1>I'm a game 1</h1>
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
