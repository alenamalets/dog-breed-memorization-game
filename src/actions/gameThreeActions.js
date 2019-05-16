import * as request from 'superagent';
export const GAME_3 = 'GAME_3';
export const INCREMENT_CORRECT_COUNT = 'INCREMENT_CORRECT_COUNT';
export const INCREMENT_QUESTION_COUNT = 'INCREMENT_QUESTION_COUNT';
export const CHANGE_COLOR = "CHANGE_COLOR"





export function setupQuestion(dogsList, randomImageUrl){
 
}

export function getRandomImage(){
  
}
//game2
function getCorrectName (dogList){
    const correctName = dogList[Math.floor(Math.random()*dogList.length)];
    return correctName
}
//game2
const pickRandomImgUrl = (images) => {
  const randomNumber = Math.floor(Math.random() * images.length);
  return images[randomNumber];
}

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



export function incrementCorrectCount(oldCount){
  const incrementedCount = oldCount+1;
  return {
    type: INCREMENT_CORRECT_COUNT,
    payload: {
      correctCount: incrementedCount
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
    type: CHANGE_COLOR,
    payload: {
      redColor:redcolor,
      greenColor:greencolor   
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

