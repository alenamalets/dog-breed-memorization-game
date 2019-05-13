import * as request from 'superagent'
export const SET_IMAGES = 'SET_IMAGES'

export function setImages(images) {
    return {
      type: SET_IMAGES,
      payload: images
    }
  }
  
  export function getImages(name) {

    return function (dispatch) {  
      request(`https://dog.ceo/api/breed/${name}/images`)
        .then(response => {
          //console.log(response.body.message);
          
          dispatch(setImages(response.body.message))
        })
    }
  }