// https://www.acmicpc.net/problem/16234

// 입력 처리
// const file = "/dev/stdin";
const file = "test.txt";
// dfs
let input = require("fs").readFileSync(file).toString().trim().split("\n");
const [N, L, R] = input
  .shift()
  .split(" ")
  .map((e) => parseInt(e));

const board = input.map((row) => row.split(" ").map((c) => parseInt(c)));
console.log(board);

let result = 0;
let movable = false;

while (1) {
  makeUnion();
  if (!movable) {
    console.log(result);
    break;
  }
}

function makeUnion() {
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  const isVisited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );

  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      isVisited[r][c] = true;
      // 주변탐색
      for (let i = 0; i < 4; i++) {
        const nextR = r + dr[i];
        const nextC = c + dc[i];

        if (
          nextR >= 0 &&
          nextR < N &&
          nextC >= 0 &&
          nextC < N &&
          !isVisited[nextR][nextC]
        ) {
          const diff = Math.abs(board[r][c] - board[nextR][nextC]);
          if (L <= diff && diff <= R) {
          }
        }
      }
    }
  }
}

function makeUnion() {
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  const isVisited = Array.from({ length: N }, () =>
    Array.from({ length: N }, () => false)
  );

  for (let r = 0; r < N - 1; r++) {
    for (let c = 0; c < N - 1; c++) {
      isVisited[r][c] = true;
      // 주변탐색
      for (let i = 0; i < 4; i++) {
        const nextR = r + dr[i];
        const nextC = c + dc[i];

        if (
          nextR >= 0 &&
          nextR < N &&
          nextC >= 0 &&
          nextC < N &&
          !isVisited[nextR][nextC]
        ) {
          const diff = Math.abs(board[r][c] - board[nextR][nextC]);
        }
      }
    }
  }
}
