// https://www.acmicpc.net/problem/9019

// 입력 처리
const file = "/dev/stdin";
// const file = "test.txt";

let input = require("fs").readFileSync(file).toString().trim().split("\n");
const count = input
  .shift()
  .split(" ")
  .map((e) => parseInt(e));

const calcD = (s) => {
  const result = s * 2;
  if (result > 9999) return result % 10000;
  return result;
};
const calcS = (s) => {
  return s - 1 === 0 ? 9999 : s - 1;
};

const calcL = (s) => {
  const arr = [...String(s)];
  arr.push(arr.shift());
  return Number(arr.join(""));
};

const calcR = (s) => {
  const arr = [...String(s)];
  arr.unshift(arr.pop());
  return Number(arr.join(""));
};

input.forEach((e) => {
  const [from, to] = e.split(" ").map((e) => Number(e));
  const targetNum = Number(to);
  const calcArr = [
    { calcName: "D", calcFun: calcD },
    { calcName: "S", calcFun: calcS },
    { calcName: "L", calcFun: calcL },
    { calcName: "R", calcFun: calcR },
  ];
  const queue = [];

  for (const { calcName, calcFun } of calcArr) {
    queue.push({ curr: calcFun(from), accCalc: calcName });
  }

  while (queue.length) {
    const { curr, accCalc } = queue.shift();
    if (curr === targetNum) {
      console.log(accCalc);
      break;
    }

    for (const { calcName, calcFun } of calcArr) {
      queue.push({ curr: calcFun(curr), accCalc: accCalc + calcName });
    }
  }
});
