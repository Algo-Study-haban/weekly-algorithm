// https://www.acmicpc.net/problem/9012

// 입력 처리
const file = "/dev/stdin";
// const file = "test.txt";

let input = require("fs").readFileSync(file).toString().trim().split("\n");
input.shift();
input.forEach((str) => {
  str.replace("/r", "");
  console.log(solution([...str]));
});

function solution(arr) {
  const obj = { "(": 1, ")": -1 };
  let sum = 0;

  while (arr.length) {
    if (sum < 0) {
      return "NO";
    }
    const curr = arr.shift();
    sum += obj[curr];
  }
  if (sum === 0) return "YES";
  return "NO";
}
