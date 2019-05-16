import { 
    GAME_ONE_DATA, 
    INCREMENT_CORRECT_COUNT_ONE, 
    INCREMENT_QUESTION_COUNT_ONE, 
    CHANGE_COLOR_ONE
} from '../actions/gameOneActions';

const initialState = {
    answers: [],
    correctCount: 0,
    questionCount: 1,
    redColor:"",
    greenColor:"",    
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case GAME_ONE_DATA:  
            return {...state, ...action.payload}
        case INCREMENT_CORRECT_COUNT_ONE:
            return {...state, ...action.payload};
        case INCREMENT_QUESTION_COUNT_ONE:
            return {...state, ...action.payload};
        case CHANGE_COLOR_ONE:
            return {...state, ...action.payload};    
        default:
            return state
    }
}

export default reducer