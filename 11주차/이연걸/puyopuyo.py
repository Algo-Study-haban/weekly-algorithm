from collections import deque

board = []
for _ in range(12):
    board.append(list(input()))

directions = [(1, 0), (0, -1), (0, 1), (-1, 0)]

def find(x, y):
    cnt = 1
    global board
    global vis

    c = board[x][y]
    log = []
    log.append((x, y))
    Q = deque()
    Q.append((x, y))
    vis[x][y] = True
    while Q:
        x, y = Q.popleft()
        for dx, dy in directions:
            nx, ny = x + dx, y + dy
            if nx < 0 or ny < 0 or nx >=12 or ny >=6: continue
            if board[nx][ny] == '.' or vis[nx][ny]: continue
            if board[nx][ny] != c: continue
            log.append((nx, ny))
            Q.append((nx, ny))
            vis[nx][ny] = True
            cnt += 1
    
    if cnt >= 4:
        return log
    return []

def remove(log):
    global board
    global vis

    for x, y in log:
        board[x][y] = '.'

def add():
    global board
    global vis

    down = deque()
    for i in range(5, -1, -1):
        for j in range(11, -1, -1):
            if board[j][i] != '.':
                down.append(board[j][i])
                board[j][i] = '.'

        j = 11
        while down:
            board[j][i] = down.popleft()
            j -= 1


answer = 0
while True:
    logs = []
    vis = [[False] * 6 for _ in range(12)]
    for i in range(11, -1, -1):
        for j in range(6):
            if board[i][j] != '.':
                log = find(i, j)
                if len(log) > 0:
                    logs.append(log)

    for log in logs:
        remove(log)

    if len(logs) > 0:
        add()
        answer += 1
    else: break
print(answer)
'''
......
......
......
......
......
......
......
......
......
......
RR..RR
RR..RR

=> 1
'''

'''
.....P
....GG
....GG
....GG
....GG
....GG
....GG
....GG
.Y..GG
.YG.GG
RRYGPP
RRYGGP

=> 3
'''

'''
R.....
R.....
G.....
Y.....
B.....
BR..Y.
BY..Y.
YGR.Y.
GYR.RR
GYRYRR
GBGGYY
GBGGYY

=> 4
'''