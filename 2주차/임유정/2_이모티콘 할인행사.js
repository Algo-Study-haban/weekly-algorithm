// https://school.programmers.co.kr/learn/courses/30/lessons/150368
// 목표: 서비스 가입자 최대, 판매액 최대
// n명에게 m개를 할인판매
// 이모티콘마다 할인율은 10%, 20%, 30%, 40%
// 기대이상 할인하는 이모티콘은 모두 구매
// 구매비용 합이 일정가격 이상이면 구매를 모두 취소하고 서비스 가입
// 최대달성한 [가입자수, 매출액] 리턴

// 유저 최대 100명, 이모티콘 최대7개
// 정해진 조합: 7개 이모티콘의 할인율 조합갯수 = 4^7 = 16384
// 모든 조합마다 유저마다 이모지를 구매하는 비용 더한뒤 일정가격 이상이면 서비스가입으로 갈아타기

// 최대가입자가 목표니까 그냥 전부 가입하면 안됌?
// 가입자를 늘리려면 많이 사게해서 보유한 돈을 넘어야함 => 실제할인율이 기대할인율보다 높아야함 (40%할인하면 더 많은 사람들이 구매함)
// => 보유한 돈을 넘는 선에서 가장 높은 할인율
// 즉 최소한으로 보유한 돈을 넘게 만드는 점을 찾아야함 => 이모티콘 가격이 높은건 상대적으로 크게 할인
// 기대할인율이 낮은순으로 정렬

// 완전탐색, 중복순열

function solution(users, emoticons) {
  var answer = [];
  let discounts = [10, 20, 30, 40];
  const minWishDiscount = Math.min(...users.map((user) => user[0])); // 모든 유저의 최소기대할인율
  discounts = discounts.filter((d) => d >= minWishDiscount); // 이모티콘 할인율은 유저의 최소 기대할인율보다 커야함 (최소 20%이상인데, 이모티콘이 10%할인하면 구매자없음)
  const cost = Array.from({ length: users.length }, () => 0); // 사용자마다 총구매가격

  function buyEmoji(currEmoji, cost) {
    // [탈출 조건] 이모지를 다 사면 끝
    if (currEmoji === emoticons.length) {
      let service = 0;
      let earnMoney = 0;
      // 사용자마다 현재 이모티콘 구매여부 결정
      for (let i = 0; i < users.length; i++) {
        const money = users[i][1];
        // 보유한 돈 이상을 소비해야하면 구매를 취소하고 서비스가입
        if (cost[i] >= money) {
          service++;
        } else {
          earnMoney += cost[i]; // 초과하지 않으면 그냥 구매
        }
      }
      answer.push([service, earnMoney]);
      return;
    }
    const currEmojiPrice = emoticons[currEmoji];
    // 각 할인율마다 유저의 현재이모티콘 구매여부 갱신
    for (const d of discounts) {
      const newCost = [...cost];

      for (let i = 0; i < users.length; i++) {
        const [wishDiscount, money] = users[i];
        // 현재할인율이 기대할인율보다 크거나 같으면 구매
        if (d >= wishDiscount) {
          newCost[i] += (currEmojiPrice * (100 - d)) / 100;
        }
      }
      buyEmoji(currEmoji + 1, newCost);
    }
  }
  buyEmoji(0, cost); // 첫번째 이모티콘부터 구매

  // 가입자수 최대로, 가입자수가 같으면 판매액 최대로 정렬
  return answer.sort((a, b) => {
    // 가입자 수가 같을 때
    if (a[0] === b[0]) {
      return b[1] - a[1];
    }
    return b[0] - a[0];
  })[0];
}
