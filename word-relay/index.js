const $input = document.querySelector("input");
const $btn = document.querySelector("button");
const $word = document.querySelector("#word");
const $order = document.querySelector("#order");

// 프롬프트로 몇 명이 참가하는 지 묻고 입력받아 number에 저장한다.
const number = parseInt(prompt("몇 명이 참가하나요?"), 10);
// 사용자가 입력한 값을 alert 창으로 보여준다.
alert(number);
// 입력한 값이 맞는지 확인 받는다.
const yesOrNo = confirm("맞나요?");

// 제시어를 저장할 변수
let word;
// 새로 입력한 단어
let newWord;

const onClickButton = () => {
  // 제시어가 비어있거나 제시어의 끝 글자와 새로 입력한 단어의 첫 글자와 같으면
  if (!word || word[word.length - 1] === newWord[0]) {
    // 비어있다.
    word = newWord; // 입력한 단어가 제시어가 된다.
    $word.textContent = word; // 입력받은 제시어를 화면에 보여준다.
    const order = Number($order.textContent); // 현재 순서 받아오기
    if (order + 1 > number) {
      // 현재 순서에서 1 더한 값이 참가자 보다 많으면
      $order.textContent = 1; // 현재 순서를 1로 바꿔준다.
    } else {
      // 현재 순서에서 1 더한 값이 참가자 보다 많지 않으면
      $order.textContent = order + 1; // 현재 순서에 1을 더해준다.
    }
    $input.value = ""; // 입력창 비워주기
    $input.focus(); // input에 커서두기
  } else {
    // 올바르지 않으면
    alert("올바르지 않은 단어입니다.");
    $input.value = ""; // 입력창 비워주기
    $input.focus(); // input에 커서두기
  }
};

const onInput = (e) => {
  // 인풋에서 입력받은 새로운 단어 저장
  newWord = e.target.value;
};

$input.addEventListener("input", onInput);
$btn.addEventListener("click", onClickButton);
