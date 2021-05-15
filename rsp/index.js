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

let coord = 0;
setInterval(() => {
  if (coord === rspX.scissors) {
    coord = rspX.rock;
    $computer.style.background = `url(${IMG_URL}) ${rspX.rock} 0`;
    $computer.style.backgroundSize = "auto 200px";
  } else if (coord === rspX.rock) {
    coord = rspX.paper;
    $computer.style.background = `url(${IMG_URL}) ${rspX.paper} 0`;
    $computer.style.backgroundSize = "auto 200px";
  } else {
    coord = rspX.scissors;
    $computer.style.background = `url(${IMG_URL}) ${rspX.scissors} 0`;
    $computer.style.backgroundSize = "auto 200px";
  }
}, 50);
