const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");

let startTime;
let endTime;
let records = [];
let timeOutId;
$screen.addEventListener("click", (e) => {
  if (e.target.classList.contains("waiting")) {
    $screen.classList.replace("waiting", "ready");
    $screen.textContent = "초록색이 되면 클릭하세요";
    timeOutId = setTimeout(() => {
      startTime = new Date();
      $screen.classList.replace("ready", "now");
      $screen.textContent = "클릭하세요";
    }, Math.floor(Math.random() + 1000) + 2000);
  } else if (e.target.classList.contains("ready")) {
    clearTimeout(timeOutId);
    $screen.classList.replace("ready", "waiting");
    $screen.textContent = "너무 성급하시군요";
  } else if (e.target.classList.contains("now")) {
    endTime = new Date();
    const current = endTime - startTime;
    records.push(current);
    const average = records.reduce((a, c) => a + c) / records.length;
    $result.textContent = `현재 ${current / 1000}s, 평균 ${average / 1000}s`;
    startTime = null;
    endTime = null;
    $screen.classList.replace("now", "waiting");
    $screen.textContent = "초록색이 되면 클릭하세요";
  }
});
