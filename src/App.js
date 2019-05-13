import React,{Component} from 'react';
import { Route } from 'react-router-dom'
//import logo from './logo.svg';
import Nav from "./components/Nav"
import DogList from "./components/DogList"
import DogDetails from "./components/DogDetails"
import './App.css';

class App extends Component{
  render(){
    return (
        <div className="App" >
           <Nav/>
           <Route exact path="/" component={DogList} />
           <Route exact path="/dog/:id" component={DogDetails} />
           
        </div>
    );
  };
}

export default App;
