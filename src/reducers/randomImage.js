import { SET_RANDOM_IMAGE } from '../actions/getRandomImage'

const reducer = (state = [], action = {}) => {
    switch (action.type) {
        case SET_RANDOM_IMAGE:  
            return action.payload
        default:
            return state
    }
}

export default reducer