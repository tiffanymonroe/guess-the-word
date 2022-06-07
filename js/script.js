// unordered list for guessed letters
const guessedLettersList = document.querySelector(".guessed-letters");
// guess button
const guessButton = document.querySelector(".guess");
// text input for player to guess letters
const letterInput = document.querySelector(".letter");
// empty paragraph for word in progress
const wordInProgress = document.querySelector(".word-in-progress");
// empty paragraph for remaining guesses
const remainingGuessesParagraph = document.querySelector(".remaining");
// span with remaining guesses number
const numOfGuesses = document.querySelector(".remaining span");
// empty paragraph for message
const message = document.querySelector(".message");
// hidden button
const playAgainButton = document.querySelector(".play-again");

let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function (){
  const request = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
  const words = await request.text();
  const wordArray = words.split("\n");
  // console.log(wordArray);
  const randomIndex = Math.floor(Math.random() * wordArray.length);
  word = wordArray[randomIndex].trim();
  addPlaceholders(word);
}

// fire off the game
getWord();

// function to add placeholders for each letter
const addPlaceholders = function(word){
  const placeholderLetters = [];
  for (const letter of word) {
    // console.log(letter);
    placeholderLetters.push("●");
  }
    wordInProgress.innerText = placeholderLetters.join("");
};

// button click event
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const guess = letterInput.value;
  // validate input button event handler
  const goodGuess = validateInput(guess);
  if (goodGuess){
    makeGuess(guess);
  }
});

// validate input
const validateInput = function (input) {
  const acceptedLetter = /[a-zA-Z]/;
  // check input value
  if (input.length === 0){
    message.innerText = "Please enter your guess."
  } else if (input.length > 1){
    message.innerText = "Please only enter one letter at a time."
  } else if (!input.match(acceptedLetter)){
    message.innerText = "Please enter a letter from A to Z."
  } else {
    return input;
  }
};

//  capture input
const makeGuess = function (guess) {
  guess = guess.toUpperCase();
  if ( guessedLetters.includes(guess) ){
    message.innerText = `Oops! You've already guessed ${guess}. Please try again.`;
  } else {
    guessedLetters.push(guess);
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
    countRemainingGuesses(guess);
  }
};

// show guessed letters
const showGuessedLetters = function () {
  // clear list
  guessedLettersList.innerHTML = "";
  for (const letter of guessedLetters){
    // console.log(guessedLetters);
    // console.log(letter);
    const li = document.createElement("li");
    li.innerText = letter;
    guessedLettersList.append(li);
  }
};

// update word in progress
const updateWordInProgress = function (guessedLetters) {
  const wordUpper = word.toUpperCase();
  const wordArray = wordUpper.split("");
  // new array for updated characters
  const answer = [];
  for (let letter of wordArray){
    // check to see if answer includes new guess
    if (guessedLetters.includes(letter)){
      // if yes, push to new answer array
      answer.push(letter.toUpperCase());
      // if no, keep dot by pushing dot to new array
    } else {
      answer.push("●");
    }
  }
  // empty paragraph where word appears
  wordInProgress.innerText = answer.join("");
  checkForWin();
};

// check if player won
const checkForWin = function () {
  if (word.toUpperCase() === wordInProgress.innerText) {
    message.classList.add("win");
    message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;

    startOver();
  }
};

const countRemainingGuesses = function (guess) {
  const upperCaseWord = word.toUpperCase();

  if (!upperCaseWord.includes(guess) ) {
    message.innerText = `Sorry, there is no ${guess}.`
    remainingGuesses -= 1;
  } else {
    message.innerText = `Nice work! ${guess} is in the word.`
  }

  if (remainingGuesses === 0){
    remainingGuessesParagraph.innerHTML = `Sorry, you're out of guesses. The word is <span class="highlight">${word.toUpperCase()}</span>.`;
    playAgainButton.classList.remove("hide");
    guessButton.classList.add("hide");
    letter.value = "";
  } else if (remainingGuesses === 1){
    numOfGuesses.innerText = "1 guess";
  } else {
    numOfGuesses.innerText = `${remainingGuesses} guesses`;
  }
};

const startOver = function () {
  guessButton.classList.add("hide");
  remainingGuessesParagraph.classList.add("hide");
  guessedLettersList.classList.add("hide");
  playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
  // reset values
  message.classList.remove("win");
  message.innerText = "";
  guessedLettersList.innerText = "";
  remainingGuesses = 8;
  guessedLetters = [];
  remainingGuessesParagraph.innerHTML = `You have <span>${remainingGuesses} guesses</span> remaining.`
  letter.value = "";

  getWord();

  // show the right UI elements
  guessButton.classList.remove("hide");
  remainingGuessesParagraph.classList.remove("hide");
  guessedLettersList.classList.remove("hide");
  playAgainButton.classList.add("hide");
});
