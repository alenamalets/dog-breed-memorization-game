import { SET_IMAGES } from '../actions/getImages'

const reducer = (state = [], action = {}) => {
    
    switch (action.type) {
         case SET_IMAGES:  
            return action.payload

        default:
            return state
    }
}

export default reducer