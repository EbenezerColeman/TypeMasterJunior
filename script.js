// Word banks for each difficulty level
const easyWords = ["cat", "sun", "map", "box", "dog"];
const mediumWords = [
  "keyboard", "computer", "student", "typing", "accuracy",
  "school", "junior", "lesson", "practice", "learning"
];
const hardWords = ["technology", "development", "intelligence", "application", "programming"];

let currentWord = "";
let score = 0;
let totalTyped = 0;
let correctTyped = 0;
let timeLeft = 60;
let timer;
let selectedLevel = "medium";

const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const accuracyDisplay = document.getElementById("accuracy");
const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');

function initGame() {
  selectedLevel = document.getElementById("level").value;
  document.getElementById("start-screen").style.display = "none";
  document.querySelector(".container").style.display = "block";
  startGame();
}

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
  let wordList = mediumWords;

  if (selectedLevel === "easy") {
    wordList = easyWords;
  } else if (selectedLevel === "hard") {
    wordList = hardWords;
  }

  const randomIndex = Math.floor(Math.random() * wordList.length);
  currentWord = wordList[randomIndex];
  wordDisplay.textContent = currentWord;
  wordInput.value = "";
}

function checkInput() {
  const typedWord = wordInput.value.trim();

  if (typedWord === currentWord) {
    score++;
    correctTyped++;
    scoreDisplay.textContent = score;
    correctSound.play();
    generateWord();
  } else {
    if (typedWord.length >= currentWord.length) {
      wrongSound.play();
    }
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
