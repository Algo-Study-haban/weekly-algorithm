// https://school.programmers.co.kr/learn/courses/30/lessons/131130?language=javascript
// 작거나 같은
// 열어야 하는 상자가 이미 열려있을 때까지 반복
// 1번 그룹을 제외하고 남는 상자가 없으면 게임 종료 0점
// 또 임의를 골라 2번 상자그룹
// 게임 점수 = 1번상자수 * 2번 상자수

// 완전탐색
function solution(cards) {
  var answer = [];

  function dfs(currIndex, count) {
    // 이미 열은 상자
    if (cards[currIndex] === 0) {
      answer.push(count);
      return;
    }
    const nextIndex = cards[currIndex] - 1;
    cards[currIndex] = 0;
    dfs(nextIndex, count + 1);
  }

  for (let i = 0; i < cards.length; ++i) {
    if (cards[i] !== 0) {
      dfs(i, 0);
    }
  }
  if (answer.length === 1) return 0;
  answer.sort((a, b) => b - a);
  return answer[0] * answer[1];
}
