import React,{Component} from 'react';
import { connect } from 'react-redux';
import { getDogs } from '../actions/getDogs'
import {Link} from 'react-router-dom'

class DogList extends Component{
    componentDidMount(){
        this.props.getDogs();
    }

    render(){    
        const dogList = this.props.dogs
        .map((dog, index) => {
            return (
                <li key={index}>
                    <Link to={ `/dog/${dog}` }>
                    {dog}
                    </Link>
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

export default connect(mapStateToProps, { getDogs })(DogList)
