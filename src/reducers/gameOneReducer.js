import { 
    SET_RANDOM_IMAGE, INCREMENT_CORRECT_COUNT, INCREMENT_QUESTION_COUNT, CLICKED_ITEM ,CHANGE_COLOR
} from '../actions/gameOneActions';

const initialState = {
    answers: [],
    correctCount: 0,
    questionCount: 1,
    redColor:"",
    greenColor:"",    
    clicked: ''
}

const reducer = (state = initialState, action = {}) => {
    switch (action.type) {
        case SET_RANDOM_IMAGE:  
            return {...state, ...action.payload}
        case INCREMENT_CORRECT_COUNT:
            return {...state, ...action.payload};
        case INCREMENT_QUESTION_COUNT:
            return {...state, ...action.payload};
        case CLICKED_ITEM:
            return {...state, ...action.payload};
        case CHANGE_COLOR:
            return {...state, ...action.payload};    

        default:
            return state
    }
}

export default reducer