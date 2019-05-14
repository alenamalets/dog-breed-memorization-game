import { combineReducers } from 'redux'
import dogsList from './dogList'
import randomImage from './randomImage'
import dogImages from './dogImage'


export default combineReducers({
  dogsList,
  randomImage,
  dogImages

})