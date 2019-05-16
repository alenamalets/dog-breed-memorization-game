import { combineReducers } from 'redux'
import dogsList from './dogListReducer'
import randomImage from './gameOneReducer'
import dogImages from './dogDetailsReducer'
import game2reducer from './gameTwoReducer'
import game3reducer from './gameThreeReducer'


export default combineReducers({
  dogsList,
  randomImage,
  dogImages,
  game2reducer,
  game3reducer

})