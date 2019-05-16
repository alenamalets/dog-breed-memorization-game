
import {GAME_3,
        GAME_PICKER,
        INCREMENT_CORRECT_COUNT,
        INCREMENT_QUESTION_COUNT ,
        CHANGE_COLOR} from '../actions/gameTwoActions'

const initialState = {
    answers: [],
    images: [],
    correctCount: 0,
    questionCount: 1,
    redColor:"",
    greenColor:"",
    gamePicker:0
   
}

const  game3reducer= (state = initialState, action = {}) => {

    switch (action.type) {
        
        case GAME_3:  
            return {...state, ...action.payload}

         case GAME_PICKER:  
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

export default game3reducer