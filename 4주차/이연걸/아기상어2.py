from collections import deque

dir = ((0, 1), (0, -1), (1, 0), (-1, 0), (1, 1), (-1, 1), (1, -1), (-1, -1))
n, m = map(int, input().split())
board, safe_dist = [], []
for i in range(n):
    board.append(list(map(int, input().split())))

def cal(i, j):
    dist = [[0] * m for _ in range(n)]
    dq = deque()
    dq.append((i, j))

    while dq:
        i, j = dq.popleft()
        for d in dir:
            ni, nj = i + d[0], j + d[1]
            if ni < 0 or nj < 0 or ni >= n or nj >= m: continue
            if dist[ni][nj] != 0: continue
            if board[ni][nj] == 1: return dist[i][j]
            dist[ni][nj] = dist[i][j] + 1
            dq.append((ni, nj))


for i in range(n):
    for j in range(m):
        if board[i][j] == 0: safe_dist.append(cal(i, j))

print(max(safe_dist) + 1)