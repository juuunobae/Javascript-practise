const $table = document.createElement("table");

const callback = dsfd(e) => {
  if (e.target.textContent) return;
  e.target.textContent = turn;
  if (turn === "O") {
    turn = "X";
  } else if (turn === "X") {
    turn = "O";
  }
};

let turn = "O";
const rows = [];
for (let i = 0; i < 3; i++) {
  const $tr = document.createElement("tr");
  const cells = [];
  for (let j = 0; j < 3; j++) {
    const $td = document.createElement("td");
    cells.push($td);
    $td.addEventListener("click", callback);
    $tr.append($td);
  }
  rows.push(cells);
  $table.append($tr);
}
document.body.append($table);

const data = [];
for (let i = 0; i < 3; i++) {
  data.push([]);
}
