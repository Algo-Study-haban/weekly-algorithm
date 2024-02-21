// 알고력, 코딩력 1을 높이기 위해 1의 시간이 필요
// 누적 dp
function solution(alp, cop, problems) {
  let maxAlp = alp;
  let maxCop = cop;
  // 모든 문제를 풀기위해 최대알고력, 최대코딩력 구하기
  problems.forEach(([alp, cop]) => {
    maxAlp = Math.max(maxAlp, alp);
    maxCop = Math.max(maxCop, cop);
  });

  const dp = Array.from({ length: maxAlp + 1 }, () =>
    Array.from({ length: maxCop + 1 }, () => Infinity)
  );
  dp[alp][cop] = 0; // 초기 알고,코딩력 시간 0

  for (let currAlp = alp; currAlp <= maxAlp; ++currAlp) {
    for (let currCop = cop; currCop <= maxCop; ++currCop) {
      // 알고력1을 높였을때 최대알고력을 넘지 않으면 알고력1을 높인 시간을 갱신
      if (currAlp + 1 <= maxAlp) {
        dp[currAlp + 1][currCop] = Math.min(
          dp[currAlp + 1][currCop],
          dp[currAlp][currCop] + 1
        );
      }
      // 코딩력1을 높였을때 최대코딩력을 넘지 않으면 코딩력1을 높인 시간을 갱신
      if (currCop + 1 <= maxCop) {
        dp[currAlp][currCop + 1] = Math.min(
          dp[currAlp][currCop + 1],
          dp[currAlp][currCop] + 1
        );
      }
      // 업그레이드된 능력으로 풀 수 있는 문제가 있으면 풀고 시간 갱신
      problems.forEach(([alp_req, cop_req, alp_rwd, cop_rwd, cost]) => {
        // 풀 수 있는 문제이면
        if (currAlp >= alp_req && currCop >= cop_req) {
          // 문제를 풀어 점수를 얻음 (최대능력을 넘지 않는다)
          const next_alp = Math.min(currAlp + alp_rwd, maxAlp);
          const next_cop = Math.min(currCop + cop_rwd, maxCop);

          dp[next_alp][next_cop] = Math.min(
            dp[next_alp][next_cop],
            dp[currAlp][currCop] + cost
          );
        }
      });
    }
  }
  return dp[maxAlp][maxCop];
}
