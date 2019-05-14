import React,{Component} from 'react';
import { connect } from 'react-redux'
import { getImages } from '../actions/getImages'
 class DogDetails extends Component{

    componentDidMount(){

      //console.log(this.props.getImages("african")) 
      this.props.getImages(this.props.match.params.name)
    }
     

    render(){  
         
        

        return (
            <div>
               <h1>dog details</h1> 
               {this.props.Images.slice(0, 10).map((url,index) => 
                    <p>
                      {index}- <img src={url} width={200}></img>
                    </p>  
                )}        
            </div>
        );
    }

}

 const mapStateToProps=(state) =>{
    //console.log(state.dogImages)
    return {Images:state.dogImages}
  }
  
  export default connect(mapStateToProps,{getImages})(DogDetails)