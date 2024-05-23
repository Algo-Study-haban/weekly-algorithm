// https://school.programmers.co.kr/learn/courses/30/lessons/42895

function solution(N, number) {
  const sets = Array.from({ length: 9 }, () => new Set());
  // 5, 55, 555 ...추가
  sets.forEach((set, i) => {
    set.add(Number(String(N).repeat(i)));
  });

  console.log(sets);
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= i; j++) {
      for (const first of sets[j]) {
        for (const second of sets[i - j]) {
          sets[i].add(first + second);
          sets[i].add(first - second);
          sets[i].add(first * second);
          sets[i].add(Math.floor(first / second));
        }
        if (sets[i].has(number)) return i;
      }
    }
  }
  return -1;
}
