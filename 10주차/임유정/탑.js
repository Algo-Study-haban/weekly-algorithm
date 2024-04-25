// https://www.acmicpc.net/problem/2493

// 입력 처리
const file = "/dev/stdin";
// const file = "test.txt";

let input = require("fs").readFileSync(file).toString().trim().split("\n");
const n = Number(input.shift());
const arr = input
  .shift()
  .split(" ")
  .map((e, i) => {
    return { num: parseInt(e), i: i + 1 };
  });
let stack = [];
const answer = [];

for (let i = 0; i < arr.length - 1; i++) {
  // 스택에 아무것도 없을때 0
  if (!stack.length) {
    answer.push(0);
    // 현재가 다음보다 크면 stack에 push
    if (arr[i].num > arr[i + 1].num) {
      stack.push(arr[i]);
    }
    continue;
  }
  // 스택에 이전의 가장 큰게 있을 때
  const before = stack[stack.length - 1];
  const curr = arr[i];
  const next = arr[i + 1];
  // 이전 > 현재
  if (before.num > curr.num) {
    answer.push(before.i);
    // 현재 > 미래이면 스택에 현재 넣기
    if (curr.num > next.num) {
      stack.push(curr);
    }
  } else {
    // 이전 < 현재이면 현재보다 큰 탑을 찾을 때까지 pop
    while (stack.length && stack[stack.length - 1].num < curr.num) {
      stack.pop();
    }
    // 현재보다 큰 탑이 있는 경우
    if (stack.length) {
      answer.push(stack[stack.length - 1].i);
    } else {
      answer.push(0);
    }
    // 현재 > 미래이면 현재를 stack에 넣기
    if (curr.num > next.num) {
      stack.push(curr);
    }
  }
}

const before = stack[stack.length - 1];
const last = arr[arr.length - 1];

// 마지막
if (stack.length) {
  // 이전 > 현재
  if (before.num > last.num) {
    answer.push(before.i);
  } else {
    // 이전 > 현재가 될 떄까지pop
    while (stack.length && stack[stack.length - 1].num < last.num) {
      stack.pop();
    }
    // 남은 탑이 없으면
    if (!stack.length) {
      answer.push(0);
    } else {
      answer.push(stack[stack.length - 1].i);
    }
  }
} else {
  answer.push(0);
}
console.log(answer.join(" "));
