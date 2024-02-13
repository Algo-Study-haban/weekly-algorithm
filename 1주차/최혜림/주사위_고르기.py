from itertools import *


def solution(dice):
    # 주사위 세트를 굴릴 때 가능한 모든 결과를 생성하고 각 결과의 합 계산
    def simulate_dice_rolls(dice):
        results = []

        # 데카르트 곱: 공집합이 아닌 집합들로부터 새로운 집합 생성
        for rolls in product(*dice):
            results.append(sum(rolls))

        return sorted(results)

    # A의 총 승리 수 계산
    def count_winning_ways_A(results_A, results_B):
        wins = 0
        j = 0

        for x in results_A:
            while j < len(results_B) and results_B[j] < x:
                j += 1
            wins += j

        return wins

    dice_len = len(dice)
    group_size = dice_len // 2

    # 1. A가 가져갈 주사위 선택
    dice_combinations = combinations(range(1, dice_len + 1), group_size)

    max_wins = 0
    best_dice_combination = None

    # 2. 가져간 주사위를 굴린 결과 세는 부분
    for dice_indices_A in dice_combinations:
        # 전체 set {1, 2, 3, 4} 에서 A의 인덱스를 뺀 값
        dice_indices_B = tuple(set(range(1, dice_len + 1)) - set(dice_indices_A))

        results_A = simulate_dice_rolls([dice[i - 1] for i in dice_indices_A])
        results_B = simulate_dice_rolls([dice[i - 1] for i in dice_indices_B])

        wins = count_winning_ways_A(results_A, results_B)

        if wins > max_wins:
            max_wins = wins
            best_dice_combination = dice_indices_A

    return list(best_dice_combination)


dice = [[1, 2, 3, 4, 5, 6], [3, 3, 3, 3, 4, 4], [1, 3, 3, 4, 4, 4], [1, 1, 4, 4, 5, 5]]
print(solution(dice))