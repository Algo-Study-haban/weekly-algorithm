// 1~n, 출입구, 쉼터, 산봉우리, 양방향
// intensity: 휴식없이 이동하는 최장시간
// 출입구중 한 곳에서 출발, 산봉우리 한곳만 방문 후 다시 원래 출입구로 돌아옴
// intensity가 최소가 되는 [산봉우리번호, intensity 최소값] 리턴, intensity최소가 여러개이면 낮은 산봉우리

// 올라갔던 길을 다시 그대로 내려오면 된다
// => 한 출입구에서 한 산봉우리까지 intensity 정리
// 최소 intensity 찾기

function solution(n, paths, gates, summits) {
  const summitSet = new Set(summits); // 산봉우리인지 확인 O(1)

  // 그래프 정리
  const graph = {}; // {'1': [ { nextNode: 2, nextIntensity: 3 } ]}
  paths.forEach(([fromNode, toNode, intensity]) => {
    // 새로운 노드면 초기화
    if (!(fromNode in graph)) graph[fromNode] = [];
    if (!(toNode in graph)) graph[toNode] = [];

    // 노드와 연결된 양방향 path
    graph[fromNode].push({ nextNode: toNode, nextIntensity: intensity });
    graph[toNode].push({ nextNode: fromNode, nextIntensity: intensity });
  });

  // 가중치 작은 순서대로 큐에 넣고 빼기 위해 최소힙을 사용한다.
  const minQueue = new MinHeap();
  // memo[i] = i번 노드까지 가는데 필요한 최대 가중치
  const memo = Array.from({ length: n + 1 }, () => Infinity); // 10000001

  // 먼저 출입구부터 큐에 넣는다
  gates.forEach((gate) => {
    minQueue.push({ intensity: 0, node: gate });
    memo[gate] = 0; // 출입구의 가중치는 0
  });

  while (minQueue.heap.length > 1) {
    // 현재노드, 현재노드 까지 필요한 최대가중치
    const { intensity: currIntensity, node } = minQueue.pop();

    // 현재노드가 정상이거나 현재 가중치가 이미 기존가중치보다 크면 현재노드에서 탐색을 멈춘다 (이미 최소가중치를 넘었기때문에 더이상 탐색할 필요없다)
    if (summitSet.has(node) || currIntensity > memo[node]) {
      continue;
    }

    // // 그래프에 없는 노드일때
    // if (!(node in graph)) {
    //   continue;
    // }

    // 현재노드와 연결된 다음 노드들을 순회한다
    graph[node].forEach(({ nextIntensity, nextNode }) => {
      // 새로운 가중치 = 현재까지 최대가중치와 현재노드에서 다음노드로 가는 가중치 중 큰 값
      const newIntensity = Math.max(currIntensity, nextIntensity);
      // 새로운 가중치가 기존가중치보다 작으면
      if (newIntensity < memo[nextNode]) {
        memo[nextNode] = newIntensity; // 기존가중치를 새로운 가중치로 갱신하고
        minQueue.push({ node: nextNode, intensity: newIntensity }); // 큐에 추가하여 다음으로 연결된 노드들의 가중치를 갱신한다.
      }
    });
  }

  summits.sort((a, b) => a - b); // 작은 정상 우선

  // 정상
  const answer = [0, Infinity];
  summits.forEach((summit) => {
    if (memo[summit] < answer[1]) {
      answer[0] = summit;
      answer[1] = memo[summit];
    }
  });
  return answer;
}

// intensity 최소우선순위큐
class MinHeap {
  constructor() {
    this.heap = [null];
  }

  push(data) {
    const { intensity, node } = data;
    let currIndex = this.heap.length;

    // 부모노드가 존재할때 현재노드의 제 위치를 찾는다
    while (currIndex > 1) {
      const parentIndex = Math.floor(currIndex / 2);
      // 부모 > 현재이면 swap
      if (this.heap[parentIndex].intensity > intensity) {
        [this.heap[currIndex], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[currIndex],
        ];
        currIndex = parentIndex;
      } else {
        break;
      }
    }
    this.heap[currIndex] = { intensity, node };
  }

  pop() {
    const min = this.heap[1];

    // 자식노드가 있을떄
    if (this.heap.length > 2) {
      // 마지막 노드를 최상위 노드로 올려준다
      this.heap[1] = this.heap.pop();
      let currIndex = 1;
      let leftChildIndex = currIndex * 2;
      let rightChildIndex = currIndex * 2 + 1;

      // 자식이 있을 때
      while (this.heap[leftChildIndex]) {
        // 두 자식중 intensity최소자식 구하기
        let smallerChildIndex = leftChildIndex;
        if (
          this.heap[rightChildIndex] &&
          this.heap[leftChildIndex].intensity >
            this.heap[rightChildIndex].intensity
        ) {
          smallerChildIndex = rightChildIndex;
        }
        // 부모 > 최소자식이면 둘을 swap
        if (
          this.heap[currIndex].intensity >
          this.heap[smallerChildIndex].intensity
        ) {
          [this.heap[currIndex], this.heap[smallerChildIndex]] = [
            this.heap[smallerChildIndex],
            this.heap[currIndex],
          ];
          currIndex = smallerChildIndex;
        } else {
          break;
        }
        leftChildIndex = currIndex * 2;
        rightChildIndex = currIndex * 2 + 1;
      }
      return min;
    } else if (this.heap.length === 2) {
      this.heap.pop();
    } else {
      return null;
    }
    return min;
  }
}
