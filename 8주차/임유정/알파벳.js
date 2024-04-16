// https://www.acmicpc.net/problem/1987
// 입력 처리
const file = "/dev/stdin";
// const file = "test.txt";
// dfs +
let input = require("fs").readFileSync(file).toString().trim().split("\n");
const [maxR, maxC] = input
  .shift()
  .split(" ")
  .map((e) => parseInt(e));

const board = input.map((row) => row.split(""));
const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];
let answer = -Infinity;
const visited = Array.from({ length: 26 }, () => false);

// dfs
function dfs(total, currR, currC) {
  answer = Math.max(answer, total);
  const movable = [];
  // 이동할 수 있는 주변 찾기
  for (let i = 0; i < 4; i++) {
    const nextR = currR + dr[i];
    const nextC = currC + dc[i];

    if (
      nextR >= 0 &&
      nextR < maxR &&
      nextC >= 0 &&
      nextC < maxC &&
      !visited[board[nextR][nextC].charCodeAt() - 65]
    ) {
      movable.push([nextR, nextC]);
    }
  }
  // 더이상 이동 못하면 최대이동거리 갱신
  if (!movable.length) {
    answer = Math.max(answer, total);
    return;
  }
  // 이동할 수 있는 곳 이동
  for (const [r, c] of movable) {
    visited[board[r][c].charCodeAt() - 65] = true;
    dfs(total + 1, r, c);
    visited[board[r][c].charCodeAt() - 65] = false;
  }
}

visited[board[0][0].charCodeAt() - 65] = true;
dfs(1, 0, 0);
console.log(answer);
