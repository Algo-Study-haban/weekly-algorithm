// https://school.programmers.co.kr/learn/courses/30/lessons/250136
// 뚫어서 뽑을 수 있는 석유량을 누적, 마지막에 최대 누적값 출력
function solution(land) {
  const maxR = land.length;
  const maxC = land[0].length;
  const answers = Array.from({ length: maxC }, () => 0);

  for (let c = 0; c < maxC; c++) {
    for (let r = 0; r < maxR; r++) {
      if (land[r][c] === 1) {
        land[r][c] = 0;
        const { amount, colSet } = suckAll(r, c, land, maxR, maxC);
        for (const c of colSet) {
          answers[c] += amount;
        }
      }
    }
  }
  return Math.max(...answers);
}

function suckAll(currR, currC, land, maxR, maxC) {
  let amount = 1;
  const queue = [{ r: currR, c: currC }];
  const colSet = new Set();
  colSet.add(currC);
  const dr = [-1, 0, 1, 0];
  const dc = [0, 1, 0, -1];

  while (queue.length) {
    const { r, c } = queue.shift();
    for (let i = 0; i < 4; i++) {
      const nextR = r + dr[i];
      const nextC = c + dc[i];

      if (
        nextR >= 0 &&
        nextR < maxR &&
        nextC >= 0 &&
        nextC < maxC &&
        land[nextR][nextC] === 1
      ) {
        land[nextR][nextC] = 0;
        amount++;
        colSet.add(nextC);
        queue.push({ r: nextR, c: nextC });
      }
    }
  }
  return { amount, colSet };
}
