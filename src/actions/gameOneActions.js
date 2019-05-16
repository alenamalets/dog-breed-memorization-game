import * as request from 'superagent';
import {
  getCorrectAnswerFromFetchedUrl,
  addWrongAnswersWithoutRepeat,
  shuffleAnswers
} from './functionsForAllGames';

export const GAME_ONE_DATA = 'GAME_ONE_DATA';
export const INCREMENT_CORRECT_COUNT_ONE = 'INCREMENT_CORRECT_COUNT_ONE';
export const INCREMENT_QUESTION_COUNT_ONE = 'INCREMENT_QUESTION_COUNT_ONE';
export const CHANGE_COLOR_ONE = "CHANGE_COLOR_ONE";
export const RESTART_GAME_ONE = "RESTART_GAME_ONE";  

export function startGameOne(){
  return function (dispatch, getState){  
    request('https://dog.ceo/api/breeds/image/random')
      .then(response => {
        const dogsList = getState().dogsList;
        dispatch(sendGameOneDataToState(dogsList, response.body.message))
      })
  }
}

function sendGameOneDataToState(dogsList, randomImageUrl){
  const correctAnswer = getCorrectAnswerFromFetchedUrl(randomImageUrl);
  const allAnswers = addWrongAnswersWithoutRepeat(dogsList, correctAnswer);
  const shuffledAnswers = shuffleAnswers(allAnswers);
  return {
    type: GAME_ONE_DATA,
    payload: {
      imageUrl: randomImageUrl,
      correctAnswer: correctAnswer,
      answers: shuffledAnswers
    }
  }
}

export function incrementCorrectCount(oldCount){
  const incrementedCount = oldCount+1;
  return {
    type: INCREMENT_CORRECT_COUNT_ONE,
    payload: {
      correctCount: incrementedCount
    }
  }
}

export function incrementQuestionCount(oldCount){
  const incrementedCount = oldCount+1;
  return {
    type: INCREMENT_QUESTION_COUNT_ONE,
    payload: {
      questionCount: incrementedCount
    }
  }
}

export function changeColor(isInAnswerMode){
  let redcolor=""
  let greencolor=""
  if(isInAnswerMode){
    redcolor="red"
    greencolor="green"
  }   
  return {
    type: CHANGE_COLOR_ONE,
    payload: {
      redColor:redcolor,
      greenColor:greencolor   
    }
  }
}

export function restartGame(){
  return function (dispatch){
    dispatch({
      type: RESTART_GAME_ONE
    })
    dispatch(startGameOne());
  }
}
