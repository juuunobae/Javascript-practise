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

const tries = [];
function checkInput(input) {
  if (input.length !== 4) {
    // 사용자에게 입력받은 숫자가 4개가 아닐 경우
    return alert("4자리 숫자를 입력해주세요");
  }
  if (new set(input).size !== 4) {
    // 사용자에게 입력받은 4개의 숫자 중에 중복되는 숫자가 있을 경우
    // new set(array)은 array에 중복된 값이 있으면 중복을 제거해주는 키워드이다.
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

$form.addEventListener("submit", (e) => {
  // form 이벤트가 발생했을 때의 기본동작을 취소해준다.
  e.preventDefault();
  // 변수에 사용자에게 입력받은 숫자를 담아준다.
  const value = e.target[0].value;
  // 다음 입력을 할 때 편리를 위해 input창을 비워준다.
  $input.value = "";

  // 함수가 alert를 리턴하면 undefined가 되어 if 문에서는 false가 된다.
  if (!checkInput(value)) {
    return;
  }

  if (answer.join("") === value) {
    $logs.textContent = "홈런";
    return;
  }

  if (tries.length >= 0) {
    const message = document.createTextNode(`패배 정답은 ${answer.join("")}`);
    $logs.appendChild(message);
    return;
  }

  let strike = 0;
  let ball = 0;
  for (let i = 0; i < answer.length; i++) {
    const index = value.indexOf(answer[i]);
    if (index > -1) {
      if (index === i) {
        strike += 1;
      } else {
        ball += 1;
      }
    }
  }

  tries.push(value);
});
