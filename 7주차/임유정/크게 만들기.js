// https://www.acmicpc.net/problem/2812

function solution(n, k, num) {
  const stack = [];

  for (const curr of n) {
    if (stack.length && stack[stack.length - 1] < curr && k) {
      stack.pop();
      k--;
    }
    stack.push(curr);
  }
  return stack.join("").substring(0, stack.length - k);
}

solution(10, 4, 4177252841);
