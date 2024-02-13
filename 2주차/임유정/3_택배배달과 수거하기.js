// https://school.programmers.co.kr/learn/courses/30/lessons/150369
// n개 집, 최대 cap개 실을수 있다
// deliveries 집마다 배달해야할 상자 갯수, pickups 수거해야할 상자 갯수
// 최소이동거리를 구해라
// 이동은 창고에서 가장 먼 목표집까지
// 이동하는 길 중간에 다른 집을 방문해도 됨
// 제일 먼 곳부터 0으로 처리
// nlogn
// n이 첫번째 마지막 집이라고 생각했다
function solution(cap, n, deliveries, pickups) {
  var answer = 0;

  // 첫번째 배달/수거해야할 가장 먼 집 찾기
  while (deliveries[n - 1] === 0 && pickups[n - 1] === 0) {
    deliveries.pop();
    pickups.pop();
    n--;
  }
  // 모두 배달/수거 할때까지 (배달, 수거 배열에 남은 상자가 없을 때까지)
  while (deliveries.length || pickups.length) {
    answer += Math.max(deliveries.length, pickups.length) * 2; // 배달, 수거해야하는 집 중 먼 곳의 거리를 추가
    count("deliver");
    count("pickup");
  }
  // 배달, 수거한 갯수 처리하는 함수
  function count(type) {
    const arr = type === "deliver" ? deliveries : pickups;
    let count = cap;
    // cap만큼 배달을 한다
    while (arr.length && count) {
      // 현재 집의 배달/수거를 모두 할 수 있다
      if (arr[arr.length - 1] <= count) {
        count -= arr[arr.length - 1];
        arr.pop();
      }
      // 현재 집의 배달/수거를 모두 할 수는 없다.
      else {
        arr[arr.length - 1] -= count;
        count = 0;
      }
    }
    // 배달/수거를 안 해도 되는 집은 건너뛴다
    while (arr[arr.length - 1] === 0) {
      arr.pop();
    }
  }
  return answer;
}
