import React, { Component } from 'react'
import {getRandomImage} from '../actions/getRandomImage'
import { connect } from 'react-redux';

class Game1 extends Component {

  componentDidMount(){
    this.props.getRandomImage();
  }

  substractName = (name) => {
    name = decodeURIComponent(name);
    name = name.substring(30);
    name = name.substring(0, name.lastIndexOf("/"));
    const newName = name.includes("-") ? name.substring(0, name.lastIndexOf("-")) : name
    return newName;
    
  }  
  render() {
    const imageUrl = this.props.randomImage;
    return (
      <div>
        <h1>I'm a game 1</h1>
        <img src={imageUrl} alt="random dog"></img>
        <p>{this.substractName (imageUrl)}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  console.log("state", state);
  return {
      randomImage: state.randomImage
  }
}

export default connect(mapStateToProps, { getRandomImage })(Game1)
