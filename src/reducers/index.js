import { combineReducers } from 'redux'
import gameOneReducer from './gameOneReducer'
import gameTwoReducer from './gameTwoReducer'
import gameThreeReducer from './gameThreeReducer'
import dogsList from './dogListReducer'
import dogImages from './dogDetailsReducer'


export default combineReducers({
  gameOneReducer,
  gameTwoReducer,
  gameThreeReducer,
  dogsList,
  dogImages
})