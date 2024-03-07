from collections import deque
from itertools import combinations
import copy

virus, wall, safe = 0, 0, 0
board, empty_pos, virus_pos = [], [], []
directions = [(-1, 0), (1, 0), (0, 1), (0, -1)]
n, m = map(int, input().split())
for i in range(n):
    board.append(list(map(int, input().split())))
for i in range(n):
    for j in range(m):
        if board[i][j] == 0: empty_pos.append((i, j))
        if board[i][j] == 1: wall += 1
        if board[i][j] == 2:
            virus_pos.append((i, j))
            virus += 1
total, wall = n * m, wall + 3

def bfs(board):
    infected = 0
    dq = deque()
    for v in virus_pos:
        dq.append(v)
        infected += 1

    while dq:
        x, y = dq.popleft()
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if nx < 0 or ny < 0 or nx >= n or ny >= m: continue
            if board[nx][ny] != 0: continue
            infected += 1
            dq.append((nx, ny))
            board[nx][ny] = 2
    return infected

def get_infected_cnt(wall_pos, board):
    for wx, wy in wall_pos:
        board[wx][wy] = 1
    return bfs(board)

for wall_pos in combinations(empty_pos, 3):
    safe = max(safe, total - wall - get_infected_cnt(wall_pos, copy.deepcopy(board)))   

print(safe)