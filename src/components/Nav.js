import React,{Component} from 'react';

export default class Nav extends Component{

    render(){      
        return (
            <div className="nav" > 
                <h1>WHAT THE DOG?</h1>               
                <span><a href="/">game 1</a></span>  
                <span><a href="/game2">game 2</a></span>   
                <span><a href="/game3">game 3</a></span>   
                <span><a href="/doglist">dog list</a></span>              
            </div>
        );
    }

}