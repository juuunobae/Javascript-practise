const $table = document.createElement("table");
const $result = document.createElement("div");

const checkWinner = (target) => {
  let rowIndex;
  let cellIndex;
  // const rowIndex =  target.parentNode.rowIndex;
  // const cellIndex = target.cellIndex;
  rows.forEach((row, ri) => {
    row.forEach((cell, ci) => {
      if (cell === target) {
        rowIndex = ri;
        cellIndex = ci;
      }
    });
  });
  let hasWinner = false;

  // 가로줄 동일
  if (
    rows[rowIndex][0].textContent === turn &&
    rows[rowIndex][1].textContent === turn &&
    rows[rowIndex][2].textContent === turn
  ) {
    hasWinner = true;
  }

  // 세로줄 동일
  if (
    rows[0][cellIndex].textContent === turn &&
    rows[1][cellIndex].textContent === turn &&
    rows[2][cellIndex].textContent === turn
  ) {
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
  return hasWinner;
};

const callback = (e) => {
  // e.target = target은 어떤 엘리먼트가 선택될지 모른다.
  // e.currentTarget = 실제 이벤트를 지정한 엘리먼트
  // e.stopPropagation(); = 이벤트 버블링을 막는다.
  if (e.target.textContent !== "") return;
  e.target.textContent = turn;
  if (checkWinner(e.target)) {
    $result.textContent = `${turn}님이 승리`;
    $table.removeEventListener("click", callback);
    return;
  }

  let draw = true;
  rows.forEach((row) => {
    row.forEach((cell) => {
      if (!cell.textContent) {
        draw = false;
      }
    });
  });
  if (draw) {
    $result.textContent = "무승부";
    return;
  }
  turn = turn === "X" ? "O" : "X";
};

let turn = "O";
const rows = [];
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement("tr");
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement("td");
    cells.push($td);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}

// 이벤트 버블링 = 자식태그에서 이벤트가 발생하면 부모태그에도 이벤트가 전달되는 것
$table.addEventListener("click", callback);
document.body.append($table);
document.body.append($result);

const data = [];
for (let i = 0; i < 3; i++) {
  data.push([]);
}
