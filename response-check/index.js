const $screen = document.querySelector("#screen");
const $result = document.querySelector("#result");

let startTime; // 타이머 시작시간 저장 변수
let endTime; // 사용자가 클릭한 시간 저장 변수
let records = []; // 사용자의 기록들을 저장하는 베열
let timeOutId; // setTimeout의 id를 저장하는 변수, timeout clear하기 위해 필요

// 스크린을 클릭했을 때 발생하는 이벤트
$screen.addEventListener("click", (e) => {
  if (e.target.classList.contains("waiting")) {
    // 스크린이 파란색일 때
    $screen.classList.replace("waiting", "ready"); // 현재의 클래스이름을 새로운 클래스이름으로 변경, ('현재 클래스', '새로운 클래스')
    $screen.textContent = "초록색이 되면 클릭하세요";
    timeOutId = setTimeout(() => {
      // 빨간 화면에서 초록화면으로 랜덤한 시간후에 바뀌게 하는 setTimeout
      startTime = new Date(); // 초록화면으로 바뀐 시간 저장
      $screen.classList.replace("ready", "now"); // 클래스 변경
      $screen.textContent = "클릭하세요";
    }, Math.floor(Math.random() + 1000) + 2000); // 1초에서 3초사이의 랜덤한 시간
  } else if (e.target.classList.contains("ready")) {
    // 스크린이 빨간색일 때
    // 사용자가 클릭하면 실패, 처음 화면으로 되돌린다.
    clearTimeout(timeOutId); // setTimeout clear
    $screen.classList.replace("ready", "waiting"); // 클래스 변경
    $screen.textContent = "너무 성급하시군요";
  } else if (e.target.classList.contains("now")) {
    // 스크린이 초록색일 때
    endTime = new Date(); // 사용자가 클릭한 시간 저장
    const current = endTime - startTime; // 사용자가 클릭한 시간에서 초록화면으로 바뀐 시간을 빼 클릭하는데 걸린시간을 저장
    records.push(current); // 기록을 저장하는 배열에 클릭한 시간 저장
    const average = records.reduce((a, c) => a + c) / records.length;
    /*
    모든 기록의 평균값을 구해 저장
    Array.reduce(([앞의 값], [뒤의 값]) => {})
    */
    $result.textContent = `현재 ${current / 1000}s, 평균 ${average / 1000}s`;
    const topFive = records.sort((p, c) => p - c).slice(0, 5); // 기록 저장하는 배열에서 기록이 좋은 순서대로 5개의 값만 새로 저장
    topFive.forEach((top, i) => {
      // 배열을 반복해 새로운 html elements를 생성한 후 값을 보여준다.
      $result.append(document.createElement("br"), `${i + 1}위: ${top}ms`);
    });

    // 시간저장하는 변수 초기화
    startTime = null;
    endTime = null;

    $screen.classList.replace("now", "waiting"); // 클래스 변경
    $screen.textContent = "초록색이 되면 클릭하세요";
  }
});
