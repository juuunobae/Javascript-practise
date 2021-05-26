const $computer = document.querySelector("#computer");
const $score = document.querySelector("#score");
const $rock = document.querySelector("#rock");
const $scissors = document.querySelector("#scissors");
const $paper = document.querySelector("#paper");
const IMG_URL = "./rsp.png";

// 이미지에서의 가위, 바위, 보의 각각의 위치를 객체에 저장한다.
const rspX = {
  scissors: "0",
  rock: "-220px",
  paper: "-440px",
};

$computer.style.background = `url(${IMG_URL}) 0 0`;
$computer.style.backgroundSize = "auto 200px";

// 가위, 바위, 보 중에 현재 화면에 보여지는 동작을 저장하는 함수
let computerChoice = "scissors";
// 반복될 함수
const changeComputerHand = () => {
  // 현재 화면에 보여지는 것에 따라 실행될 if문
  if (computerChoice === "scissors") {
    // $computer.style.background = `url(${IMG_URL}) ${rspX['scissors]} 0`;
    // 현재 화면에 보여져야할 동작을 저장한 변수에 바위를 저장한다.
    computerChoice = "rock";
  } else if (computerChoice === "rock") {
    // $computer.style.background = `url(${IMG_URL}) ${rspX['rock]} 0`;
    // 현재 화면에 보여져야할 동작을 저장할 변수에 보를 저장한다.
    computerChoice = "paper";
  } else {
    // $computer.style.background = `url(${IMG_URL}) ${rspX['paper]} 0`;
    // 현재 화면에 보여져야할 동작을 저장할 변수에 가위를 저장한다.
    computerChoice = "scissors";
  }

  // 실제로 보여질 화면을 repX객체의 요소로 바꿔준다.
  // rspX[]를 이용하여 키로 값을 불러오는데 []변수를 키로 사용이 가능하다.
  $computer.style.background = `url(${IMG_URL}) ${rspX[computerChoice]} 0`;
  $computer.style.backgroundSize = "auto 200px";
};

// interval을 지워주기 위해 interval을 변수에 담는다.
let intervalId = setInterval(changeComputerHand, 50);

// 결과를 계산하기 위해 동작들을 숫자로 대입한 객체를 만든다.
const scoreTable = {
  rock: 0,
  scissors: 1,
  paper: -1,
};

// flag 변수 - 참, 거짓에 따라 실행여부를 결정
let clickable = true;
// 점수 저장하는 변수
let score = 0;

// 각 버튼을 눌렀을 때 실행될 이벤트 콜백함수
const clickButton = (event) => {
  // clickable변수가 참일 때 실행
  if (clickable) {
    // 버튼을 누르면 interval을 지워 반복을 멈춘다.
    clearInterval(intervalId);
    // clickable 변수를 false로 변경한다.
    clickable = false;
    // 1초 후에 실행되는 setTimeout

    // 사용자가 선택한 손동작을 저장하는 변수
    const myChoice =
      event.target.textContent === "바위"
        ? "rock"
        : event.target.textContent === "가위"
        ? "scissors"
        : "paper";

    // 사용자가 선택한 동작에 맞는 숫자를 객체에서 가지고 와서 변수에 저장
    const myScore = scoreTable[myChoice];
    // 컴퓨터가 선택한 동작에 맞는 숫자를 객체에서 가지고 와서 변수에 저장
    const computerScore = scoreTable[computerChoice];
    // 사용자가 선택한 동작의 수와 컴퓨터가 선택한 동작의 수를 뺀 값을 저장
    const diff = myScore - computerScore;
    let message;
    // 2, -1은 사용자 승리 조건, includes 메서드를 사용해 diff 값이 배열에 들어있으면 true
    // -2, 1은 사용자 패배 조건
    if ([2, -1].includes(diff)) {
      score += 1;
      message = "승리";
    } else if ([-2, 1].includes(diff)) {
      score -= 1;
      message = "승리";
    } else {
      message = "무승부";
    }
    $score.textContent = `${message} 총 : ${score}점`;
    setTimeout(() => {
      // clickable 변수를 true로 바꿔주어 1초 후에는 if문이 실행될 수 있게 해준다.
      clickable = true;
      // setInterval을 다시 실행해준다.
      intervalId = setInterval(changeComputerHand, 50);
    }, 1000);
  }
};

$rock.addEventListener("click", clickButton);
$scissors.addEventListener("click", clickButton);
$paper.addEventListener("click", clickButton);
