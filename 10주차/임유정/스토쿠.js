// https://www.acmicpc.net/problem/2580

// 입력 처리
const file = "/dev/stdin";
// const file = "test.txt";
let input = require("fs").readFileSync(file).toString().trim().split("\n");
let board = input.map((r) => r.split(" ").map((e) => parseInt(e)));
const zeroArr = [];

for (let i = 0; i < 9; i++) {
  for (let j = 0; j < 9; j++) {
    if (board[i][j] === 0) {
      zeroArr.push([i, j]);
    }
  }
}
// 행, 열, 정사각형 확인후, 가능한 것들 찾아서 완전탐색
function dfs(zeroI) {
  if (zeroI === zeroArr.length) {
    console.log(board.map((r) => r.join(" ")).join("\n"));
    return;
  }
  const [zeroR, zeroC] = zeroArr[zeroI];
  // 현재 위치에 올수 있는 숫자 구하기
  const availables = findAvailables(zeroR, zeroC);
  for (const a of availables) {
    board[zeroR][zeroC] = a;
    dfs(zeroI + 1);
    board[zeroR][zeroC] = 0;
  }
}

dfs(0);

function findAvailables(r, c) {
  const availables = {};

  // 행 확인
  const rowArr = checkRow(r);
  if (rowArr.length === 1) {
    return [rowArr[0]];
  } else {
    for (const r of rowArr) {
      availables[r] = (availables[r] || 0) + 1;
    }
  }
  // 열 확인
  const colArr = checkCol(c);
  if (colArr.length === 1) {
    return [colArr[0]];
  } else {
    for (const c of colArr) {
      availables[c] = (availables[c] || 0) + 1;
    }
  }
  // 정사각형 확인
  const squareArr = checkSquare(3 * Math.floor(r / 3), 3 * Math.floor(c / 3));
  if (squareArr.length === 1) {
    return [squareArr[0]];
  } else {
    for (const s of squareArr) {
      availables[s] = (availables[s] || 0) + 1;
    }
  }
  return Object.entries(available).filter((e) => e[1] === 3);
}

function checkRow(r) {
  const set = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (let i = 0; i < 9; i++) {
    set.delete(board[r][i]);
  }
  return [...set];
}

function checkCol(c) {
  const set = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  for (let i = 0; i < 9; i++) {
    set.delete(board[i][c]);
  }
  return [...set];
}

function checkSquare(r, c) {
  const set = new Set([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  for (let i = r; i < r + 3; i++) {
    for (let j = c; j < c + 3; j++) {
      set.delete(board[i][j]);
    }
  }
  return [...set];
}
