// https://www.acmicpc.net/problem/10799

// 입력 처리
const file = "/dev/stdin";
let input = require("fs").readFileSync(file).toString().trim();
let answer = 0;
const stack = [];

for (let i = 0; i < input.length; i++) {
  const curr = input[i];
  const next = input[i + 1];

  if (curr === "(" && next === ")") {
    answer += stack.length;
    i++;
  } else if (curr === "(") {
    stack.push("(");
  } else if (curr === ")") {
    stack.pop();
    answer += 1;
  }
}
console.log(answer);
