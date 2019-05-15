import { 
    SET_RANDOM_IMAGE, INCREMENT_CORRECT_COUNT, INCREMENT_QUESTION_COUNT, CLICKED_ITEM 
} from '../actions/getRandomImage';

const initialState = {
    answers: [],
    correctCount: 0,
    questionCount: 1,
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
        default:
            return state
    }
}

export default reducer