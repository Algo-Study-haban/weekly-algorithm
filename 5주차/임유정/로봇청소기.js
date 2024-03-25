// https://www.acmicpc.net/problem/14503
// https://taehoon9393.tistory.com/73

// 입력 처리
const file = "/dev/stdin";
// const file = "test.txt";
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

const dr = [-1, 0, 1, 0];
const dc = [0, 1, 0, -1];

let area = 1;

function dfs(currR, currC, currDir) {
  // 주변 4방향 탐색
  for (let i = 0; i < 4; i++) {
    const nextDir = (currDir + 3) % 4; // 왼쪽으로 회전한 다음 방향
    currDir = nextDir;
    const nextR = currR + dr[nextDir];
    const nextC = currC + dc[nextDir];
    // 범위를 벗어나거나 벽이면 방향전환
    if (
      nextR < 0 ||
      nextR >= w ||
      nextC < 0 ||
      nextC >= h ||
      board[nextR][nextC] === 1
    )
      continue;
    // 청소할 구역이면
    if (
      nextR >= 0 &&
      nextR < w &&
      nextC >= 0 &&
      nextC < h &&
      board[nextR][nextC] === 0
    ) {
      area++;
      board[nextR][nextC] = 2;
      dfs(nextR, nextC, nextDir);
      return;
    }
  }
  // 주변에 청소할 곳이 없으면 후진 확인
  const backDir = (currDir + 2) % 4;
  const backR = currR + dr[backDir];
  const backC = currC + dc[backDir];

  if (board[backR][backC] === 1) {
    return; // 후진해서 벽이면 종료
  } else {
    dfs(backR, backC, currDir); // 벽이 아니면 계속 탐색
  }
}

board[startR][startC] = 2;
dfs(startR, startC, startDir);

console.log(area);
