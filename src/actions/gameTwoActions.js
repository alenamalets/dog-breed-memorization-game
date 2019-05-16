import * as request from 'superagent';
import {answersNoRepeat} from './gameOneActions'
import {shuffleAnswers} from './gameOneActions'
export const GAME_TWO_DATA = 'GAME_TWO_DATA';
export const INCREMENT_CORRECT_COUNT_TWO = 'INCREMENT_CORRECT_COUNT_TWO';
export const INCREMENT_QUESTION_COUNT_TWO = 'INCREMENT_QUESTION_COUNT_TWO'; 
export const CHANGE_COLOR_TWO = 'CHANGE_COLOR_TWO';  

function getCorrectName (dogList){
    const correctName = dogList[Math.floor(Math.random()*dogList.length)];
    return correctName
}

const pickRandomImgUrl = (images) => {
  const randomNumber = Math.floor(Math.random() * images.length);
  return images[randomNumber];
}

export function getRandomImage(){
  return function (dispatch, getState){  
    const dogsList = getState().dogsList;
    const correctAnswer = getCorrectName(dogsList);
    const allAnswers = answersNoRepeat(dogsList, correctAnswer);
    const shuffledAnswers = shuffleAnswers(allAnswers);

    const allRequests = shuffledAnswers.map(answer => {
        return request(`https://dog.ceo/api/breed/${encodeURI(answer)}/images`);
    });

    Promise
      .all(allRequests)
      .then(responses => {
        const allImages = responses.map(response => {
          return pickRandomImgUrl(response.body.message);
        });
        dispatch(setupQuestion(dogsList, correctAnswer, shuffledAnswers, allImages));
      })
  }
}

export function setupQuestion(dogsList, correctAnswer, shuffledAnswers, allImages){
  return {
    type: GAME_TWO_DATA,
    payload: {
      dogs: [...dogsList],
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