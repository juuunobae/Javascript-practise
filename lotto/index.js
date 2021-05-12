const $result = document.querySelector("#result");
const $bonus = document.querySelector("#bonus");

// 1부터 45까지 배열을 만들어 준다.
const candidate = Array(45) // 길이가 45인 빈 배열을 만들어준다.
  .fill() // 각 요소마다 undefined 값이 채워진다.
  .map((v, i) => i + 1); // 1부터 순서대로 요소를 채워준다.

// 랜덤으로 섞인 값들이 들어갈 배열
const shuffle = [];
// 배열을 랜덤으로 바꿔줄 반복문
while (candidate.length > 0) {
  // 정렬되어 있는 배열을 램덤한 수의 인덱스로 하나 씩 가지고와 새로운 배열을 만드는 것

  // 무작위로 인덱스를 하나 뽑는다.
  const random = Math.floor(Math.random() * candidate.length);
  // 뽐은 인덱스 번째의 요소부터 하나의 요소를 가지고와 새로운 배열을 만들어준다.
  const spliceArray = candidate.splice(random, 1);
  // 하나의 요소가 있는 새로운 배열의 0번 째 요소를 변수에 저장한다.
  const value = spliceArray[0];
  // 새로운 배열에 변수를 push해준다.
  shuffle.push(value);
}

console.log(shuffle);

// 랜덤으로 섞인 배열의 0번째 부터 6번째 전까지의 요소를 .sort메소드로 정렬을 한뒤 새로운 배열을 만들어 준다.
const winBalls = shuffle.slice(0, 6).sort((a, b) => a - b);
// 배열의 6변째 인덱스를 변수에 저장한다.
const bonus = shuffle[6];
console.log(winBalls, bonus);

// 숫자의 크기에 따라 박스 색을 다르게 해주는 함수
const colorrize = (number, $teg) => {
  if (number < 10) {
    $teg.style.backgroundColor = "red";
    $teg.style.color = "white";
  } else if (number < 20) {
    $teg.style.backgroundColor = "orange";
  } else if (number < 30) {
    $teg.style.backgroundColor = "yellow";
  } else if (number < 40) {
    $teg.style.backgroundColor = "blue";
    $teg.style.color = "white";
  } else {
    $teg.style.backgroundColor = "green";
    $teg.style.color = "white";
  }
};

// 코드 중복을 줄이기 위해 만든 함수
// 랜덤으로 뽑은 수를 화면에 보여주는 함수이다.
const drawBall = (number, $parent) => {
  // div 태그를 만들어 $ball 변수에 저장
  const $ball = document.createElement("div");
  // div 태그에 ball 클래스를 부여
  $ball.className = "ball";
  // 색을 칠하는 함수를 호출한다.
  colorrize(number, $ball);
  // ball id를 가진 div 태그에 랜덤으로 뽑은 수를 넣어준다.
  $ball.textContent = number;
  // 결과값을 보여줄 태그에 div 태그를 넣어준다.
  $parent.appendChild($ball);
};

for (let i = 0; i < winBalls.length; i++) {
  setTimeout(() => {
    // 랜덤으로 뽑은 배열의 i번째 요소와, 결과값을 보여줄 html태그를 넣어 함수 호출
    drawBall(winBalls[i], $result);
  }, (i + 1) * 1000); // 1초 씩 늘어나는 타이머
}

setTimeout(() => {
  // 보너스 숫자와 보너스 값을 보여줄 html 태그를 넣어 함수 호출
  drawBall(bonus, $bonus);
}, 7000);
