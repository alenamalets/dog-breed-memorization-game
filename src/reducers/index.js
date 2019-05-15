import { combineReducers } from 'redux'
import dogsList from './dogList'
import randomImage from './randomImage'
import dogImages from './dogImage'
import game2reducer from './game2reducer'


export default combineReducers({
  dogsList,
  randomImage,
  dogImages,
  game2reducer

})