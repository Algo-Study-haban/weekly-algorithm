# 완전 탐색

from itertools import product

def solution(users, emoticons):
    answer = [0, 0]
    n = len(emoticons)
    
    def bf(discount):
        plus, price = 0, 0
        for rate, limit in users:
            cur_price = 0
            for i in range(n):
                if rate <= discount[i]:
                    cur_price += (emoticons[i] * (1 - discount[i] / 100))
                if limit <= cur_price:
                    plus += 1
                    cur_price = 0
                    break
            price += cur_price
        return [plus, price]
            
    for discount in product([10, 20, 30, 40], repeat=n):
        plus, price = bf(discount)
        if plus > answer[0]:
            answer = [plus, price]
        elif plus == answer[0] and price > answer[1]:
            answer = [plus, price]
    return answer