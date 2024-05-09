// https://school.programmers.co.kr/learn/courses/30/lessons/142085

// logn
// 병사수가 많을때 무적권쓰고 적을때 싸우고
function solution(n, k, enemy) {
  var answer = 0;
  if (k >= enemy.length) return enemy.length;
  const maxHeap = new MaxHeap();

  for (const e of enemy) {
    maxHeap.push(e);
    n -= e;
    // 남은 병사가 없을때
    if (n < 0) {
      if (k) {
        k--;
        n += maxHeap.pop();
      } else {
        break;
      }
    }
    answer++;
  }
  return answer;
}

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  getSize() {
    return this.heap.length;
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  getParentI(n) {
    return Math.floor((n - 1) / 2);
  }
  getLeftChildI(n) {
    return n * 2 + 1;
  }
  getRightChildI(n) {
    return n * 2 + 2;
  }

  push(n) {
    this.heap.push(n);
    let currI = this.getSize() - 1;
    let parentI = this.getParentI(currI);

    while (currI > 0 && this.heap[parentI] < this.heap[currI]) {
      this.swap(parentI, currI);
      currI = parentI; /////////
      parentI = this.getParentI(currI); /////////
    }
  }

  pop() {
    if (!this.heap.length) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const removed = this.heap[0];
    this.heap[0] = this.heap.pop();
    const leftChildI = this.getLeftChildI(0);

    let currI = 0;
    while (currI < this.getSize()) {
      let leftChildI = this.getLeftChildI(currI);
      let rightChildI = this.getRightChildI(currI);

      let bigChildI = leftChildI;
      if (this.heap[leftChildI] < this.heap[rightChildI]) {
        bigChildI = rightChildI;
      }
      if (this.heap[bigChildI] > this.heap[currI]) {
        this.swap(bigChildI, currI);
      }
      currI = bigChildI;
    }
    return removed;
  }
}
