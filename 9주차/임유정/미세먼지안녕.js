// https://www.acmicpc.net/problem/17144

// 공기청정기 항상 1열에
// 입력 처리
// const file = "/dev/stdin";
const file = "test.txt";
let input = require("fs").readFileSync(file).toString().trim().split("\n");
let [maxR, maxC, time] = input
  .shift()
  .split(" ")
  .map((e) => parseInt(e));
let board = input.map((r) => r.split(" ").map((e) => parseInt(e)));
const machineRows = [];
// 공기청정기 위치 파악
for (let r = 0; r < maxR; r++) {
  if (board[r][0] === -1) {
    machineRows.push(r);
    machineRows.push(r + 1);
    break;
  }
}

while (time) {
  // const boardAfterOneSec = board.map((b) => [...b]);
  const boardAfterOneSec = Array.from({ length: maxR }, () =>
    Array.from({ length: maxC }, () => [])
  );
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  time--;
  // 확산
  for (let r = 0; r < maxR; r++) {
    for (let c = 0; c < maxC; c++) {
      if (board[r][c] > 0) {
        const currDust = board[r][c];
        const oneDirDust = Math.floor(currDust / 5);
        // 확산하는 방향 갯수 구하기
        let spreadCount = 0;
        for (let i = 0; i < 4; i++) {
          const nextR = r + dr[i];
          const nextC = c + dc[i];

          // 공기청정기가 아니거나 배열의 끝이 아니면, 확산하는 방향갯수 추가하고, 확산한 양만큼 추가하기
          if (
            nextR >= 0 &&
            nextR < maxR &&
            nextC >= 0 &&
            nextC < maxC &&
            board[nextR][nextC] !== -1
          ) {
            spreadCount++;
            boardAfterOneSec[nextR][nextC].push(oneDirDust);
          }
        }
        // 확산뒤 남은 먼지양
        boardAfterOneSec[r][c].push(-oneDirDust * spreadCount);
      }
    }
  }
  for (let r = 0; r < maxR; r++) {
    for (let c = 0; c < maxC; c++) {
      for (let i = 0; i < boardAfterOneSec[r][c].length; i++) {
        board[r][c] += boardAfterOneSec[r][c][i];
      }
    }
  }
  // console.log(board.map((e) => e.join(",")).join("\n"));
  // console.log("=================");

  // 공기청정기 이동
  const [up, down] = machineRows;
  // 위 반시계방향
  const upCorner = [
    board[0][1],
    board[1][maxC - 1],
    board[up][maxC - 2],
    board[up - 1][0],
  ];
  const downCorner = [
    board[down + 1][0],
    board[down][maxC - 2],
    board[maxR - 2][maxC - 1],
    board[maxR - 1][1],
  ];

  // 위에서 위쪽
  const newUpUpArr = board[0];
  const newUpDownArr = board[up];
  newUpDownArr[0] = 0;
  let currRight = board[up][maxC - 1];
  let currLeft = board[1][0];

  newUpUpArr.shift();
  newUpUpArr.push(0);
  board[0] = newUpUpArr;

  // 위에서 아래쪽
  newUpDownArr.pop();
  newUpDownArr.unshift(0);
  board[up] = newUpDownArr;

  // 위에서 오른쪽
  let nextRight;
  for (let r = up; r > 0; r--) {
    nextRight = board[r][maxC - 1];
    board[r - 1][maxC - 1] = currRight;
    currRight = nextRight;
  }

  // 위에서 왼쪽
  let nextLeft;
  for (let r = 1; r < up - 2; r++) {
    nextLeft = board[r][0];
    board[r][0] = currLeft;
    currLeft = nextLeft;
  }

  // 코너
  board[0][0] = upCorner[0];
  board[0][maxC - 1] = upCorner[1];
  board[up][maxC - 1] = upCorner[2];
  board[up][1] = 0;

  board[up][0] = -1;

  // ======================= 아래 시계방향 =======================
  const newDownUpArr = board[down];
  newDownUpArr[0] = 0;
  const newDownDownArr = board[maxR - 1];
  let downCurrRight = board[down][maxC - 1];
  let downCurrLeft = board[maxR - 1][0];

  // 아래에서 위쪽
  newDownUpArr.pop();
  newDownUpArr.unshift(0);
  board[down] = newDownUpArr;

  // 아래에서 아래쪽
  newDownDownArr.shift();
  newDownDownArr.push(0);
  board[maxR - 1] = newDownDownArr;

  // 아래에서 왼쪽
  let downNextLeft;
  for (let r = maxR - 1; r > down; r--) {
    downNextLeft = board[r - 1][0];
    board[r - 1][0] = downCurrLeft;
    downCurrLeft = downNextLeft;
  }
  // 아래에서 오른쪽
  let downNextRight;
  for (let r = down + 1; r < maxR - 1; r++) {
    downNextRight = board[r][maxC - 1];
    board[r][maxC - 1] = downCurrRight;
    downCurrRight = downNextRight;
  }

  // 코너
  board[down + 1][0] = downCorner[0];
  board[down][maxC - 1] = downCorner[1];
  board[maxR - 1][maxC - 1] = downCorner[2];
  board[maxR - 1][0] = downCorner[3];

  board[down][0] = -1;
}

console.log(board.map((e) => e.join(",")).join("\n"));
let sum = 0;
for (let r = 0; r < maxR; r++) {
  for (let c = 0; c < maxC; c++) {
    sum += board[r][c];
  }
}
console.log(sum + 2);
