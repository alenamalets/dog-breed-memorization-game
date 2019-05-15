import * as request from 'superagent';
export const GAME_2 = 'GAME_2';


export function getCorrectName (dogList){
    const correctName = dogList[Math.floor(Math.random()*dogList.length)];
    return correctName
}

const answersNoRepeat = (dogsList, correctAnswer) => {
    const answers = [];
    answers.push(correctAnswer);
  
    for(let i=0; i<2; i++){
        const filterTarget = answers[i];
        dogsList = dogsList.filter(dog => {
            return dog !== filterTarget;
        })
        const randomAnswer = dogsList[Math.floor(Math.random() * dogsList.length)];
        answers.push(randomAnswer);
    }
    return answers;
}

export function getUrlArray(arrayofnames) {
    const newArray = arrayofnames.map(name => {
        return `https://dog.ceo/api/breed/${name}/images`
    })
    return newArray
}

export function setupQuestion(dogsList){
    const correctAnswer = getCorrectName(dogsList);
    const allAnswers = answersNoRepeat(dogsList, correctAnswer);
    const allImages = getUrlArray(allAnswers)
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

export function getRandomImage(){
    return function (dispatch, getState){  
      request('https://dog.ceo/api/breeds/image/random')
        .then(response => {
          const dogsList = getState().dogsList;
          dispatch(setupQuestion(dogsList))
        })
    }
  }