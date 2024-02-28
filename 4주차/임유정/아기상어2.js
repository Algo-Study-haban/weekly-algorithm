// https://www.acmicpc.net/problem/17086

// 입력 처리
const file = "/dev/stdin";
// const file = "test.txt";

class Node {
  constructor(n) {
    this.value = n;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.p = this.head;
    this.size = 0;
  }

  enqueue(n) {
    const newNode = new Node(n);
    if (!this.head) {
      this.head = newNode;
      this.p = newNode;
    } else {
      this.p.next = newNode;
      this.p = this.p.next;
    }

    this.size++;
  }

  dequeue() {
    if (!this.size) return null;
    const removed = this.head;
    this.head = this.head.next;
    this.size--;
    return removed.value;
  }
}

let input = require("fs").readFileSync(file).toString().trim().split("\n");
const [rowLen, colLen] = input
  .shift()
  .split(" ")
  .map((e) => parseInt(e));
// 이차배열 input정리
const board = input.map((row) => row.split(" ").map((col) => Number(col)));
let answer = 0;

for (let r = 0; r < rowLen; r++) {
  for (let c = 0; c < colLen; c++) {
    if (board[r][c] === 0) {
      const newBoard = board.map((r) => [...r]);
      newBoard[r][c] = 0;
      const currSafeD = getSafeDistance(r, c, newBoard);
      answer = Math.max(answer, currSafeD);
    }
  }
}

function getSafeDistance(r, c, board) {
  const dr = [-1, 0, 1, 0, 1, 1, -1, -1];
  const dc = [0, 1, 0, -1, 1, -1, 1, -1];
  const queue = new Queue();
  queue.enqueue({ r, c, d: 0 });

  while (queue.size) {
    const { r, c, d } = queue.dequeue();
    // 최단 안전거리 찾음
    if (board[r][c] === 1) {
      return d;
    }

    for (let i = 0; i < 8; i++) {
      const nextR = r + dr[i];
      const nextC = c + dc[i];

      if (nextR >= 0 && nextR < rowLen && nextC >= 0 && nextC < colLen) {
        queue.enqueue({ r: nextR, c: nextC, d: d + 1 });
      }
    }
  }
}

console.log(answer);
