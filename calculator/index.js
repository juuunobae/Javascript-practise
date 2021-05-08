// 계산을 위한 값을 저장하기 위한 변수
let numOne = "";
// 연산자를 저장하기 위한 변수
let operator = "";
// 계산을 위한 값을 저장하기 위한 변수
let numTwo = "";

const $operator = document.querySelector("#operator");
const $result = document.querySelector("#result");

// 고차 함수 사용 예시
// const onClickNumber = (number) => {
//   return () => {
//     if (operator) {
//       // 연산자 변수에 연산자가 클릭되어 저장되어 있다.
//       numTwo += number;
//     } else {
//       // 연산자 변수에 연산자가 저장되어 있지 않다.
//       numOne += number;
//     }
//     $result.value += number; // 화면에도 값을 바꿔준다.
//   };
// };

/*
이벤트리스너의 콜백함수는 실행 가능한 함수 형태로 넘겨주는 것이지, 실행시킨 형태를 전달하는 것이 아니기 
때문에 아래와 같이 실행시킨 형태를 넘겨줄 때는 고차함수를 사용해 함수 형태로 리턴을 시켜주어야 문제없이
동작한다.
*/
// const onClickNumber = (number) => () => {
//   // 함수가 함수를 리턴하고 있는 코드, 위의 코드를 줄인 것이다.
//   if (operator) {
//     // 연산자 변수에 연산자가 클릭되어 저장되어 있다.
//     numTwo += number;
//   } else {
//     // 연산자 변수에 연산자가 저장되어 있지 않다.
//     numOne += number;
//   }
//   $result.value += number; // 화면에도 값을 바꿔준다.
// };
// 함수를 리턴하는 함수를 고차함수라고 부른다. ( high order function )

// document.querySelector("#num-0").addEventListener("click", onClickNumber("0"));
// document.querySelector("#num-1").addEventListener("click", onClickNumber("1"));
// document.querySelector("#num-2").addEventListener("click", onClickNumber("2"));
// document.querySelector("#num-3").addEventListener("click", onClickNumber("3"));
// document.querySelector("#num-4").addEventListener("click", onClickNumber("4"));
// document.querySelector("#num-5").addEventListener("click", onClickNumber("5"));
// document.querySelector("#num-6").addEventListener("click", onClickNumber("6"));
// document.querySelector("#num-7").addEventListener("click", onClickNumber("7"));
// document.querySelector("#num-8").addEventListener("click", onClickNumber("8"));
// document.querySelector("#num-9").addEventListener("click", onClickNumber("9"));

// ------------------------------------------------------------------------------------
// 입력받은 연산자에 맞는 계산을 하기 위한 함수
const getOperator = () => {
  switch (
    operator // operator 변수의 값에 따라 계산을 하게 하는 코드.
  ) {
    case "+":
      $result.value = parseInt(numOne) + parseInt(numTwo); // 더하기는 꼭 int로 형변환
      break; // 계산이 끝나면 switch문을 빠져나가게끔 break문을 작성해준다.
    case "-":
      $result.value = parseInt(numOne) - parseInt(numTwo);
      break; // 계산이 끝나면 switch문을 빠져나가게끔 break문을 작성해준다.
    case "*":
      $result.value = parseInt(numOne) * parseInt(numTwo);
      break; // 계산이 끝나면 switch문을 빠져나가게끔 break문을 작성해준다.
    case "/":
      $result.value = parseInt(numTwo) / parseInt(numTwo);
      break; // 계산이 끝나면 switch문을 빠져나가게끔 break문을 작성해준다.
    default:
      break;
  }
};

const onClickNumber = (event) => {
  // 연산자 변수에 연산자가 저장되어 있지 않다.
  if (!operator) {
    numOne += event.target.textContent; // 이벤트 객체를 받아와서 textContent를 첫번 째 피연산자인 numOne변수에 저장
    $result.value += event.target.textContent; // 화면에도 값을 바꿔준다.
    return; // 리턴해준 후 함수를 빠져나간다.
  }

  // numTwo에 값이 없으면 result를 비워준다.
  // 화면에 보이는 numOne 값을 지워주고 numTwo를 보여주기 위해 result를 비워준다.
  if (!numTwo) {
    $result.value = "";
  }

  // numOne, operator 두 변수 모두 값이 있을 때 실행
  numTwo += event.target.textContent; // 이벤트 객체를 받아와서 textContent를 변수에 저장
  $result.value += event.target.textContent; // 화면에도 값을 바꿔준다.
};

const onClickOperator = (op) => () => {
  // 연속 계산을 하기 위한 코드
  if (numTwo) {
    // 연산 함수 호출
    getOperator();
  }
  // 현재 계산 결과값을 numOne에 저장하기
  numOne = $result.value;
  // 다음 계산의 피연산자 저장을 위해 numTwo 비워주기
  numTwo = "";

  if (numOne) {
    // 변수에 값이 있으면
    operator = op; // 변수에 매개변수를 대입시켜준다.
    $operator.value = op; // 화면에도 보여준다.
  } else {
    alert("숫자를 먼저 입력하세요");
  }
};

// 각 숫자 버튼을 클릭했을 때
document.querySelector("#num-0").addEventListener("click", onClickNumber);
document.querySelector("#num-1").addEventListener("click", onClickNumber);
document.querySelector("#num-2").addEventListener("click", onClickNumber);
document.querySelector("#num-3").addEventListener("click", onClickNumber);
document.querySelector("#num-4").addEventListener("click", onClickNumber);
document.querySelector("#num-5").addEventListener("click", onClickNumber);
document.querySelector("#num-6").addEventListener("click", onClickNumber);
document.querySelector("#num-7").addEventListener("click", onClickNumber);
document.querySelector("#num-8").addEventListener("click", onClickNumber);
document.querySelector("#num-9").addEventListener("click", onClickNumber);

// 각 연산자 버튼을 클릭했을 때
document.querySelector("#plus").addEventListener("click", onClickOperator("+"));
document.querySelector("#minus").addEventListener("click", onClickOperator("-"));
document.querySelector("#divide").addEventListener("click", onClickOperator("/"));
document.querySelector("#multiply").addEventListener("click", onClickOperator("*"));

// 계산 버튼을 클릭했을 때
document.querySelector("#calculate").addEventListener("click", () => {
  // numTwo에 값이 있을 때, 즉 numOne, operator, numTwo 모두에 값이 들어있을 때
  if (numTwo) {
    // 모든 변수에 값이 있고 계산이 가능한 상황
    // 연산 함수 호출
    getOperator();

    // 다음 계산을 위해 계산을 마치면 화면에서 operator를 지워준다.
    $operator.value = "";
    // 다음 계산을 위해 결과 값을 numOne 변수에 저장시켜준다.
    numOne = $result.value;
    // 다음 계산의 operator를 저장하기 위해 operator 변수를 비워준다.
    operator = "";
    // 다음 계산의 피연사를 저장하기 위해 numTwo를 비워준다.
    numTwo = "";
  } else {
    alert("숫자를 먼저 입력하세요");
  }
});

// C 버튼을 클릭했을 때
document.querySelector("#clear").addEventListener("click", () => {
  // 모든 변수와 화면을 비워준다.
  numOne = "";
  numTwo = "";
  operator = "";
  $result.value = "";
  $operator.value = "";
});
