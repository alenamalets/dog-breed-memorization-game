import * as request from 'superagent'
export const SET_RANDOM_IMAGE = 'SET_RANDOM_IMAGE'

export function setRandomImage(dogs) {
    return {
      type: SET_RANDOM_IMAGE,
      payload: dogs
    }
  }
  
  export function getRandomImage() {
    return function (dispatch) {  
      request('https://dog.ceo/api/breeds/image/random')
        .then(response => {
          console.log("random", response.body.message);
          dispatch(setRandomImage(response.body.message))
        })
    }
  }