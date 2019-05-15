import React,{Component} from 'react';
import { Route } from 'react-router-dom'
import Nav from "./components/Nav"
import DogList from "./components/DogList"
import DogDetails from "./components/DogDetails"
import './App.css';
import GameTwo from './components/GameTwo';
import GameOne from './components/GameOne';
import { connect } from 'react-redux';
import { getDogs } from './actions/dogListActions';

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
          <Route exact path="/game2" component={GameTwo} />
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


