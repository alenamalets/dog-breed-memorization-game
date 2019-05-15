import * as request from 'superagent';
import {answersNoRepeat} from './gameOneActions'
export const GAME_2 = 'GAME_2';


export function getCorrectName (dogList){
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
    const allImages = [];
    request(`https://dog.ceo/api/breed/${allAnswers[0]}/images`)
      .then(response => {
        allImages.push(pickRandomImgUrl(response.body.message));
        request(`https://dog.ceo/api/breed/${allAnswers[1]}/images`)
        .then(response => {
          allImages.push(pickRandomImgUrl(response.body.message));
          request(`https://dog.ceo/api/breed/${allAnswers[2]}/images`)
          .then(response => {
            allImages.push(pickRandomImgUrl(response.body.message));
            dispatch(setupQuestion(dogsList, correctAnswer, allAnswers, allImages))
          })
        })
      })
  }
}

export function setupQuestion(dogsList, correctAnswer, allAnswers, allImages){
  return {
    type: GAME_2,
    payload: {
      dogs: [...dogsList],
      correctAnswer: correctAnswer,
      answers: allAnswers,
      images: allImages
    }
  }
}