// https://school.programmers.co.kr/learn/courses/30/lessons/72412

// target점수 이상의 점수 갯수 반환
function lowerBound(target, scoreArr) {
  let min = 0;
  let max = scoreArr.length - 1;

  while (min <= max) {
    const mid = Math.floor((min + max) / 2);

    if (scoreArr[mid] < target) {
      min = mid + 1;
    } else {
      max = mid - 1;
    }
  }
  return scoreArr.length - min;
}

function solution(info, query) {
  var answer = new Array(query.length).fill(0);
  const scoreObj = {}; // {조건: 점수배열}

  // 각info로 만들 수 있는 모든 경우를 hash로 만들어서 그룹별로 분류
  for (const i of info) {
    const [l, p, c, f, score] = i.split(" ");

    // language
    for (let aIndex = 0; aIndex < 2; aIndex++) {
      let language = "";
      if (aIndex === 0) language = l;
      else language = "-";

      // position
      for (let bIndex = 0; bIndex < 2; bIndex++) {
        let position = "";
        if (bIndex === 0) position = p;
        else position = "-";

        // career
        for (let cIndex = 0; cIndex < 2; cIndex++) {
          let career = "";
          if (cIndex === 0) career = c;
          else career = "-";

          // food
          for (let dIndex = 0; dIndex < 2; dIndex++) {
            let food = "";
            if (dIndex === 0) food = f;
            else food = "-";

            // scoreObj에 각 경우에 대한 점수추가
            const key = [language, position, career, food].join(" ");
            const numScore = parseInt(score);
            if (scoreObj[key]) {
              scoreObj[key].push(numScore);
              // scoreObj[key].sort((a, b) => a - b); // 점수 오름차순 정렬
            } else {
              scoreObj[key] = [numScore];
            }
          }
        }
      }
    }
  }

  // hash를 만든후에 sort
  for (const [key, value] of Object.entries(scoreObj)) {
    scoreObj[key].sort((a, b) => a - b); // 점수 오름차순 정렬
  }

  for (let i = 0; i < query.length; i++) {
    const regex = /\sand\s|\s/;
    const [l, p, c, f, targetScore] = query[i].split(regex);
    const key = [l, p, c, f].join(" ");

    // scoreObj에 존재하지 않는 조건이면 만족하는 갯수는 0개
    if (scoreObj[key] && scoreObj[key].length) {
      answer[i] = lowerBound(targetScore, scoreObj[key]);
    }
  }
  return answer;
}
