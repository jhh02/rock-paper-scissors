const body = document.querySelector("body");
const btns = document.querySelectorAll(".player-play");
let result = document.querySelector(".result");
let realResult = document.querySelector(".realResult");
const playAgainDiv = document.querySelector(".play-again");

const gameScore = 5;
let userScore = 0;
let compScore = 0;
let created = false;
let gameOver = false;

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

function checkRound(playerSelection, computerSelection) {
  if (playerSelection !== computerSelection) {
    if (playerSelection === "rock") {
      return (result.textContent =
        computerSelection === "scissors"
          ? win(playerSelection, computerSelection)
          : lose(playerSelection, computerSelection));
    } else if (playerSelection === "paper") {
      return (result.textContent =
        computerSelection === "rock"
          ? win(playerSelection, computerSelection)
          : lose(playerSelection, computerSelection));
    } else if (playerSelection === "scissors") {
      return (result.textContent =
        computerSelection === "paper"
          ? win(playerSelection, computerSelection)
          : lose(playerSelection, computerSelection));
    }
  } else {
    return (result.textContent = draw(playerSelection));
  }
}

function playRound(e) {
  let playerSelection = this.id;
  let computerSelection = computerPlay();
  checkRound(playerSelection, computerSelection);
  // console.log(e, playerSelection, computerSelection);

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

function reset() {
  userScore = 0;
  compScore = 0;
  gameOver = false;
  btns.forEach((btn) => {
    btn.disabled = false;
  });
  realResult.classList.toggle("hidden");
  playAgainDiv.classList.toggle("hidden");
}

function exit() {
  body.classList.add("hidden");
  // Add some nice image or animation
  // Add a button to ask play again
  // Yes
  // body.classList.remove('hidden')
}

function playAgain() {
  if (!created) {
    const para = document.createElement("p");
    const yesBtn = document.createElement("button");
    const noBtn = document.createElement("button");
    para.textContent = "Do you want to play again?";
    yesBtn.textContent = "Yes";
    noBtn.textContent = "No";
    playAgainDiv.appendChild(para);
    playAgainDiv.appendChild(yesBtn);
    playAgainDiv.appendChild(noBtn);
    yesBtn.addEventListener("click", reset);
    noBtn.addEventListener("click", exit);
    created = true;
  }
  playAgainDiv.classList.toggle("hidden");
}

function showResult() {
  realResult.classList.toggle("hidden");
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
