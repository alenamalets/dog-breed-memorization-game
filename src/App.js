import React,{Component} from 'react';
import { Route } from 'react-router-dom'
import Nav from "./components/Nav"
import DogList from "./components/DogList"
import DogDetails from "./components/DogDetails"
import GameOne from './components/GameOne';
import GameTwo from './components/GameTwo';
import GameThree from './components/GameThree';
import { connect } from 'react-redux';
import { getDogs } from './actions/dogListActions';


import './App.css';
import './components/assets/css/master.css'

class App extends Component{
  componentDidMount(){
    this.props.getDogs();
  }

  render(){
    return (
    <div className="container" >
      {
        this.props.dogs.length === 0 ? <p>loading...</p> : 
        <>
          <Nav/>
          <Route exact path="/" component={GameOne} />
          <Route exact path="/game2" component={GameTwo} />
          <Route exact path="/game3" component={GameThree} />
          <Route exact path="/doglist" component={DogList} />
          <Route exact path="/doglist/:name" component={DogDetails} />
        
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


