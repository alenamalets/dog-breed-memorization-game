import { SET_BREED_IMAGES } from '../actions/getBreedImages'

const breedImages = (state = [], action = {}) => {
    switch (action.type) {
        case SET_BREED_IMAGES:  
            return [...action.payload]
        default:
            return state
    }
}

export default breedImages