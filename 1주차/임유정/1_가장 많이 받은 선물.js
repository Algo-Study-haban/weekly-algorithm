// https://school.programmers.co.kr/learn/courses/30/lessons/258712
// 다음달에 선물 최대 많이 받은 사람
// 주고받은적 있음 더 많이 준 사람이 받음
// 주고받은적 없거나 같으면 선물지수가 더 큰사람이 받음
// 선물지수: 준 선물-받은선물
// 선물지수도 같으면 암것도 안 함

function solution(friends, gifts) {
  const obj = {};
  const points = {};
  const answer = {};

  friends.forEach((myName) => {
    const myFriends = friends.filter((e) => e !== myName);
    const relation = {};
    myFriends.forEach((e) => {
      relation[e] = 0;
    });
    obj[myName] = {
      gave: { ...relation }, // ...
      got: { ...relation },
    };
  });

  gifts.forEach((gift) => {
    const [from, to] = gift.split(" ");
    obj[from]["gave"][to]++;
    obj[to]["got"][from]++;
  });

  for (const [name, history] of Object.entries(obj)) {
    const { gave, got } = history;
    const gaveCount = getCount(gave);
    const gotCount = getCount(got);
    points[name] = gaveCount - gotCount;
  }
  // console.log(obj, points)
  console.log(friends);

  for (let i = 0; i < friends.length - 1; i++) {
    const person1 = friends[i];
    for (let j = i + 1; j < friends.length; j++) {
      const person2 = friends[j];

      const person1GaveCount = obj[person1].gave[person2];
      const person2GaveCount = obj[person2].gave[person1];

      if (person1GaveCount > person2GaveCount) {
        answer[person1] = (answer[person1] || 0) + 1;
      } else if (person1GaveCount < person2GaveCount) {
        answer[person2] = (answer[person2] || 0) + 1;
      } else {
        const person1Point = points[person1];
        const person2Point = points[person2];

        if (person1Point > person2Point) {
          answer[person1] = (answer[person1] || 0) + 1;
        } else if (person1Point < person2Point) {
          answer[person2] = (answer[person2] || 0) + 1;
        }
      }
    }
  }
  if (!Object.keys(answer).length) return 0;
  return Math.max(...Object.values(answer));
}

function getCount(obj) {
  let result = 0;
  for (const [key, value] of Object.entries(obj)) {
    if (value) {
      result += value;
    }
  }
  return result;
}

function hasRelation(obj, person) {
  const { gave, got } = obj;
  // 주거나 받은 기록이 있음
  return gave[person] || got[person];
}
