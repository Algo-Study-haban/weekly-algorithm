// https://school.programmers.co.kr/learn/courses/30/lessons/169198
function solution(m, n, startX, startY, balls) {
  var answer = [];

  const sym = [
    [startX, 2 * n - startY],
    [2 * m - startX, startY],
    [startX, -startY],
    [-startX, startY],
  ]; // 상우하좌

  balls.forEach(([targetX, targetY]) => {
    let min = Infinity;

    for (const [newStartX, newStartY] of sym) {
      // 시작점 대칭점과 목표점의 x가 같은 경우
      if (newStartX === targetX) {
        const maxY = Math.max(startY, newStartY);
        const minY = Math.min(startY, newStartY);
        // 벽을 먼저 칠 수 없으면 스킵
        if (minY < targetY && targetY < maxY) continue;
      }
      // 시작점 대칭점과 목표점의 y가 같은 경우
      if (newStartY === targetY) {
        const maxX = Math.max(startX, newStartX);
        const minX = Math.min(startX, newStartX);
        if (minX < targetX && targetX < maxX) continue;
      }
      const result = (newStartX - targetX) ** 2 + (newStartY - targetY) ** 2;
      min = Math.min(min, result);
    }
    answer.push(min);
  });
  return answer;
}
