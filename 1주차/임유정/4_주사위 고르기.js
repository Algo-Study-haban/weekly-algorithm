// https://school.programmers.co.kr/learn/courses/30/lessons/258709

// n개 주사위, 각 주사위마다 1~n 번호, 주사위의 수의 구성은 다름
// a가 먼저 가져감, 굴려서 나온 수들의 합이 점수
// a가 승리할 확률이 높게 골라야하는 주사위 번호를 오름차순으로 리턴
// 주사위 최대10개
// 10c5 = 635204
// 6^5 = 7776
// 7776*7776*63504

function solution(dice) {
  const diceIndexArr = Array.from({ length: dice.length }, (_, i) => i);
  const diceIndexCombis = getCombi(diceIndexArr, diceIndexArr.length / 2);
  let prevAWinCount = -Infinity;
  let answer;

  // a, b 각 조합마다 가지는 주사위 구하기
  for (const combi of diceIndexCombis) {
    const aDice = combi.map((diceIndex) => dice[diceIndex]);
    const bDiceIndexs = diceIndexArr.filter((e) => !combi.includes(e));
    const bDice = bDiceIndexs.map((diceIndex) => dice[diceIndex]);

    // a, b 각각 모든경우의 합 구하기
    const aSumObj = {};
    const bSumObj = {};
    getSums(0, [], aDice, aSumObj); // {합: 갯수}
    getSums(0, [], bDice, bSumObj);

    // 점수비교하기// str => num
    const aNums = Object.keys(aSumObj).map((e) => parseInt(e));
    const bNums = Object.keys(bSumObj).map((e) => parseInt(e));

    let aWinCount = 0;

    aNums.forEach((aNum) => {
      bNums.forEach((bNum) => {
        // a가 더 큰 경우 이긴횟수를 증가한다
        if (aNum > bNum) {
          aWinCount += aSumObj[aNum] * bSumObj[bNum];
        }
      });
    });
    // 전 보다 더 많이 이겼으면 갱신
    if (prevAWinCount < aWinCount) {
      prevAWinCount = aWinCount;
      answer = combi.map((c) => c + 1);
    }
  }
  return answer;
}
function getSums(i, selection, arr, obj) {
  if (i === arr.length) {
    const sum = selection.reduce((acc, curr) => {
      acc += curr;
      return acc;
    }, 0);
    obj[sum] = (obj[sum] || 0) + 1;
    return;
  }
  arr[i].forEach((e) => {
    const newSelection = selection.concat(e);
    getSums(i + 1, newSelection, arr, obj);
  });
}
function getCombi(arr, count) {
  if (count === 1) {
    return arr.map((e) => [e]);
  }

  const result = [];
  arr.forEach((fixed, i) => {
    const rest = arr.slice(i + 1);
    const restCombi = getCombi(rest, count - 1);
    restCombi.forEach((e) => {
      result.push([fixed, ...e]);
    });
  });
  return result;
}
