// unordered list for guessed letters
const guessedLettersList = document.querySelector(".guessed-letters");
// guess button
const guessButton = document.querySelector(".guess");
// text input for player to guess letters
const letter = document.querySelector(".letter");
// empty paragraph for word in progress
const wordInProgress = document.querySelector(".word-in-progress");
// empty paragraph for remaining guesses
const remainingGuesses = document.querySelector(".remaining");
// span with remaining guesses number
const numOfGuesses = document.querySelector(".remaining span");
// empty paragraph for message
const message = document.querySelector(".message");
// hidden button
const playAgainButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetters = [];

// function to add placeholders for each letter
const addPlaceholders = function(word){
  const placeholderLetters = [];
  for (let letter of word) {
    console.log(letter);
    placeholderLetters.push("●");
  }
    wordInProgress.innerText = placeholderLetters.join("");
};

addPlaceholders(word);

// button click event
guessButton.addEventListener("click", function (e) {
  e.preventDefault();
  message.innerText = "";
  const guess = letter.value;
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
    console.log(guessedLetters);
  }
};
