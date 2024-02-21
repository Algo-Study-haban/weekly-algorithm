// https://school.programmers.co.kr/learn/courses/30/lessons/150365
// 세로*가로 n*m, x,y에서 r,c로 이동
// 격자바깥나갈 수 없음
// 이동거리 총 k, (x,y)(r,c)포함 재방문가능
// 미로 탈출 경로 중 사전순으로 가장 빠른 경로를 구해라
// 좌측상단이 0,0 .는 빈 공간, s출발, e탈출

// 경로dfs + 최단 => 사전순 처음 찾으면 다른 dfs증지
function solution(n, m, x, y, r, c, k) {
  const board = Array.from({ length: n }, () =>
    Array.from({ length: m }, () => ".")
  ); // 이차배열 생성
  board[x - 1][y - 1] = "S"; // 시작점
  board[r - 1][c - 1] = "E"; // 탈출점
  const moveDir = ["d", "l", "r", "u"]; // 사전순
  const dr = [1, 0, 0, -1]; // dlru순으로
  const dc = [0, -1, 1, 0];
  const shortestDist = getMHdistance(x, y, r, c);
  const result = [];

  // 최소 맨하튼 거리가 이동할 수 있는 거리인 k보다 크거나 거리자체가 도달 못 하는 거리인경우 (홀짝)
  if (shortestDist > k || shortestDist % 2 !== k % 2) {
    return "impossible";
  }
  // 맨하튼 거리를 구하는 함수
  function getMHdistance(a, b, c, d) {
    return Math.abs(a - c) + Math.abs(b - d);
  }

  dfs(x - 1, y - 1, ""); // x, y, 경로
  return result[0]; // 첫번째로 찾은 경로 리턴

  function dfs(currR, currC, route) {
    if (result.length > 0) return; // 첫번째 경로를 찾은 경우 다른 dfs 중지한다
    if (route.length > k) return; // k번초과 이동한 경우

    // 현재까지 이동한 거리 + 도착지까지 남은 거리의 합이 k보다 큰 경우
    if (k < route.length + getMHdistance(currR, currC, r - 1, c - 1)) {
      return;
    }

    // k번 이동해서 목적지에 도달한경우
    if (route.length === k && board[currR][currC] === "E") {
      result.push(route);
      return;
    }

    for (let i = 0; i < 4; i++) {
      const nextR = currR + dr[i];
      const nextC = currC + dc[i];

      if (nextR >= 0 && nextR < n && nextC >= 0 && nextC < m) {
        dfs(nextR, nextC, route + moveDir[i]);
      }
    }
  }
}
