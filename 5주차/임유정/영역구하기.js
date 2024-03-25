// https://www.acmicpc.net/problem/2583

// 입력 처리
// const file = "/dev/stdin";
const file = "test.txt";

let input = require("fs").readFileSync(file).toString().trim().split("\n");
const [row, col, rectCount] = input
  .shift()
  .split(" ")
  .map((e) => parseInt(e));

// 이차배열
const board = Array.from({ length: row }, () =>
  Array.from({ length: col }, () => 0)
);

input.forEach((e) => {
  const [leftX, leftY, rightX, rightY] = e.split(" ").map((e) => parseInt(e));
  for (let r = leftY; r < rightY; r++) {
    for (let c = leftX; c < rightX; c++) {
      if (board[r][c] === 0) {
        board[r][c] = 1;
      }
    }
  }
});
board.reverse();

const area = [];
for (let r = 0; r < row; r++) {
  for (let c = 0; c < col; c++) {
    if (board[r][c] === 0) {
      board[r][c] = 1;
      area.push(findArea(r, c));
    }
  }
}
area.sort((a, b) => a - b);
console.log(area.length);
console.log(area.join(" "));

function findArea(r, c) {
  const queue = [{ r, c }];
  let area = 1;
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  while (queue.length) {
    const { r: currR, c: currC } = queue.shift();

    for (let i = 0; i < 4; i++) {
      const nextR = currR + dr[i];
      const nextC = currC + dc[i];

      if (
        nextR >= 0 &&
        nextR < row &&
        nextC >= 0 &&
        nextC < col &&
        board[nextR][nextC] === 0
      ) {
        board[nextR][nextC] = 1;
        area++;
        queue.push({ r: nextR, c: nextC });
      }
    }
  }
  return area;
}
