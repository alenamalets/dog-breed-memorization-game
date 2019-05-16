import * as request from 'superagent';
export const GAME_3 = 'GAME_3';
export const INCREMENT_CORRECT_COUNT = 'INCREMENT_CORRECT_COUNT';
export const INCREMENT_QUESTION_COUNT = 'INCREMENT_QUESTION_COUNT';  
export const CHANGE_COLOR = "CHANGE_COLOR"; 

function getCorrectName (dogList){
    const correctName = dogList[Math.floor(Math.random()*dogList.length)];
    return correctName
}

const substractName = (name) => {
  name = decodeURIComponent(name);
  name = name.substring(30);
  name = name.substring(0, name.lastIndexOf("/"));
  const newName = name.includes("-") ? name.substring(0, name.lastIndexOf("-")) : name
  return newName;
}  

const pickRandomImgUrl = (images) => {
  const randomNumber = Math.floor(Math.random() * images.length);
  return images[randomNumber];
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
  let redcolor2=""
  let greencolor2=""
  if(isInAnswerMode){
    redcolor="red"
    greencolor="green"
    redcolor2="redcolor"
    greencolor2="greencolor" 
  }
  
  return {
    type: CHANGE_COLOR,
    payload: {
      redColor:redcolor,
      greenColor:greencolor,
      redColor2:redcolor2,
      greenColor2:greencolor2,
      
    }
  }
}

///////////GAME ONE//////////////
export function gameOneToProps(dogsList, randomImageUrl, gamePicker){
  const correctAnswer = substractName(randomImageUrl);
  const allAnswers = answersNoRepeat(dogsList, correctAnswer);
  const shuffledAnswers = shuffleAnswers(allAnswers);
  return {
    type: GAME_3,
    payload: {
      dogs: [...dogsList],
      imageUrl: randomImageUrl,
      correctAnswer: correctAnswer,
      answers: shuffledAnswers,
      gamePicker: gamePicker
    }
  }
}

export function gameTwoToProps(dogsList, correctAnswer, shuffledAnswers, allImages, gamePicker){
  return {
    type: GAME_3,
    payload: {
      dogs: [...dogsList],
      correctAnswer: correctAnswer,
      answers: shuffledAnswers,
      images: allImages,
      gamePicker: gamePicker
    }
  }
}

export function startGameThree(){
 const gamePicker = Math.floor(Math.random()*2);
  if(gamePicker === 0){
    return function (dispatch, getState){  
      request('https://dog.ceo/api/breeds/image/random')
        .then(response => {
          const dogsList = getState().dogsList;
          dispatch(gameOneToProps(dogsList, response.body.message, gamePicker));  
        })
    }
  }
  else{
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
          dispatch(gameTwoToProps(dogsList, correctAnswer, shuffledAnswers, allImages, gamePicker));
        })
    }
  }
}
