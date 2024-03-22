import sys

R, C = map(int, sys.stdin.readline().rstrip().split())
board = []
vis = {}
dir = ((-1, 0), (1, 0), (0, 1), (0, -1))

for _ in range(R):
    board.append(list(sys.stdin.readline().rstrip()))

answer = 1
vis[board[0][0]] = True


def dfs(x, y, vis, cnt):
    global answer

    go = False
    for dx, dy in dir:
        nx, ny = x + dx, y + dy
        if nx < 0 or ny < 0 or nx >= R or ny >= C: continue
        if board[nx][ny] in vis: continue
        vis[board[nx][ny]] = True
        go = True
        dfs(nx, ny, vis, cnt + 1)
        vis.pop(board[nx][ny])

    if not go:
        answer = max(answer, cnt)

dfs(0, 0, vis, 1)


print(answer)