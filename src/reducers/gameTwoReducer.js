import {GAME_2} from '../actions/gameTwoActions'

const initialState = {
    answers: [],
    images: []
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GAME_2:  
            return {...state, ...action.payload}
        default:
            return state
    }
}

export default reducer