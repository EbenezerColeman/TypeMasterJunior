// DOM Elements
const wordDisplay = document.getElementById("word-display");
const wordInput = document.getElementById("word-input");
const timeDisplay = document.getElementById("time");
const scoreDisplay = document.getElementById("score");
const accuracyDisplay = document.getElementById("accuracy");
const gameContainer = document.getElementById("gameContainer");
const difficultySelect = document.getElementById("difficulty");
const emojiFeedback = document.getElementById("emojiFeedback");
const finalScoreText = document.getElementById("finalScoreText");
const countdownOverlay = document.getElementById("countdownOverlay");
const countdownText = document.getElementById("countdownText");
const welcomeBox = document.getElementById("welcomeBox");
const endMessageModal = document.getElementById("endMessageModal");
const howToPlayBtn = document.getElementById("howToPlayBtn");

// Sounds
const correctSound = new Audio("sounds/correct.mp3");
const wrongSound = new Audio("sounds/wrong.mp3");

// Confetti Setup
const confettiCanvas = document.getElementById("confettiCanvas");
const ctx = confettiCanvas.getContext("2d");
confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;
const confettiParticles = [];

function createConfettiBurst(x, y) {
  for (let i = 0; i < 30; i++) {
    confettiParticles.push({
      x: x,
      y: y,
      size: Math.random() * 6 + 4,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      velocityX: (Math.random() - 0.5) * 8,
      velocityY: Math.random() * -10,
      gravity: 0.5
    });
  }
}

function updateConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  for (let p of confettiParticles) {
    p.x += p.velocityX;
    p.y += p.velocityY;
    p.velocityY += p.gravity;

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  requestAnimationFrame(updateConfetti);
}
updateConfetti();

// Word Lists
const easyWords = ["cat", "dog", "sun", "red", "book", "pen", "cup", "hat", "ball", "man"];
const mediumWords = ["keyboard", "student", "typing", "school", "lesson", "science", "teacher", "classroom", "learning"];
const hardWords = ["accuracy", "development", "performance", "challenge", "educational", "discipline", "motivation", "improvement", "achievement"];

let currentWords = [];
let currentWord = "";
let score = 0;
let totalTyped = 0;
let correctTyped = 0;
let timeLeft = 60;
let timer;

// Countdown
function startCountdown() {
  let count = 3;
  countdownOverlay.style.display = "flex";
  countdownText.textContent = count;

  const countdownInterval = setInterval(() => {
    count--;
    if (count > 0) {
      countdownText.textContent = count;
    } else if (count === 0) {
      countdownText.textContent = "Go!";
    } else {
      clearInterval(countdownInterval);
      countdownOverlay.style.display = "none";
      startGame();
    }
  }, 1000);
}

// Start Game
function startGame() {
  welcomeBox.style.display = "none";
  gameContainer.style.display = "block";

  const difficulty = difficultySelect.value;
  currentWords = difficulty === "easy" ? easyWords : difficulty === "medium" ? mediumWords : hardWords;

  resetGame();
  generateWord();
  timer = setInterval(updateTimer, 1000);
  wordInput.addEventListener("input", checkInput);
}

// Reset values
function resetGame() {
  score = 0;
  totalTyped = 0;
  correctTyped = 0;
  timeLeft = 60;

  scoreDisplay.textContent = score;
  accuracyDisplay.textContent = "0%";
  timeDisplay.textContent = timeLeft;

  wordInput.disabled = false;
  wordInput.value = "";
  wordInput.focus();
}

// Generate word
function generateWord() {
  const randomIndex = Math.floor(Math.random() * currentWords.length);
  currentWord = currentWords[randomIndex];
  wordDisplay.textContent = currentWord;
  wordInput.value = "";
}

// Check typed input
function checkInput() {
  const typedWord = wordInput.value.trim();
  if (typedWord === currentWord) {
    score++;
    correctTyped++;
    correctSound.play();
    createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2);
    scoreDisplay.textContent = score;
    generateWord();
  } else if (typedWord.length === currentWord.length) {
    wrongSound.play();
  }

  totalTyped++;
  updateAccuracy();
}

// Update accuracy %
function updateAccuracy() {
  const accuracy = totalTyped > 0 ? (correctTyped / totalTyped) * 100 : 0;
  accuracyDisplay.textContent = accuracy.toFixed(0) + "%";
}

// Timer
function updateTimer() {
  timeLeft--;
  timeDisplay.textContent = timeLeft;

  if (timeLeft <= 0) {
    clearInterval(timer);
    wordInput.disabled = true;
    wordDisplay.textContent = "Time's up!";
    showEndMessage();
  }
}

// Restart
function restartGame() {
  endMessageModal.style.display = "none";
  startCountdown();
}

// Show Final Score Modal
function showEndMessage() {
  const accuracy = totalTyped > 0 ? (correctTyped / totalTyped) * 100 : 0;
  finalScoreText.textContent = `You scored ${score} points with ${accuracy.toFixed(0)}% accuracy.`;

  if (accuracy >= 90) emojiFeedback.textContent = "🌟🌟🌟";
  else if (accuracy >= 70) emojiFeedback.textContent = "😊😊";
  else emojiFeedback.textContent = "🙂🥈";

  createConfettiBurst(window.innerWidth / 2, window.innerHeight / 2);
  endMessageModal.style.display = "block";
}

// Restart from modal
function restartGameFromModal() {
  endMessageModal.style.display = "none";
  startCountdown();
}

// Modal controls
function closeModal() {
  document.getElementById("howToModal").style.display = "none";
}
howToPlayBtn.addEventListener("click", () => {
  document.getElementById("howToModal").style.display = "block";
});

// Font size
function adjustFontSize() {
  const fontSize = document.getElementById("fontSizeSelect").value;
  document.body.style.fontSize = fontSize;
}




















