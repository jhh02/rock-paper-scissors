let score = 0;

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

function playerPlay() {
  let playerPlay = prompt(
    "Choose your play: rock, paper, or scissors"
  ).toLowerCase();
  while (
    playerPlay !== "rock" &&
    playerPlay !== "paper" &&
    playerPlay !== "scissors"
  ) {
    playerPlay = prompt("Enter valid input");
  }
  return playerPlay;
}

function win(player, computer) {
  score++;
  return `You win! ${player} beats ${computer}`;
}

function lose(player, computer) {
  score--;
  return `You Lose! ${computer} beats ${player}`;
}

function draw(player) {
  return `Draw! You and computer played ${player}!`;
}

function playRound(playerSelection, computerSelection) {
  // draw
  if (playerSelection === computerSelection) {
    return draw(playerSelection);
  }
  // player: rock
  else if (playerSelection === "rock") {
    return computerSelection === "scissors"
      ? win(playerSelection, computerSelection)
      : lose(playerSelection, computerSelection);
  }
  // player: paper
  else if (playerSelection === "paper") {
    return computerSelection === "rock"
      ? win(playerSelection, computerSelection)
      : lose(playerSelection, computerSelection);
  }
  // player: scissors
  else if (playerSelection === "scissors") {
    return computerSelection === "paper"
      ? win(playerSelection, computerSelection)
      : lose(playerSelection, computerSelection);
  }
}

function game(player, computer) {
  for (let i = 0; i < 5; i++) {
  let result = playRound(player(), computer());
  console.log(result)
  }
  return score > 0
    ? "Congratulation! You won the game! "
    : score < 0
    ? "You lost to computer!"
    : "You tied.";
}

function init() {
  console.log(game(playerPlay, computerPlay));
}

init();
