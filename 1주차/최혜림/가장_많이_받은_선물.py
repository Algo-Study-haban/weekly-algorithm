def solution(friends, gifts):
    next_month_gift = {friend: 0 for friend in friends}

    all_gift = {}
    give_gift = {friend: 0 for friend in friends}
    receive_gift = {friend: 0 for friend in friends}
    gift_grade = {friend: 0 for friend in friends}

    # 모든 친구와의 선물 관계 0으로 초기화
    for friend in friends:
        all_gift[friend] = {
            other_friend: 0 for other_friend in friends if other_friend != friend
        }

    # 개인이 받은 선물과 준 선물 저장
    for gift in gifts:
        each_friend = gift.split()
        give_gift[each_friend[0]] += 1
        receive_gift[each_friend[1]] += 1
        # 모든 선물 주고 받은 관계 저장
        all_gift[each_friend[0]][each_friend[1]] += 1

    # 선물 지수 계산
    for key, value in give_gift.items():
        gift_grade[key] = value - receive_gift[key]

    # 모든 친구를 검사하며 조건 확인
    for i in range(len(friends)):
        for j in range(i + 1, len(friends)):
            if all_gift[friends[i]][friends[j]] > all_gift[friends[j]][friends[i]]:
                next_month_gift[friends[i]] += 1
            elif all_gift[friends[i]][friends[j]] < all_gift[friends[j]][friends[i]]:
                next_month_gift[friends[j]] += 1
            else:
                if gift_grade[friends[i]] > gift_grade[friends[j]]:
                    next_month_gift[friends[i]] += 1
                elif gift_grade[friends[i]] < gift_grade[friends[j]]:
                    next_month_gift[friends[j]] += 1

    answer = max(next_month_gift.values())

    return answer


friends = ["joy", "brad", "alessandro", "conan", "david"]
gifts = [
    "alessandro brad",
    "alessandro joy",
    "alessandro conan",
    "david alessandro",
    "alessandro david",
]

print(solution(friends, gifts))
