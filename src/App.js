import React,{Component} from 'react';
import { Route } from 'react-router-dom'
//import logo from './logo.svg';
import Nav from "./components/Nav"
import DogList from "./components/DogList"
import DogDetails from "./components/DogDetails"
import './App.css';
import Game1 from './components/Game1';

class App extends Component{
  render(){
    return (
        <div className="App" >
           <Nav/>
           <Route exact path="/" component={DogList} />
           <Route exact path="/dog/:id" component={DogDetails} />
           <Route exact path="/game1" component={Game1} />
           
        </div>
    );
  };
}

export default App;


