import React,{Component} from 'react';
import { connect } from 'react-redux'
import { getImages } from '../actions/dogDetailsActions'

class DogDetails extends Component{
  componentDidMount(){
    this.props.getImages(this.props.match.params.name)
  }
    
  render(){  
    return (
      <div>
        <h3>{this.props.match.params.name}</h3> 
        {this.props.Images.slice(0, 10).map((url,index) => 
          <p key={index}>
            <img src={url} width={200} alt={index}></img>
          </p>  
        )}        
      </div>
    );
  }
}

const mapStateToProps=(state) =>{
  return {Images:state.dogImages}
}
  
export default connect(mapStateToProps,{ getImages })(DogDetails)