const easyWords = ["cat", "dog", "sun", "pen", "book", "map", "run"];
const mediumWords = ["typing", "school", "junior", "lesson", "practice", "student", "computer"];
const hardWords = ["accuracy", "keyboard", "education", "technology", "improvement", "evaluation"];

let currentWords = [];
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
const difficultySelect = document.getElementById("difficulty");
const fontSizeSelect = document.getElementById("fontSizeSelect");
const gameContainer = document.getElementById("gameContainer");

const correctSound = new Audio("correct.mp3");
const wrongSound = new Audio("wrong.mp3");

function startGame() {
  document.getElementById("welcomeBox").style.display = "none";
  gameContainer.style.display = "block";

  const difficulty = difficultySelect.value;
  if (difficulty === "easy") currentWords = easyWords;
  else if (difficulty === "medium") currentWords = mediumWords;
  else currentWords = hardWords;

  resetGame();
  generateWord();
  timer = setInterval(updateTimer, 1000);
  wordInput.addEventListener("input", checkInput);
}

function resetGame() {
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
}

function restartGame() {
  clearInterval(timer);
  startGame();
}

function generateWord() {
  const randomIndex = Math.floor(Math.random() * currentWords.length);
  currentWord = currentWords[randomIndex];
  wordDisplay.textContent = currentWord;
  wordInput.value = "";
}

function checkInput() {
  const typedWord = wordInput.value.trim();
  if (typedWord === currentWord) {
    score++;
    correctTyped++;
    correctSound.play();
    createConfettiBurst();
    generateWord();
  } else if (typedWord.length >= currentWord.length) {
    wrongSound.play();
  }
  totalTyped++;
  updateAccuracy();
  scoreDisplay.textContent = score;
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

function adjustFontSize() {
  const size = fontSizeSelect.value;
  document.body.style.fontSize = size;
}

// Modal functions
function openModal() {
  const modal = document.getElementById("howToModal");
  modal.classList.remove("hide");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("howToModal");
  modal.classList.add("hide");
  setTimeout(() => {
    modal.style.display = "none";
    modal.classList.remove("hide");
  }, 400);
}

document.getElementById("howToPlayBtn").addEventListener("click", openModal);

// 🎉 Confetti Animation
const confettiCanvas = document.getElementById('confettiCanvas');
const ctx = confettiCanvas.getContext('2d');
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

let confetti = [];

function createConfettiBurst() {
  const wordDisplayRect = wordDisplay.getBoundingClientRect();
  const centerX = wordDisplayRect.left + wordDisplayRect.width / 2;
  const centerY = wordDisplayRect.top + wordDisplayRect.height / 2;

  for (let i = 0; i < 25; i++) {
    confetti.push({
      x: centerX,
      y: centerY,
      dx: Math.random() * 6 - 3,
      dy: Math.random() * -4 - 2,
      size: Math.random() * 5 + 3,
      color: `hsl(${Math.random() * 360}, 100%, 60%)`,
      alpha: 1
    });
  }
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  confetti.forEach((p, i) => {
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();

    p.x += p.dx;
    p.y += p.dy;
    p.dy += 0.2;
    p.alpha -= 0.01;

    if (p.alpha <= 0) confetti.splice(i, 1);
  });
  ctx.globalAlpha = 1;
  requestAnimationFrame(drawConfetti);
}

drawConfetti();








