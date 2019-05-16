import * as request from 'superagent';
import {
  getCorrectAnswerFromDogList,
  addWrongAnswersWithoutRepeat,
  shuffleAnswers,
  getRandomImageFromImageList
} from './functionsForAllGames';

export const GAME_TWO_DATA = 'GAME_TWO_DATA';
export const INCREMENT_CORRECT_COUNT_TWO = 'INCREMENT_CORRECT_COUNT_TWO';
export const INCREMENT_QUESTION_COUNT_TWO = 'INCREMENT_QUESTION_COUNT_TWO'; 
export const CHANGE_COLOR_TWO = 'CHANGE_COLOR_TWO';  
export const RESTART_GAME_TWO = 'RESTART_GAME_TWO';

export function startGameTwo(){
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
        dispatch(sendGameTwoDataToState(correctAnswer, shuffledAnswers, allImages));
      })
  }
}

function sendGameTwoDataToState(correctAnswer, shuffledAnswers, allImages){
  return {
    type: GAME_TWO_DATA,
    payload: {
      correctAnswer: correctAnswer,
      answers: shuffledAnswers,
      images: allImages
    }
  }
}

export function incrementCorrectCount(oldCount){
  const incrementedCount = oldCount+1;
  return {
    type: INCREMENT_CORRECT_COUNT_TWO,
    payload: {
      correctCount: incrementedCount
    }
  }
}

export function incrementQuestionCount(oldCount){
  const incrementedCount = oldCount+1;
  return {
    type: INCREMENT_QUESTION_COUNT_TWO,
    payload: {
      questionCount: incrementedCount
    }
  }
}

export function changeColor(isInAnswerMode){
  let redcolor=""
  let greencolor=""
  if(isInAnswerMode){
    redcolor="redcolor"
    greencolor="greencolor"
  }
    
  return {
    type: CHANGE_COLOR_TWO,
    payload: {
      redColor:redcolor,
      greenColor:greencolor   
    }
  }
}

export function restartGame(){
  return function (dispatch){
    dispatch({
      type: RESTART_GAME_TWO
    })
    dispatch(startGameTwo());
  }
}