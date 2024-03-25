// https://www.acmicpc.net/problem/14502

// const file = "/dev/stdin";
const file = "test.txt";

// 입력처리
let input = require("fs").readFileSync(file).toString().trim().split("\n");
const [rowLen, colLen] = input
  .shift()
  .split(" ")
  .map((e) => Number(e));
const board = input.map((row) => row.split(" ").map((c) => Number(c)));

let result = 0;
// 벽3개 세우는 경우
function dfs(count, board) {
  if (count === 3) {
    infection(board); // 벽 3개 세운뒤 감염된 곳 모두 2로 변경
    result = Math.max(result, getSafeZoneCount(board)); // 최대 안전영역 갱신
    return;
  }
  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      if (board[r][c] === 0) {
        const newBoard = board.map((b) => [...b]);
        newBoard[r][c] = 1;
        dfs(count + 1, newBoard);
      }
    }
  }
}

dfs(0, board);
console.log(result);

function infection(board) {
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  const queue = [];

  for (let r = 0; r < rowLen; r++) {
    for (let c = 0; c < colLen; c++) {
      // 감염된곳
      if (board[r][c] === 2) {
        queue.push({ r, c });

        while (queue.length) {
          const { r, c } = queue.shift();

          for (let i = 0; i < 4; i++) {
            const nextR = r + dr[i];
            const nextC = c + dc[i];

            if (
              nextR >= 0 &&
              nextR < rowLen &&
              nextC >= 0 &&
              nextC < colLen &&
              board[nextR][nextC] === 0
            ) {
              board[nextR][nextC] = 2; // 감염표시
              queue.push({ r: nextR, c: nextC });
            }
          }
        }
      }
    }
  }
}

function getSafeZoneCount(board) {
  return board.reduce((acc, currRow) => {
    acc += currRow.filter((c) => c === 0).length;
    return acc;
  }, 0);
}
