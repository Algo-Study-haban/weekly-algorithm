// https://school.programmers.co.kr/learn/courses/30/lessons/148653

// 절대값이 10^c
// 누르면 현재충수 + 버튼값으로 이동
// 0보다 작으면 움직이지 않음
// 버튼 한번에 마법돌1개
// 0층으로 가는데 필요한 최소버튼

// 큰수 => 규칙 => 자릿수마다
// 5이하는 그수 만큼 추가
// 5초과는 10-그 수 만큼 추가
function solution(storey) {
  var answer = 0;
  while (storey > 0) {
    const digit = storey % 10;
    storey = Math.floor(storey / 10);

    if (digit < 5) {
      answer += digit;
    } else if (digit > 5) {
      answer += 10 - digit;
      storey += 1;
    } else {
      // 5일때는 그 윗 자릿수를 확인
      answer += digit;
      if (storey % 10 >= 5) {
        storey += 1;
      }
    }
  }
  return answer;
}
