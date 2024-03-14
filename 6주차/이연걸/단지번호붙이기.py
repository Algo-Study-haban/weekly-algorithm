from collections import deque

dir = [(-1, 0), (1, 0), (0, 1), (0, -1)]
N = int(input())
answer, board = [], []
for _ in range(N):
    board.append(list(input()))

def bfs(i, j):
    dq = deque()
    board[i][j] = '2'
    dq.append((i, j))
    cnt = 1

    while dq:
        x, y = dq.popleft()
        for dx, dy in dir:
            nx, ny = x + dx, y + dy
            if nx < 0 or ny < 0 or nx >= N or ny >= N: continue
            if board[nx][ny] != '1': continue
            board[nx][ny] = '2'
            dq.append((nx, ny))
            cnt += 1
    return cnt

for i in range(N):
    for j in range(N):
        if board[i][j] == '1':
            answer.append(bfs(i, j))
print(len(answer))
for a in sorted(answer):
    print(a)