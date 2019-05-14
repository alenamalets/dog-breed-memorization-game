import * as request from 'superagent'
export const SET_BREED_IMAGES = 'SET_BREED_IMAGES'

export function setBreedImages(dogImages) {
    return {
      type: SET_BREED_IMAGES,
      payload: dogImages
    }
  }
  
export function getBreedImages(dogname) {
  return function (dispatch) {
    request(`https://dog.ceo/api/breed/${dogname}/images`)
      .then(response => {
        console.log(response);
        dispatch(setBreedImages(response.body.message))
      })
  }
}
