const btns = document.querySelectorAll(".player-play");
let result = document.querySelector(".result");
let realResult = document.querySelector(".realResult");
const playAgainDiv = document.querySelector(".play-again");
const body = document.querySelector("body");

let gameOver = false;
let userScore = 0;
let compScore = 0;
let created = false;
const gameScore = 5;

function getRandomNumber() {
  return Math.floor(Math.random() * 3);
}

function computerPlay() {
  let randomNumber = getRandomNumber();
  return randomNumber === 0
    ? "rock"
    : randomNumber === 2
    ? "paper"
    : "scissors";
}

function win(player, computer) {
  userScore++;
  return `You win! ${player} beats ${computer}`;
}

function lose(player, computer) {
  compScore++;
  return `You Lose! ${computer} beats ${player}`;
}

function draw(player) {
  return `Draw! You and computer played ${player}!`;
}

function playRound(playerSelection, computerSelection) {
  playerSelection = this.id;
  computerSelection = computerPlay();
  console.log(playerSelection, computerSelection);
  // draw
  if (playerSelection === computerSelection) {
    result.textContent = draw(playerSelection);
  }
  // player: rock
  else if (playerSelection === "rock") {
    result.textContent =
      computerSelection === "scissors"
        ? win(playerSelection, computerSelection)
        : lose(playerSelection, computerSelection);
  }
  // player: paper
  else if (playerSelection === "paper") {
    result.textContent =
      computerSelection === "rock"
        ? win(playerSelection, computerSelection)
        : lose(playerSelection, computerSelection);
  }
  // player: scissors
  else if (playerSelection === "scissors") {
    result.textContent =
      computerSelection === "paper"
        ? win(playerSelection, computerSelection)
        : lose(playerSelection, computerSelection);
  }

  // Check who's the winner
  if (userScore === gameScore || compScore === gameScore) {
    gameOver = true;
    btns.forEach((btn) => {
      btn.disabled = true;
    });
    showResult();
    playAgain();
  }
}

function playOneMoreTime() {
  userScore = 0;
  compScore = 0;
  playAgainDiv.classList.add("hidden");
  realResult.classList.add("hidden");
  gameOver = false;
  btns.forEach((btn) => {
    btn.disabled = false;
  });
}

function exit() {
  body.classList.add("hidden");
}

function playAgain() {
  // Ask if player wants to play again
  const para = document.createElement("p");
  const yesBtn = document.createElement("button");
  const noBtn = document.createElement("button");
  para.textContent = "Do you want to play again?";
  yesBtn.textContent = "Yes";
  noBtn.textContent = "No";
  if(!created){
    playAgainDiv.appendChild(para);
    playAgainDiv.appendChild(yesBtn);
    playAgainDiv.appendChild(noBtn);
    created = true;
  }
  // yes
  yesBtn.addEventListener("click", playOneMoreTime);
  // no
  noBtn.addEventListener("click", exit);
}

function showResult() {
  playAgainDiv.classList.remove("hidden");
  realResult.classList.remove("hidden");
  if (gameOver) {
    realResult.textContent =
      userScore === gameScore
        ? "Congratulation! You won the game! "
        : "You lost to computer!";
  }
  return;
}

function init() {
  btns.forEach((btn) => btn.addEventListener("click", playRound));
}

init();
