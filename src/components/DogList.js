import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class DogList extends Component {
    render() {
        const dogList = this.props.dogsList
            .map((dog, index) => {
                return (
                    <li key={index}>
                        <Link to={`/doglist/${dog}`}>
                            {dog}
                        </Link>
                    </li>
                )
            })

        return (
            <div>             
                <ul className="diglist"  >
                    {dogList}
                </ul>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dogsList: state.dogsList
    }
}

export default connect(mapStateToProps)(DogList)
