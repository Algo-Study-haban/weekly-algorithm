// https://school.programmers.co.kr/learn/courses/30/lessons/42860?language=javascript

// 각 알파벳마다 최소이동 + 알파벳 사이 최소이동
function solution(name) {
  var answer = 0;
  const alphaStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const alphaArr = alphaStr.split("");
  const memory = {};

  for (const c of name) {
    if (memory[c]) {
      answer += memory[c];
      continue;
    }
    const indexOfC = alphaArr.indexOf(c);
    let moveCount;
    // 기준점보다 작음
    if (indexOfC <= 13) {
      moveCount = indexOfC;
    } else {
      moveCount = (indexOfC - 25 - 1) * -1;
    }
    answer += moveCount;
    memory[c] = moveCount;
  }
  console.log(memory, answer);
  return answer;
}
