// unordered list for guessed letters
const guessedLettersList = document.querySelector(".guessed-letters");
// guess button
const button = document.querySelector(".guess");
// text input for player to guess letters
const letter = document.querySelector(".letter");
// empty paragraph for word in progress
const wordInProgress = document.querySelector(".word-in-progress");
// empty paragraph for remaining guesses
const remainingGuesses = document.querySelector(".remaining");
// span with remaining guesses number
const numOfGuesses = document.querySelector("span");
// empty paragraph for message
const message = document.querySelector(".message");
// hidden button
const hiddenButton = document.querySelector(".hide");

const word = "magnolia";

// function to add placeholders for each letter
const addPlaceholders = function(word){
  const placeholderLetters = [];
  for (let letter of word) {
    placeholderLetters.push("●");
  }
    wordInProgress.innerText = placeholderLetters.join("");
};

// button click event
button.addEventListener("click", function(e){
  e.preventDefult();
  const input = letter.value;
  letter.value = "";
});

addPlaceholders(word);
