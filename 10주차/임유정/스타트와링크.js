// https://www.acmicpc.net/problem/14889

// 입력 처리
const file = "/dev/stdin";
// const file = "test.txt";

let input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input.shift());
const board = input.map((r) => r.split(" ").map((c) => parseInt(c)));
let answer = Infinity;

const caseArr = getCombi(
  Array.from({ length: n }, (_, i) => i),
  n / 2
);

function getCombi(arr, count) {
  if (count === 1) {
    return arr.map((e) => [e]);
  }
  const result = [];

  arr.forEach((selected, i) => {
    const newArr = arr.slice(i + 1);
    const newCombi = getCombi(newArr, count - 1);
    newCombi.forEach((e) => {
      result.push([selected, ...e]);
    });
  });
  return result;
}

for (let i = 0; i < caseArr.length / 2; i++) {
  const start = caseArr[i];
  const link = Array.from({ length: n }, (_, i) => i).filter(
    (e) => !start.includes(e)
  );
  const startXY = getPermut(start, 2);
  const linkXY = getPermut(link, 2);

  let startSum = 0;
  let linkSum = 0;
  for (let i = 0; i < startXY.length; i++) {
    const [startX, startY] = startXY[i];
    const [linkX, linkY] = linkXY[i];

    startSum += board[startX][startY];
    linkSum += board[linkX][linkY];
  }
  answer = Math.min(answer, Math.abs(startSum - linkSum));
}

function getPermut(arr, count) {
  if (count === 1) {
    return arr.map((a) => [a]);
  }
  let result = [];
  arr.forEach((selected) => {
    const newArr = arr.filter((r) => r !== selected);
    const newPermut = getPermut(newArr, count - 1);
    newPermut.forEach((e) => {
      result.push([selected, ...e]);
    });
  });
  return result;
}

console.log(answer);
