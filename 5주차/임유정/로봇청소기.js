// https://www.acmicpc.net/problem/14503

// 입력 처리
// const file = "/dev/stdin";
const file = "test.txt";
let input = require("fs").readFileSync(file).toString().trim().split("\n");
const [w, h] = input
  .shift()
  .split(" ")
  .map((e) => parseInt(e));
const [startR, startC, startDir] = input
  .shift()
  .split(" ")
  .map((e) => parseInt(e));
const board = input.map((row) => row.split(" ").map((c) => parseInt(c)));
let answer = 1;

// dfs
function dfs(r, c, dir) {
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  for (let i = 0; i < 4; i++) {
    const nextR = r + dr[i];
    const nextC = c + dc[i];

    if (
      nextR >= 0 &&
      nextR < h &&
      nextC >= 0 &&
      nextC < w &&
      board[nextR][nextC] === 0
    ) {
      answer++;
      board[nextR][nextC] = 2; // 청소한 곳 표시
    }
  }
}

dfs(startR, startC, startDir);
