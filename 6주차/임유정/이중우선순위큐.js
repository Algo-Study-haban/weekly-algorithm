// https://school.programmers.co.kr/learn/courses/30/lessons/42628

function solution(operations) {
  var answer = [];
  const list = [];
  operations.forEach((o) => {
    const type = o[0];
    const value = Number(o.split(" ")[1]);

    if (type === "I") {
      list.push(value);
      list.sort((a, b) => a - b);
    } else if (type === "D" && list.length) {
      if (value === -1) {
        list.shift();
      } else if (value === 1) {
        list.pop();
      }
    }
  });
  answer = list.length ? [Math.max(...list), Math.min(...list)] : [0, 0];
  return answer;
}
