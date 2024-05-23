// https://school.programmers.co.kr/learn/courses/30/lessons/12899

// 1~10 숫자로 조합 x
// 3진수
// 3으로 나눈 나머지가 0이면 몫-1의124숫자 + 나머지
// 0이 아니면 몫의 124숫자 + 나머지

function solution(n) {
  var answer = [];

  function convertNum(num) {
    if (num <= 0) {
      return;
    }
    const division = Math.floor(num / 3);
    const remain = num % 3;

    if (remain === 0) {
      answer.unshift(4);
      convertNum(division - 1);
    } else {
      answer.unshift(remain);
      convertNum(division);
    }
  }

  convertNum(n);
  return answer.join("");
}
