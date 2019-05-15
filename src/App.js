import React,{Component} from 'react';
import { Route } from 'react-router-dom'
import Nav from "./components/Nav"
import DogList from "./components/DogList"
import DogDetails from "./components/DogDetails"
import './App.css';
import Game1 from './components/Game1';
import Game2 from './components/Game2';
import Game3 from './components/Game3';
import GameOne from './components/GameOne';
import { getRandomImage } from './actions/getRandomImage';
import { connect } from 'react-redux';
import { getDogs } from './actions/getDogs';

class App extends Component{
  componentDidMount(){
    this.props.getDogs();
  }

  render(){
    return (
    <div className="App" >
      {
        this.props.dogs.length === 0 ? <p>loading...</p> : 
        <>
          <Nav/>
          <Route exact path="/" component={GameOne} />
          <Route exact path="/practice" component={DogList} />
          <Route exact path="/practice/:name" component={DogDetails} />
        </>
      } 
    </div>
    );
  };
}

const mapStateToProps = (state) => {
  return {
      dogs: Object.keys(state.dogsList)
  }
}

export default connect(mapStateToProps, { getDogs })(App);


