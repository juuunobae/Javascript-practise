const $form = document.querySelector("#form");
const $input = document.querySelector("#input");
const $logs = document.querySelector("#logs");

// 1부터 9까지의 숫자를 numbers 배열에 담는다.
const numbers = [];
// n이 0부터 8까지 늘어날 동안 반복되는 반복문
for (let n = 0; n < 9; n += 1) {
  numbers.push(n + 1); // 1부터 9까지를 배열에 담기 위해 n에 + 1을 해주어 배열에 push해준다.
}

// numbers 배열에서 랜덤하게 숫자를 뽑아 배열에 담는다.
const answer = [];
// n이 0부터 3까지 늘어날 동안 반복되는 반복문
for (let n = 0; n <= 3; n += 1) {
  // 0부터 numbers배열의 길이 만큼의 숫자 중에 랜덤한 숫자하나를 뽑아 index 변수에 저장한다.
  const index = Math.floor(Math.random() * numbers.length);
  // numbers배열의 요소 중 하나를 랜덤으로 뽑은 수를 담은 index변수를 이용해 불러와 answer배열에 담는다.
  answer.push(numbers[index]);
  // 중복을 없애기 위해 answer에 담은 numbers배열의 요소를 삭제해준다.
  numbers.splice(index, 1);
}

console.log(answer);

const tries = [];
function checkInput(input) {
  if (input.length !== 4) {
    // 사용자에게 입력받은 숫자가 4개가 아닐 경우
    return alert("4자리 숫자를 입력해주세요");
  }
  if (new Set(input).size !== 4) {
    // 사용자에게 입력받은 4개의 숫자 중에 중복되는 숫자가 있을 경우
    // new Set(값)은 값에 중복된 요소가 있으면 중복을 제거해주는 키워드이다.
    // 중복이 있으면 제거한 후에 size(== length)가 4보다 짧으면 if문을 실행한다.
    return alert("중복되지 않게 입력해 주세요");
  }
  if (tries.includes(input)) {
    // 사용자가 전에 입력했었던 값과 동일한 값을 다시 입력했을 경우
    // 사용자가 입력했었던 값이 저장되어 있는 tries배열에 현재 입력한 값과 동일한 값이 있는지 확인 후 있으면
    // if문을 실행핟다.
    return alert("이미 시도한 값입니다.");
  }
  return true;
}

// 코드 중복을 줄이기 위해 패배했을 때 화면에 보여주는 코드를 함수로 만든다.
function defeated() {
  const message = document.createTextNode(`패배 정답은 ${answer.join("")}`);
  $logs.appendChild(message);
}

let out = 0;
$form.addEventListener("submit", (e) => {
  // form 이벤트가 발생했을 때의 기본동작을 취소해준다.
  e.preventDefault();
  // 변수에 사용자에게 입력받은 숫자를 담아준다.
  const value = input.value;
  // 다음 입력을 할 때 편리를 위해 input창을 비워준다.
  $input.value = "";

  // 함수가 alert를 리턴하면 undefined가 되어 if 문에서는 false가 된다.
  if (!checkInput(value)) {
    // 사용자가 입력한 값이 정상적이 아닐경우 함수를 빠져나간다.
    return;
  }

  // 사용자가 입력한 값과 랜덤으로 뽑은 값이 같을 경우
  if (answer.join("") === value) {
    // .join 메서드로 배열을 string으로 만들어준 다음 값을 비교한다.
    $logs.textContent = "홈런";
    return;
  }

  // 사용자가 값을 입력한 횟수가 10번이 되었을 경우
  if (tries.length >= 9) {
    // 실패 메시지를 화면에 보여준다.
    defeated();
    return;
  }

  // 스트라이크 횟수를 저장하는 변수
  let strike = 0;
  // 볼 횟수를 저장하는 변수
  let ball = 0;

  // 랜덤값이 저장된 배열의 요소를 하나 씩 사용자가 입력한 값과 같은 수가 있는 지 확인
  for (let i = 0; i < answer.length; i++) {
    // 랜덤값이 저장된 배열의 i번 째 요소가 사용자가 입력한 값에 있는 경우 그 값의 인덱스를, 없으면 -1을 index에 저장한다.
    const index = value.indexOf(answer[i]);
    // 일치하는 수가 있을 경우
    if (index > -1) {
      if (index === i) {
        // 일치하는 수의 인덱스와 i번 째 자릿수와 같은 경우
        strike += 1; // 스트라이크에 1을 더해준다.
      } else {
        // 일치하는 수가 있지만 i번 째 자릿수와 다른 경우
        ball += 1; // 볼에 1을 더해준다.
      }
    }
  }

  // 스트라이크, 볼 둘 다 아닐 경우 아웃
  if (strike === 0 && ball === 0) {
    out++;
    $logs.append(`${value}: ${out} 아웃`, document.createElement("br"));
  } else {
    // 현재의 결과를 화면에 보여준다.
    $logs.append(
      `${value}: ${strike} 스트라이크 ${ball} 볼`,
      document.createElement("br")
    );
  }

  // 아웃이 세번되면 패배
  if (out === 3) {
    defeated();
    return;
  }
  // 사용자가 입력한 값을 tries 배열에 저장한다.

  tries.push(value);
});
