// https://school.programmers.co.kr/learn/courses/30/lessons/12978


function solution(N, road, K) {
  // 양방향 그래프생성
  const graph = {};
  road.forEach(r => {
      const [from, to, weight] = r;
      if (!(from in graph)) {
          graph[from] = [];
      }
      if (!(to in graph)) {
          graph[to] = [];
      }
      graph[from].push({nextNode: to, nextWeight: weight});
      graph[to].push({nextNode: from, nextWeight: weight});
  })
  const weightArr = Array.from({length: N+1}, () => Infinity); // 각 점마다 최단거리 초기화
  const queue = [];
  queue.push({currNode: 1, currWeight: 0}); // 시작점
  weightArr[1] = 0; // 시작점 방문 표시
  
  while(queue.length) {
      const {currNode, currWeight} = queue.shift();
      // 현재위치의 주변
      graph[currNode].forEach(({nextNode, nextWeight}) => {
          const acc = currWeight + nextWeight;
          // 더 짧은 최단거리를 구하면 갱신
          if (acc < weightArr[nextNode]) {
              weightArr[nextNode] = Math.min(weightArr[nextNode], acc);
              queue.push({currNode: nextNode, currWeight: acc}); // 다음 노드로 이동
          }
      })
  }
  return weightArr.filter(weight => weight <= K).length;
}