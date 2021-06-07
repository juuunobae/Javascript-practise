const $table = document.createElement("table"); // table 태그 생성
const $result = document.createElement("div"); // 결과를 보여줄 div 태그 생성

// 승부 확인하는 함수
const checkWinner = (target) => {
  // let rowIndex;
  // let cellIndex;
  // rows.forEach((row, ri) => {
  //   row.forEach((cell, ci) => {
  //     if (cell === target) {
  //       rowIndex = ri;
  //       cellIndex = ci;
  //     }
  //   });
  // });

  const rowIndex = target.parentNode.rowIndex; // 클릭된 tr의 index 변수에 저장
  const cellIndex = target.cellIndex; // 클릭된 td의 index 변수에 저장
  let hasWinner = false; // 먼저 false로 저장 후 승리 하는 조건이 되면 true가 될 변수

  // 가로줄 동일
  // turn = O or X, rows[rowIndex][n].textContent = O or X
  // rowIndex = 현재 클릭된 tr의 index => 1 or 2 or 3
  // rows[rowIndex]는 줄, 한 줄의 textContent가 현재의 turn과 모두 같으면 true
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    // ture가 되면 승부가 난 것이다.
    hasWinner = true;
  }

  // 세로줄 동일
  // turn = O or X, rows[n][cellIndex].textContent = O or X
  // cellIndex = 현재 클릭된 td의 index => 1 or 2 or 3
  // rows[n][cellIndex]는 칸, 각 [n]번째 줄의 [cellIndex]번째 칸들이 현재의 trun과 모두 같으면 true
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
    // ture가 되면 승부가 난 것이다.
    hasWinner = true;
  }

  // 대각선 동일
  if (
    rows[0][0].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][2].textContent === turn
  ) {
    hasWinner = true;
  }

  if (
    rows[0][2].textContent === turn &&
    rows[1][1].textContent === turn &&
    rows[2][0].textContent === turn
  ) {
    hasWinner = true;
  }
  return hasWinner; //  true or false
};

// 승부가 결정 났는지 무승부 인지 확인하는 함수
const checkWinnerAndDraw = (target) => {
  // 승부 확인하는 함수 호출 후 변수에 저장
  // return = true or false
  const hasWinner = checkWinner(target);
  // 승부 확인하는 함수가 true면 조건문 실행
  if (hasWinner) {
    $result.textContent = `${turn}님이 승리`;
    $table.removeEventListener("click", callback); // 승부가 결정나면 eventListener를 지우준다.
    return;
  }

  // .flat() = 2차원 배열을 1차원 배열로 만들어준다.
  // .every() = 모든 값이 참일때만 true, 하나라도 거짓이면 반복을 멈추고 false
  // .some() = 하나라도 참이면 true, 모든 값이 거짓이면 false

  const draw = rows.flat().every((cell) => cell.textContent);
  // 모든 칸에 값이 있으면 true
  // 하나의 칸이라도 비어있으면 false

  // let draw = true;
  // rows.forEach((row) => {
  //   row.forEach((cell) => {
  //     if (!cell.textContent) {
  //       draw = false;
  //     }
  //   });
  // });

  // 승부를 결정짓지 못했고 모든 칸에 값이 다찼으면 실행
  if (draw) {
    $result.textContent = "무승부";
    return;
  }
  turn = turn === "X" ? "O" : "X";
};

let clickable = true; // 클릭이 가능할 때를 알려주는 변수 true = 클릭이 된다.
const callback = (e) => {
  if (!clickable) {
    // clickable이 false여서 클릭이 되지 않는 상태일 때 return을 해줘서 함수를 빠져나간다.
    return;
  }
  // e.target = target은 어떤 엘리먼트가 선택될지 모른다.
  // e.currentTarget = 실제 이벤트를 지정한 엘리먼트
  // e.stopPropagation(); = 이벤트 버블링을 막는다.
  if (e.target.textContent !== "") return; // 현재 클릭한 태그가 비어있지 않다면 return을 해줘서 함수를 빠져나간다.
  e.target.textContent = turn; // 비어있다면 현재 turn의 모양을 태그에 적어준다.

  checkWinnerAndDraw(e.target); // 승부 and 무승부 확인 함수 호출

  // x는 컴퓨터 턴
  if (turn === "X") {
    clickable = false; // 사용자가 칸을 클릭할 수 없게 clickable 변수를 false로 만들어준다.
    // 사용자가 클릭 후 컴퓨터가 바로 입력하지 않게 하는 setTimeout
    setTimeout(() => {
      // .filter = 조건에 맞는 값들만 return하여 새로운 배열을 만든다.
      const emptyCells = rows.flat().filter((v) => !v.textContent); // text가 없는 td태그들만 반환해서 새로운 배열을 만든다.
      const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      // text가 없는 td태그들로 만든 배열에서 랜덤한 수의 인덱스의 값을 변수에 저장한다.
      randomCell.textContent = "X"; // 랜덤으로 뽑은 td태그에 'X'를 적는다.
      checkWinnerAndDraw(randomCell); // 승부 and 무승부 확인 함수 호출
      clickable = true; // 사용자가 클릭할 수 있게 해준다.
    }, 1000);
  }
};

let turn = "O"; // turn의 모양을 담을 변수
const rows = []; // 데이터로 사용할 배열 생성

// 3 X 3 table 만드는 반복문
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement("tr"); // 3개의 tr 태그 생성
  const cells = []; // 2차원 배열의 줄로 사용할 배열 생성
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement("td"); // 3개의 td 태그 생성
    cells.push($td); // i번 째 배열에 칸(td태그) 추가
    $tr.append($td); // i번 째 tr 태그에 td 태그 추가
  }
  rows.push(cells); // 데이터로 사용할 2차원 배열
  $table.append($tr); // table 태그에 tr 태그 추가 = 화면에 보여주기 위한 코드
}

/*
rows = [
        [td, td, td],
        [td, td, td],
        [td, td, td]
       ]
// 배열에 td태그 자체를 넣는다.
// 값이 바뀔 때 따로 안 바꿔 주어도 되고, textContent를 사요하면 된다.
*/

// 이벤트 버블링 = 자식태그에서 이벤트가 발생하면 부모태그에도 이벤트가 전달되는 것
$table.addEventListener("click", callback);
document.body.append($table); // body태그에 table 추가
document.body.append($result); // body태그에 div 추가
