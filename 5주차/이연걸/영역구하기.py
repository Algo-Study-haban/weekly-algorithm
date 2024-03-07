from collections import deque
from copy import deepcopy

dir = [(-1, 0), (1, 0), (0, 1), (0, -1)]
M, N, K = map(int, input().split())

def dfs(board, i, j):
    space = 1
    dq = deque()
    board[i][j] = 2
    dq.append((i, j))

    while dq:
        x, y = dq.popleft()
        for dx, dy in dir:
            nx, ny = x + dx, y + dy
            if nx < 0 or ny < 0 or nx >= M or ny >= N: continue
            if board[nx][ny] != 0: continue
            board[nx][ny] = 2
            dq.append((nx, ny))
            space += 1
    return space

spaces, board = [], [[0 for _ in range(N)] for _ in range(M)]
for _ in range(K):
    x1, y1, x2, y2 = map(int, input().split())
    for i in range(x1, x2):
        for j in range(y1, y2): board[j][i] = 1

for i in range(M):
    for j in range(N):
        if board[i][j] == 0:
            spaces.append(dfs(board, i, j))

print(len(spaces))
for s in sorted(spaces):
    print(s)