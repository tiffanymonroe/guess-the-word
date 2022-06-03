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
    showGuessedLetters();
    updateWordInProgress(guessedLetters);
  }
};

// show guessed letters
const showGuessedLetters = function () {
  // clear list
  guessedLettersList.innerHTML = "";
  for (const letter of guessedLetters){
    console.log(guessedLetters);
    console.log(letter);
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
  }
};
