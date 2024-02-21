// 두 큐의 합이 같게 하기 위해 뺐다 넣다해야하는 최소횟수
// 안 되면 -1
// 둘의 합에서 빼주고 더해주고를 반복
function solution(queue1, queue2) {
  var answer = 0;
  let sum1 = getSum(queue1);
  let sum2 = getSum(queue2);
  let p1 = 0;
  let p2 = 0;
  const max = queue1.length * 3; // 300000

  if ((sum1 + sum2) % 2 === 1) return -1; // 둘의 합이 홀수면 불가능하므로 -1

  for (let i = 0; i < max; i++) {
    // 두 큐의 합이 같은경우
    if (sum1 === sum2) return answer;
    // 큐1의 합이 더 큰 경우 큐2로 이동
    if (sum1 > sum2) {
      const movingNum = queue1[p1];
      sum1 -= movingNum;
      sum2 += movingNum;
      queue2.push(movingNum);
      p1++;
    }
    // 큐2의 합이 더 큰 경우 큐1로 이동
    else {
      const movingNum = queue2[p2];
      sum1 += movingNum;
      queue1.push(movingNum);
      sum2 -= movingNum;
      p2++;
    }
    answer++;
  }
  return -1;
}

function getSum(arr) {
  return arr.reduce((acc, curr) => acc + curr, 0);
}
