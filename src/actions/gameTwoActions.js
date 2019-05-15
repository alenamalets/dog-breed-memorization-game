import * as request from 'superagent';
import {answersNoRepeat} from './gameOneActions'
export const GAME_2 = 'GAME_2';


function getCorrectName (dogList){
    const correctName = dogList[Math.floor(Math.random()*dogList.length)];
    return correctName
}

const pickRandomImgUrl = (images) => {
  const randomNumber = Math.floor(Math.random() * images.length);
  return images[randomNumber];
}

const shuffleAnswers = (array) => {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

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