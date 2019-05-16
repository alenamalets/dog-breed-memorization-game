import {GAME_2,INCREMENT_CORRECT_COUNT, INCREMENT_QUESTION_COUNT, CHANGE_COLOR} from '../actions/gameTwoActions'


const initialState = {
    answers: [],
    images: [],
    correctCount: 0,
    questionCount: 1,
    redColor:"",
    greenColor:""
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GAME_2:  
            return {...state, ...action.payload}

        case INCREMENT_CORRECT_COUNT:

            return {...state, ...action.payload}

        case INCREMENT_QUESTION_COUNT:        
            return {...state, ...action.payload}
        case CHANGE_COLOR:
            return {...state, ...action.payload};    
              
        default:
            return state
    }
}

export default reducer