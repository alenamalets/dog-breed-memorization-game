import React,{Component} from 'react';
import { connect } from 'react-redux';

class DogList extends Component{
    render(){    
        const dogList = this.props.dogs
        .map((dog, index) => {
            return (
                <li key={index}>
                    {dog}
                </li>
            )
        })

        return (
            <div>
                <h1>DogLists</h1> 
                <ul>
                    {dogList}
                </ul>            
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dogs: Object.keys(state.dogsList)
    }
}

export default connect(mapStateToProps)(DogList)
