export function getCorrectAnswerFromFetchedUrl(name) {
  name = decodeURIComponent(name);
  name = name.substring(30);
  name = name.substring(0, name.lastIndexOf("/"));
  const newName = name.includes("-") ? name.substring(0, name.lastIndexOf("-")) : name
  return newName;
} 

export function getCorrectAnswerFromDogList (dogList){
  const correctName = dogList[Math.floor(Math.random()*dogList.length)];
  return correctName
}

export function addWrongAnswersWithoutRepeat(dogsList, correctAnswer){
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

export function shuffleAnswers(array){
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

export function getRandomImageFromImageList(images){
  const randomNumber = Math.floor(Math.random() * images.length);
  return images[randomNumber];
}