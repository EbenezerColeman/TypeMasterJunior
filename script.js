const words = [
    "keyboard", "computer", "student", "typing", "accuracy",
    "school", "junior", "lesson", "practice", "learning"
];

let currentWord = "";
let score = 0;
let totalTyped = 0;
let correctTyped = 0;
let timeLeft = 60;
let timer;
const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const accuracyDisplay = document.getElementById("accuracy");
const correctSound = new Audio('sounds/correct.mp3');
const wrongSound = new Audio('sounds/wrong.mp3');


function startGame() {
    score = 0;
    totalTyped = 0;
    correctTyped = 0;
    timeLeft = 60;
    wordInput.disabled = false;
    wordInput.value = "";
    wordInput.focus();
    scoreDisplay.textContent = 0;
    accuracyDisplay.textContent = "0%";
    timeDisplay.textContent = 60;

    generateWord();

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);

    wordInput.addEventListener("input", checkInput);
}

function generateWord() {
    const randomIndex = Math.floor(Math.random() * words.length);
    currentWord = words[randomIndex];
    wordDisplay.textContent = currentWord;
    wordInput.value = "";
}

function checkInput() {
  const typedWord = wordInput.value.trim();

  if (typedWord === currentWord) {
    score++;
    correctTyped++;
    correctSound.play();     // ✅ play correct sound
    scoreDisplay.textContent = score;
    wordInput.value = "";
    generateWord();          // load new word
  } else if (
    typedWord.length === currentWord.length &&
    typedWord !== currentWord
  ) {
    wrongSound.play();       // ❌ play wrong sound if full word is incorrect
  }

  totalTyped++;
  updateAccuracy();
}



function updateAccuracy() {
    const accuracy = totalTyped > 0 ? (correctTyped / totalTyped) * 100 : 0;
    accuracyDisplay.textContent = accuracy.toFixed(0) + "%";
}

function updateTimer() {
    timeLeft--;
    timeDisplay.textContent = timeLeft;

    if (timeLeft <= 0) {
        clearInterval(timer);
        wordDisplay.textContent = "Time's up!";
        wordInput.disabled = true;
    }
}
