import React,{Component} from 'react';

export default class Nav extends Component{

    render(){      
        return (
            <div className="nav" >                
                <span><a href="/">dogLists</a></span> 
                <span><a href="/game1">game1</a></span>  
                <span><a href="/game2">game2</a></span>   
                <span><a href="/game3">game3</a></span>                
            </div>
        );
    }

}