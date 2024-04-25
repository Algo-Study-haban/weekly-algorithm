// 입력 처리
const file = "/dev/stdin";
// const file = "test.txt";
// dfs +
let input = require("fs").readFileSync(file).toString().trim().split("\n");
const arr = [...input.shift()];
arr.pop();
const target = input[0];
const first = target[0];
let start = 0;
let i = 0;

while (i < arr.length) {
  const curr = arr[i];
  if (curr === first) {
    start = i;
    let isMatched = true;
    // 뒤에 확인
    for (let j = 1; j < target.length; j++) {
      if (arr[i + j] !== target[j]) {
        isMatched = false;
        break;
      }
    }
    if (isMatched) {
      arr.splice(start, target.length);
      if (arr[i - 1] && arr[i - 1] === first) {
        i -= 2;
      }
    } else {
      i++;
    }
  } else {
    i++;
  }
}

if (!arr.length) {
  console.log("FRULA");
} else {
  console.log(arr.join(""));
}
