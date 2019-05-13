import { combineReducers } from 'redux'
import dogsList from './dogList'
import randomImage from './randomImage'


export default combineReducers({
  dogsList,
  randomImage
})