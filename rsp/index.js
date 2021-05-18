const $computer = document.querySelector("#computer");
const $score = document.querySelector("#score");
const $rock = document.querySelector("#rock");
const $scissors = document.querySelector("#scissors");
const $paper = document.querySelector("#paper");
const IMG_URL = "./rsp.png";

const rspX = {
  scissors: "0",
  rock: "-220px",
  paper: "-440px",
};

$computer.style.background = `url(${IMG_URL}) 0 0`;
$computer.style.backgroundSize = "auto 200px";

let computerChoice = "scissors";
const changeComputerHand = () => {
  if (computerChoice === "scissors") {
    computerChoice = "rock";
  } else if (computerChoice === "rock") {
    computerChoice = "paper";
  } else {
    computerChoice = "scissors";
  }
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
  $computer.style.backgroundSize = "auto 200px";
};

let intervalId = setInterval(changeComputerHand, 50);

const clickButton = () => {
  clearInterval(intervalId);

  setTimeout(() => {
    clearInterval(intervalId);
    $rock.removeEventListener("click", clickButton);
    $scissors.removeEventListener("click", clickButton);
    $paper.removeEventListener("click", clickButton);
    intervalId = setInterval(changeComputerHand, 50);
  }, 1000);
};

$rock.addEventListener("click", clickButton);
$scissors.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);
