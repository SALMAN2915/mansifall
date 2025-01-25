const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const fallingImage = document.getElementById("falling-image");
const scoreBoard = document.getElementById("score-board");
const timerDisplay = document.getElementById("timer");
const restartButton = document.getElementById("restart-button");
const playButton = document.getElementById("play-button");
const leftButton = document.getElementById("left-button");
const rightButton = document.getElementById("right-button");

let playerX = 160; // Initial player position
let imageX = Math.random() * 380; // Random initial falling image X position
let imageY = 0; // Initial image Y position
let score = 0;
let timer = 90; // 1:30 minutes in seconds
let gameInterval;
let timerInterval;

// Move player to the left
function movePlayerLeft() {
  if (playerX > 0) {
    playerX -= 20;
    player.style.left = playerX + "px";
  }
}

// Move player to the right
function movePlayerRight() {
  if (playerX < 320) {
    playerX += 20;
    player.style.left = playerX + "px";
  }
}

// Falling image animation
function updateGame() {
  imageY += 5;

  // Check if the falling image touches the player (blue board)
  if (imageY >= 560 && imageX > playerX && imageX < playerX + 80) {
    score++;
    scoreBoard.textContent = "Score: " + score;

    // Reset image position after scoring
    imageY = 0;
    imageX = Math.random() * 380; // Random X position
  }

  // Reset image position if it reaches the bottom but does not touch the player
  if (imageY > 580) {
    imageY = 0;
    imageX = Math.random() * 380; // Random X position
  }

  fallingImage.style.top = imageY + "px";
  fallingImage.style.left = imageX + "px";

  requestAnimationFrame(updateGame);
}

// Timer function
function updateTimer() {
  if (timer > 0) {
    timer--;
    let minutes = Math.floor(timer / 60);
    let seconds = timer % 60;
    timerDisplay.textContent = `Time: ${minutes < 10 ? "0" : ""}${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  } else {
    endGame();
  }
}

// Start the game
function startGame() {
  score = 0;
  timer = 90; // Reset timer to 1:30
  scoreBoard.textContent = "Score: 0";
  timerDisplay.textContent = "Time: 01:30";
  restartButton.style.display = "none"; // Hide restart button
  playButton.style.display = "none"; // Hide play button

  // Start the game and timer intervals
  gameInterval = requestAnimationFrame(updateGame);
  timerInterval = setInterval(updateTimer, 1000);
}

// End the game
function endGame() {
  clearInterval(timerInterval); // Stop the timer
  cancelAnimationFrame(gameInterval); // Stop the game loop
  restartButton.style.display = "inline-block"; // Show the restart button
  alert("Game Over! Final Score: " + score); // Display final score
}

// Restart the game
function restartGame() {
  startGame();
}

// Show the play button initially
playButton.style.display = "inline-block";
