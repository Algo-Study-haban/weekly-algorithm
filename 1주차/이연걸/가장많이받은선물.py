from copy import deepcopy

def solution(friends, gifts):
    n = len(friends)
    answer = [0 for _ in range(n)]
    score = deepcopy(answer)
    table = [deepcopy(answer) for _ in range(n)]
    conv = {}
    
    for i in range(n):
        conv[friends[i]] = i
    
    for gift in gifts:
        s, r = gift.split(' ')
        table[conv[s]][conv[r]] += 1
        
    for i in range(n):
        for j in range(n):
            score[i] += (table[i][j] - table[j][i])
        
    for i in range(n):
        for j in range(n):
            sender, receiver = table[i][j], table[j][i]
            if sender == receiver and score[i] > score[j]:
                answer[i] += 1
            elif sender > receiver:
                answer[i] += 1
    return max(answer)