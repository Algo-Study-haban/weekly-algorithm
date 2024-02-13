from itertools import combinations, product
from bisect import bisect_left

def solution(dice):
    answer = []
    n = len(dice)
    tot = n//2
    max_win = 0
    dices = range(n)
    log = {}

    def summation(_dice, order):
        score = 0
        for i, j in zip(_dice, order):
            score += dice[i][j]
        return score

    for a in combinations(dices, tot):
        b = [x for x in dices if x not in a]
        
        a_score, b_score = [], []
        for order in product(range(6), repeat=tot):
            a_score.append(summation(a, order))
            b_score.append(summation(b, order))

        # ㄷㅗㅈㅓㅎㅣ ㅁㅗㄹㅡㄱㅔㅆㄷㅏ
        b_score.sort()
        win = 0
        
        for score in a_score:
            win += bisect_left(b_score, score)
        log[win] = a
        max_win = max(max_win, win)
        
    answer = sorted(log[max_win])
    return [i + 1 for i in answer]