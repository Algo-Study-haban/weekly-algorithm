// https://school.programmers.co.kr/learn/courses/30/lessons/150367
// 주어진 십진수로 만든 포화이진트리가 valid한지 리턴
// 0은 더미노드, 1은 노드를 나타낸다
// 포화이진트리를 만들기 위해 더미노드를 추가할 수 있다.
// 십진수로 변환해도 값이 유지되기 위해 이진수 앞에 0을 붙힌다

function solution(numbers) {
  var answer = [];
  numbers.forEach((num) => {
    // 이진수로 변경
    let binaryStr = num.toString(2); // 101010
    // 포화이진트리로 변경
    const len = binaryStr.length;
    const m = len.toString(2).length;
    const totalNodeCount = 2 ** m - 1;
    binaryStr = "0".repeat(totalNodeCount - len) + binaryStr;
    // valid한지 확인
    // left, right, 전체
    if (isValidTree(0, binaryStr.length - 1, binaryStr)) {
      answer.push(1);
    } else {
      answer.push(0);
    }
  });
  return answer;
}

function isValidTree(left, right, str) {
  // 리프노드
  if (left === right) {
    return true;
  }
  const parent = Math.floor((left + right) / 2);
  const leftChild = Math.floor((left + parent - 1) / 2);
  const rightChild = Math.floor((parent + 1 + right) / 2);

  // 부모가 0인데 자식이1인 경우는 invalid
  if (
    str[parent] === "0" &&
    (str[leftChild] === "1" || str[rightChild] === "1")
  ) {
    return false;
  }

  if (!isValidTree(left, parent - 1, str)) return false;
  if (!isValidTree(parent + 1, right, str)) return false;
  return true;
}
