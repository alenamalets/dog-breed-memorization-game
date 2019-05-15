import React,{Component} from 'react';
import { connect } from 'react-redux'
import { getImages } from '../actions/getImages'

class DogDetails extends Component{
  componentDidMount(){
    this.props.getImages(this.props.match.params.name)
  }
    
  render(){  
    return (
      <div>
        <h3>{this.props.match.params.name}</h3> 
        {this.props.Images.slice(0, 10).map((url,index) => 
          <p>
            {index}- <img  key={index} src={url} width={200}></img>
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