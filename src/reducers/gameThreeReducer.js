import {
    GAME_THREE_DATA,
    INCREMENT_CORRECT_COUNT_THREE,
    INCREMENT_QUESTION_COUNT_THREE,
    CHANGE_COLOR_THREE,
    RESTART_GAME_THREE
} from '../actions/gameThreeActions'

const initialState = {
    answers: [],
    images: [],
    correctCount: 0,
    questionCount: 1,
    redColor:"",
    greenColor:"",
    gamePicker:0
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GAME_THREE_DATA:  
            return {...state, ...action.payload}
        case INCREMENT_CORRECT_COUNT_THREE:
            return {...state, ...action.payload}
        case INCREMENT_QUESTION_COUNT_THREE: 
            return {...state, ...action.payload}
        case CHANGE_COLOR_THREE:
            return {...state, ...action.payload};  
        case RESTART_GAME_THREE:
            return initialState;              
        default:
            return state;
    }
}

export default reducer;