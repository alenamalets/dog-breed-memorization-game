import * as request from 'superagent';
import {answersNoRepeat} from './gameOneActions'
import {shuffleAnswers} from './gameOneActions'
export const GAME_2 = 'GAME_2';
export const INCREMENT_CORRECT_COUNT = 'INCREMENT_CORRECT_COUNT';
export const INCREMENT_QUESTION_COUNT = 'INCREMENT_QUESTION_COUNT'; 
export const CHANGE_COLOR = 'CHANGE_COLOR';  


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
    type: GAME_2,
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
    type: INCREMENT_CORRECT_COUNT,
    payload: {
      correctCount: incrementedCount
    }
  }
}

export function incrementQuestionCount(oldCount){
  const incrementedCount = oldCount+1;
  return {
    type: INCREMENT_QUESTION_COUNT,
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
    type: CHANGE_COLOR,
    payload: {
      redColor:redcolor,
      greenColor:greencolor   
    }
  }

}