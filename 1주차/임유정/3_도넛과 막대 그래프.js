// https://school.programmers.co.kr/learn/courses/30/lessons/258711

// 도넛: n개 점, n개 선, 한번씩 방문 뒤 돌아옴
// 막대: n개 정점, n-1개 선, 한번씩 방문
// 8자: 2n+1정점, 2n+2개 선, 동일한 도넛 2개를 한 점을 결합시킨것
// 생성한 점의 번호와 각 그래프의 수를 구함

// 그래프와 무관한 정점 찾기
// 거기서부터 연결되는 각 그래프를 순환하며 무슨 그래프인지 판단
// 시작점을 다시 방문하면 도넛
// 갔다가 돌아오지 않으면 막대
// 경로가 2개 존재하는 정점이 있으면 8자 [3,5] [5,3]

// 다시 돌아오면 도넛
// 다시 돌아오지 않으면 막대
// 다시 돌아오기전에 진입2개, 진출2개이면 8자

// 무관 정점 특징: 나가는 선이 2개 이상이고 들어오는 선이 없음
function solution(edges) {
  const graph = {};
  edges.forEach(([from, to]) => {
    if (!graph[from]) graph[from] = { send: 0, recv: 0 };
    if (!graph[to]) graph[to] = { send: 0, recv: 0 };

    graph[from].send++;
    graph[to].recv++;
  });
  const answer = [0, 0, 0, 0]; // 정점, 도넛 개수, 막대 갯수, 8자 갯수
  let graphCount;
  for (const [key, { send, recv }] of Object.entries(graph)) {
    // 들어온건 없고 나간것만 2개 이상이면 정점이다
    if (!recv && send >= 2) {
      answer[0] = parseInt(key); // 정점
      graphCount = send; // 그래프 개수
    }
    // 나간게 없으면 막대
    if (!send) {
      answer[2]++;
    }
    // 들어가고 나간게 2개이상이면 8자
    if (send >= 2 && recv >= 2) {
      answer[3]++;
    }
  }
  answer[1] = graphCount - (answer[2] + answer[3]);
  return answer;
}
