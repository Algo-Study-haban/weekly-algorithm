import sys

R, C = map(int, sys.stdin.readline().rstrip().split())
board = []
vis = {}
dir = [[-1, 0], [1, 0], [0, 1], [0, -1]]

for _ in range(R):
    board.append(list(sys.stdin.readline().rstrip()))

answer = 1
vis[board[0][0]] = True

def dfs(x, y, cnt):
    global answer
    answer = max(answer, cnt)

    for d in dir:
        nx, ny = nx, y + d[1]
        if 0 <= nx < R and 0 <= ny < C and not vis[board[nx][ny]]:
            vis[board[nx][ny]] = True
            dfs(nx, ny, cnt + 1)
            del vis[board[nx][ny]]

for i in range(26):
    vis[ord(65 + i)] = False
dfs(0, 0, 1)
print(answer)

'''
import sys

R, C = map(int, sys.stdin.readline().rstrip().split())
board = []
vis = {}
dir = [[-1, 0], [1, 0], [0, 1], [0, -1]]

for _ in range(R):
    board.append(list(sys.stdin.readline().rstrip()))

answer = 1
vis[board[0][0]] = True

def dfs(x, y, cnt):
    global answer
    answer = max(answer, cnt)

    for d in dir:
        if 0 <= x + d[0] < R and 0 <= y + d[1] < C and board[x + d[0]][y + d[1]] not in vis:
            vis[board[x + d[0]][y + d[1]]] = True
            dfs(x + d[0], y + d[1], cnt + 1)
            del vis[board[x + d[0]][y + d[1]]]

dfs(0, 0, 1)
print(answer)

'''



'''
import sys

R, C = map(int, sys.stdin.readline().rstrip().split())
board = []
vis = []
dir = ((-1, 0), (1, 0), (0, 1), (0, -1))

for _ in range(R):
    board.append(list(sys.stdin.readline().rstrip()))

answer = 1
vis.append(board[0][0])
# vis[board[0][0]] = True

def dfs(x, y, cnt):
    global answer
    answer = max(answer, cnt)

    for dx, dy in dir:
        nx, ny = x + dx, y + dy
        if nx < 0 or ny < 0 or nx >= R or ny >= C: continue
        if board[nx][ny] in vis: continue
        vis.append(board[nx][ny])
        # vis[board[nx][ny]] = True
        dfs(nx, ny, cnt + 1)
        vis.pop()
        # del vis[board[nx][ny]]

dfs(0, 0, 1)

print(answer)
'''