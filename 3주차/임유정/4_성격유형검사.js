// n개 질문, 7개 선택지
// 각 지표는 더 높은 점수, 같으면 사전순 빠른 순
function solution(survey, choices) {
  var answer = "";
  const type = [
    ["R", "T"],
    ["C", "F"],
    ["J", "M"],
    ["A", "N"],
  ];
  const scores = [3, 2, 1, 0, 1, 2, 3];
  const obj = {};

  // 얻은 점수 정리
  for (let i = 0; i < survey.length; i++) {
    const [first, second] = survey[i].split("");
    const choice = choices[i];
    // choice가 4미만일때 왼쪽인 first선택
    if (choice < 4) {
      obj[first] = (obj[first] || 0) + scores[choice - 1];
    }
    // choice가 4초과일때 오른쪽인 second선택
    else if (4 < choice) {
      obj[second] = (obj[second] || 0) + scores[choice - 1];
    }
  }
  // 각 지표마다 점수 비교
  for (const [first, second] of type) {
    if (!obj[second] || obj[first] > obj[second]) {
      answer += first;
    } else if (!obj[first] || obj[first] < obj[second]) {
      answer += second;
    }
    // 사전순
    else {
      answer += [first, second].sort()[0];
    }
  }
  return answer;
}
