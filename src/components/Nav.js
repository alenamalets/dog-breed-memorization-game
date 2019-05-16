import React,{Component} from 'react';
import { Link } from 'react-router-dom';
import logo from './assets/images/dog_1.png'

export default class Nav extends Component{

    render(){      
        return (
            <div>
               <div id="logo" > <img src={logo}/> </div>
                <div className="nav" > 
                    <h1>WHAT THE DOG?</h1>               
                    <span><Link to="/">game 1</Link></span>  
                    <span><Link to="/game2">game 2</Link></span>   
                    <span><Link to="/game3">game 3</Link></span>   
                    <span><Link to="/doglist">dog list</Link></span>              
                </div>
            </div>
        );
    }

}