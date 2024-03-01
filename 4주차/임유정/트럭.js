// https://www.acmicpc.net/problem/13335
// 입력 처리
const file = "/dev/stdin";
// const file = "test.txt";

let input = require("fs").readFileSync(file).toString().trim().split("\n");
const [count, len, maxW] = input[0].split(" ").map((e) => parseInt(e));
const trucks = input[1].split(" ").map((e) => parseInt(e));

// 초기화
const bridge = Array.from({ length: len }, () => 0);
bridge.shift();
bridge.push(trucks[0]); // 첫번째 트럭 다리에 올리기
let sumW = trucks.shift(); // 다리 위 총 무게
let time = 1;

// 다리 위에 트럭이 있거나, 아직 못 통과한 트럭이 있는 경우
while (sumW > 0 || trucks.length) {
  time++;

  // 맨 앞의 트럭 다리 통과
  sumW -= bridge.shift();

  // 아직 더 올릴 수 있는 경우
  const nextW = trucks[0];
  if (sumW + nextW <= maxW) {
    sumW += nextW;
    bridge.push(nextW);
    trucks.shift();
  } else {
    // 더이상 못 올리는 경우
    bridge.push(0);
  }
}

console.log(time);
