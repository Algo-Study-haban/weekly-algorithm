// https://www.acmicpc.net/problem/2023

// 입력 처리
const file = "/dev/stdin";
// const file = "test.txt";

let input = require("fs").readFileSync(file).toString().trim().split("\n");
const digitCount = parseInt(input);
const prime = ["2", "3", "5", "7"];

for (const p of prime) {
  dfs(p);
}

function dfs(str) {
  if (str.length === digitCount) {
    if (isPrime(parseInt(str))) {
      console.log(parseInt(str));
      return;
    }
  }
  for (let i = 0; i <= 9; i++) {
    const next = str + i;
    if (isPrime(next)) {
      dfs(next);
    }
  }
}

function isPrime(n) {
  if (n === 1) return false;
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      return false;
    }
  }
  return true;
}
