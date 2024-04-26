// https://www.acmicpc.net/problem/1725

// 입력 처리
const file = "/dev/stdin";
// const file = "test.txt";
let hArr = require("fs")
  .readFileSync(file)
  .toString()
  .trim()
  .split("\n")
  .map((e) => Number(e));

function getArea(len, histogram) {
  let stack = [];
  let maxArea = 0;

  for (let i = 0; i < len; i++) {
    while (
      stack.length > 0 &&
      histogram[stack[stack.length - 1]] >= histogram[i]
    ) {
      let height = histogram[stack.pop()];
      let width = stack.length === 0 ? i : i - 1 - stack[stack.length - 1];
      maxArea = Math.max(maxArea, height * width);
    }
    stack.push(i);
  }

  while (stack.length > 0) {
    let height = histogram[stack.pop()];
    let width = stack.length === 0 ? len : len - 1 - stack[stack.length - 1];
    maxArea = Math.max(maxArea, height * width);
  }

  return maxArea;
}

console.log(getArea(hArr.length, hArr));
