import * as request from 'superagent';
export const GAME_ONE_DATA = 'GAME_ONE_DATA';
export const INCREMENT_CORRECT_COUNT_ONE = 'INCREMENT_CORRECT_COUNT_ONE';
export const INCREMENT_QUESTION_COUNT_ONE = 'INCREMENT_QUESTION_COUNT_ONE';
export const CHANGE_COLOR_ONE = "CHANGE_COLOR_ONE"

const substractName = (name) => {
  name = decodeURIComponent(name);
  name = name.substring(30);
  name = name.substring(0, name.lastIndexOf("/"));
  const newName = name.includes("-") ? name.substring(0, name.lastIndexOf("-")) : name
  return newName;
}  

export const answersNoRepeat = (dogsList, correctAnswer) => {
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

export const shuffleAnswers = (array) => {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export function setupQuestion(dogsList, randomImageUrl){
  const correctAnswer = substractName(randomImageUrl);
  const allAnswers = answersNoRepeat(dogsList, correctAnswer);
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

export function getRandomImage(){
  return function (dispatch, getState){  
    request('https://dog.ceo/api/breeds/image/random')
      .then(response => {
        const dogsList = getState().dogsList;
        dispatch(setupQuestion(dogsList, response.body.message))
      })
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
