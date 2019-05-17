import {
    GAME_TWO_DATA,
    INCREMENT_CORRECT_COUNT_TWO, 
    INCREMENT_QUESTION_COUNT_TWO, 
    CHANGE_COLOR_TWO,
    RESTART_GAME_TWO
} from '../actions/gameTwoActions'

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
        case GAME_TWO_DATA:  
            return {...state, ...action.payload}
        case INCREMENT_CORRECT_COUNT_TWO:
            return {...state, ...action.payload}
        case INCREMENT_QUESTION_COUNT_TWO:        
            return {...state, ...action.payload}
        case CHANGE_COLOR_TWO:
            return {...state, ...action.payload};   
        case RESTART_GAME_TWO:
            return initialState;    
        default:
            return state;
    }
}

export default reducer;