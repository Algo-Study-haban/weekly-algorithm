// https://www.acmicpc.net/problem/16967

// 입력 처리
const file = "/dev/stdin";

let input = require("fs").readFileSync(file).toString().trim().split("\n");
const [A, B, X, Y] = input
  .shift()
  .split(" ")
  .map((e) => parseInt(e));
// 이차배열 input정리
const arrB = input.map((row) => row.split(" ").map((col) => Number(col)));
const arrA = Array.from({ length: A }, () =>
  Array.from({ length: B }, () => 0)
);

// 겹치지않는 왼쪽 위 부분
for (let i = 0; i < X; i++) {
  for (let j = 0; j < B; j++) {
    arrA[i][j] = arrB[i][j];
  }
}
// 안 겹치는 곳 왼쪽
for (let i = X; i < A; i++) {
  for (let j = 0; j < Y; j++) {
    arrA[i][j] = arrB[i][j];
  }
}
//겹치는 부분
for (let i = X; i < A; i++) {
  for (let j = Y; j < B; j++) {
    arrA[i][j] = arrB[i][j] - arrA[i - X][j - Y];
  }
}

arrA.forEach((row) => console.log(row.join(" ")));
