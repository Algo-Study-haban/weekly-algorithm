// https://school.programmers.co.kr/learn/courses/30/lessons/12936

// 백트래킹 순열
function solution(n, k) {
  var answer = [];
  let arr = Array.from({ length: n }, (_, i) => i + 1);
  const factorialArr = [1, 1]; // 각 자리마다 만들수 있는 조합의 수

  function getFactorialArr(n) {
    for (let i = 2; i <= n; ++i) {
      factorialArr[i] = i * factorialArr[i - 1];
    }
  }
  getFactorialArr(n);

  // 남은 자릿수, k번째, 누적
  function bt(n, k, acc) {
    if (n === 0) {
      answer = acc.concat(arr);
      return;
    }
    let group = Math.floor(k / factorialArr[n - 1]);

    k = k % factorialArr[n - 1]; // 나머지: 그룹 안에서 몇 번째
    //
    if (k === 0) {
      group--;
    }

    bt(n - 1, k, [...acc, ...arr.splice(group, 1)]);
  }

  bt(n, k, []);
  return answer;
}
