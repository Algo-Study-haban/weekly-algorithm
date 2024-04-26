// https://www.acmicpc.net/problem/1759

// 입력 처리
const file = "/dev/stdin";
// const file = "test.txt";
// dfs
let input = require("fs").readFileSync(file).toString().trim().split("\n");
const [count, totalCount] = input
  .shift()
  .split(" ")
  .map((e) => parseInt(e));

const arr = input[0].split(" ").sort();
const moeum = ["a", "e", "i", "o", "u"];

function isMoeum(s) {
  return moeum.includes(s);
}

function dfs(acc, remain, moeumCount, zaeumCount) {
  if (acc.length === count && moeumCount >= 1 && zaeumCount >= 2) {
    console.log(acc);
    return;
  }

  remain.forEach((selected, i) => {
    const newRemain = [...remain].splice(i + 1, totalCount);

    dfs(
      acc + selected,
      newRemain,
      moeumCount + (isMoeum(selected) ? 1 : 0),
      zaeumCount + (!isMoeum(selected) ? 1 : 0)
    );
  });
}

dfs("", arr, 0, 0);
