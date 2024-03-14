// https://www.acmicpc.net/problem/2667

// 입력 처리
const file = "/dev/stdin";
// const file = "test.txt";
let input = require("fs").readFileSync(file).toString().trim().split("\n");
const len = parseInt(input.shift());
const board = input.map((row) => {
  const newRow = row.replace("\r", "");
  return newRow.split("").map((c) => parseInt(c));
});
const areas = [];

for (let r = 0; r < len; r++) {
  for (let c = 0; c < len; c++) {
    if (board[r][c] === 1) {
      board[r][c] = 0;
      const currArea = getArea(r, c);
      areas.push(currArea);
    }
  }
}

console.log(areas.length);
areas.sort((a, b) => a - b);
areas.forEach((e) => console.log(e));

// bfs
function getArea(currR, currC) {
  const queue = [{ r: currR, c: currC }];
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];
  let area = 1;

  while (queue.length) {
    const { r, c } = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nextR = r + dr[i];
      const nextC = c + dc[i];

      if (
        nextR >= 0 &&
        nextR < len &&
        nextC >= 0 &&
        nextC < len &&
        board[nextR][nextC] === 1
      ) {
        board[nextR][nextC] = 0; // 방문표시
        area++;
        queue.push({ r: nextR, c: nextC });
      }
    }
  }

  return area;
}
