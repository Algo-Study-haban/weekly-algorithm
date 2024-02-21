// https://school.programmers.co.kr/learn/courses/30/lessons/150370
// 1~n n개 개인정보
// 유효기간 후 파기
// 모든 달은 28일
// 파기해야할 번호를 리턴

// 날짜를 date 기준으로 변환하기
// privacies를 순회하며 끝나는 시각 구하기
// 이미 파기한 경우 answer에 추가

function solution(today, terms, privacies) {
  var answer = [];
  today = convertDate(today); // 오늘을 날짜단위로 변환
  const termObj = {};
  // term마다 달 정리
  terms.forEach((term) => {
    const [name, duration] = term.split(" ");
    termObj[name] = Number(duration);
  });
  // 개인정보당 현재날짜 기준 파기해야하는지 확인
  privacies.forEach((p, i) => {
    const [currDate, currTerm] = p.split(" ");
    const convertedCurrDate = convertDate(currDate);
    const lastDate = convertedCurrDate + termObj[currTerm] * 28; // 한달은 28일
    // 이미 파기해야하는 하는 경우
    if (lastDate <= today) {
      answer.push(i + 1);
    }
  });
  return answer;
}

// 날짜로 변환하는 함수
function convertDate(date) {
  const [y, m, d] = date.split(".");
  return Number(y) * 28 * 12 + Number(m) * 28 + Number(d);
}
