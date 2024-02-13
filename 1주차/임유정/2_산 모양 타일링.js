// https://school.programmers.co.kr/learn/courses/30/lessons/258705

function solution(n, tops) {
  const MOD = 10007;
  let rightDiamond = Array.from({ length: n }, () => 0); // i번째 역삼각형이 right다이아로 덮히는 경우
  let nonRightDiamond = Array.from({ length: n }, () => 0); // i번째 역삼각형이 right다이아로 덮히지 않는 경우

  // 초기화
  rightDiamond[0] = 1;
  nonRightDiamond[0] = tops[0] === 1 ? 3 : 2; // left다이아, 역삼각형, top다이아(위에 삼각형에 있는 경우) 으로 덮힐 수 있다.

  for (let i = 1; i < n; i++) {
    // 현재 삼각형이 right다이아로 덮히는 경우는 i-1의 모든 경우에도 덮힐 수 있다.
    rightDiamond[i] = rightDiamond[i - 1] + nonRightDiamond[i - 1];

    // 위에 삼각형이 있는 경우
    if (tops[i] === 1) {
      // top다이아, 역삼각형 / left다이아, top다이아, 역삼각형
      nonRightDiamond[i] = rightDiamond[i - 1] * 2 + nonRightDiamond[i - 1] * 3;
    } else if (tops[i] === 0) {
      // 역삼각형 / 역삼각형, left다이아
      nonRightDiamond[i] = rightDiamond[i - 1] + nonRightDiamond[i - 1] * 2;
    }
    rightDiamond[i] %= MOD;
    nonRightDiamond[i] %= MOD;
  }

  return (rightDiamond[n - 1] + nonRightDiamond[n - 1]) % MOD;
}
