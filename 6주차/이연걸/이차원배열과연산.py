r, c, k = map(int, input().split())
answer = 0
A = []
for i in range(3):
    A.append(list(map(int, input().split())))

def R(A):
    newA = []
    max_len = 0
    for i, a in enumerate(A):
        if i > 100: break
        _dict = {}
        for j, n in enumerate(a):
            if j > 100: break
            if n == 0: continue
            if n in _dict: _dict[n] += 1
            else: _dict[n] = 1
        new_list = sorted(_dict.items(), key=lambda x: (x[1], x[0]))

        sub = []
        for j1, j2 in new_list:
            sub.append(j1)
            sub.append(j2)
        max_len = max(len(sub), max_len)
        newA.append(sub)
    for a in newA:
        for _ in range(max_len - len(a)): a.append(0)
    return newA


def C(A):
    tmpA = []
    max_len = 0
    for j in range(len(A[0])):
        if j > 100: break
        _dict = {}
        for i in range(len(A)):
            if i > 100: break
            if A[i][j] == 0: continue
            if A[i][j] in _dict: _dict[A[i][j]] += 1
            else: _dict[A[i][j]] = 1

        new_list = sorted(_dict.items(), key=lambda x: (x[1], x[0]))
        sub = []
        for j1, j2 in new_list:
            sub.append(j1)
            sub.append(j2)
        max_len = max(len(sub), max_len)
        tmpA.append(sub)
    for a in tmpA:
        for _ in range(max_len - len(a)): a.append(0)
    
    newA = list(map(list, zip(*tmpA)))
    return newA


while True:
    if len(A) >= r and len(A[0]) >= c and A[r-1][c-1] == k: break
    if len(A) < len(A[0]):
        A = C(A)
    else:
        A = R(A)
    answer += 1
    if answer > 100:
        answer = -1
        break

        
print(answer)
