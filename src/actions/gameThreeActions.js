import * as request from 'superagent';
import {
  getCorrectAnswerFromFetchedUrl,
  getCorrectAnswerFromDogList,
  addWrongAnswersWithoutRepeat,
  shuffleAnswers,
  getRandomImageFromImageList
} from './functionsForAllGames';

export const GAME_THREE_DATA = 'GAME_THREE_DATA';
export const INCREMENT_CORRECT_COUNT_THREE = 'INCREMENT_CORRECT_COUNT_THREE';
export const INCREMENT_QUESTION_COUNT_THREE = 'INCREMENT_QUESTION_COUNT_THREE';  
export const CHANGE_COLOR_THREE = 'CHANGE_COLOR_THREE'; 
export const RESTART_GAME_THREE = 'RESTART_GAME_THREE';

export function setupQuestionGameThree(){
 const gamePicker = Math.floor(Math.random()*2);
  if(gamePicker === 0){
    return function (dispatch, getState){  
      request('https://dog.ceo/api/breeds/image/random')
        .then(response => {
          const dogsList = getState().dogsList;
          dispatch(sendGameOneDataToState(dogsList, response.body.message, gamePicker));  
        })
    }
  }
  else{
    return function (dispatch, getState){  
      const dogsList = getState().dogsList;
      const correctAnswer = getCorrectAnswerFromDogList(dogsList);
      const allAnswers = addWrongAnswersWithoutRepeat(dogsList, correctAnswer);
      const shuffledAnswers = shuffleAnswers(allAnswers);
  
      const allRequests = shuffledAnswers.map(answer => {
        return request(`https://dog.ceo/api/breed/${encodeURI(answer)}/images`);
      });
  
      Promise
        .all(allRequests)
        .then(responses => {
          const allImages = responses.map(response => {
            return getRandomImageFromImageList(response.body.message);
          });
          dispatch(sendGameTwoDataToState(correctAnswer, shuffledAnswers, allImages, gamePicker));
        })
    }
  }
}

export function sendGameOneDataToState(dogsList, randomImageUrl, gamePicker){
  const correctAnswer = getCorrectAnswerFromFetchedUrl(randomImageUrl);
  const allAnswers = addWrongAnswersWithoutRepeat(dogsList, correctAnswer);
  const shuffledAnswers = shuffleAnswers(allAnswers);
  return {
    type: GAME_THREE_DATA,
    payload: {
      imageUrl: randomImageUrl,
      correctAnswer: correctAnswer,
      answers: shuffledAnswers,
      gamePicker: gamePicker
    }
  }
}

export function sendGameTwoDataToState(correctAnswer, shuffledAnswers, allImages, gamePicker){
  return {
    type: GAME_THREE_DATA,
    payload: {
      correctAnswer: correctAnswer,
      answers: shuffledAnswers,
      images: allImages,
      gamePicker: gamePicker
    }
  }
}

export function incrementCorrectCount(oldCount){
  const incrementedCount = oldCount+1;
  return {
    type: INCREMENT_CORRECT_COUNT_THREE,
    payload: {
      correctCount: incrementedCount
    }
  }
}

export function incrementQuestionCount(oldCount){
  const incrementedCount = oldCount+1;
  return {
    type: INCREMENT_QUESTION_COUNT_THREE,
    payload: {
      questionCount: incrementedCount
    }
  }
}

export function changeColor(isInAnswerMode){
  let redcolor=""
  let greencolor=""
  let redcolor2=""
  let greencolor2=""
  if(isInAnswerMode){
    redcolor="red"
    greencolor="green"
    redcolor2="redcolor"
    greencolor2="greencolor" 
  }
  return {
    type:  CHANGE_COLOR_THREE,
    payload: {
      redColor:redcolor,
      greenColor:greencolor,
      redColor2:redcolor2,
      greenColor2:greencolor2, 
    }
  }
}

export function restartGame(){
  return function (dispatch){
    dispatch({
      type: RESTART_GAME_THREE
    })
    dispatch(setupQuestionGameThree());
  }
}

