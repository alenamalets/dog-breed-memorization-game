import { SET_DOGS } from '../actions/getDogs'

const reducer = (state = [], action = {}) => {
    switch (action.type) {
        case SET_DOGS:  
            return Object.keys(action.payload)
        default:
            return state
    }
}

export default reducer