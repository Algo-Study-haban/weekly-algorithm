cur, east, south, west, north = (0, 0), (0, -1), (1, 0), (0, 1), (-1, 0)
n, m = map(int, input().split())
r, c, d = map(int, input().split())
board = []
active = True
answer = 0
for _ in range(n):
    board.append(list(map(int, input().split())))


def get_dir(d):
    if d == 0: return [cur, north, east, south, west]
    if d == 1: return [cur, east, south, west, north]
    if d == 2: return [cur, south, west, north, east]
    if d == 3: return [cur, west, north, east, south]

def dfs(x, y, d):
    global active, answer
    if not active: return
    wash = False
    if board[x][y] == 0:
        board[x][y] = 2
        answer += 1
    for dx, dy in get_dir(d):
        nx, ny = x + dx, y + dy
        if nx < 0 or ny < 0 or nx >= n or ny >= m: continue
        if board[nx][ny] != 0: continue
        d = (d + 1) % 4

        for i in range(n):
            print(board[i])
        print(d)
        
        wash = True
        dfs(nx, ny, d)
    
    if not wash:
        dx, dy = get_dir(d)[1]
        nx, ny = x + dx, y + dy
        if (nx < 0 or ny < 0 or nx >= n or ny >= m) or board[nx][ny] == 1:
            active = False
            return
        dfs(nx, ny, d)

print()
dfs(r, c, d)
for i in range(n):
    print(board[i])

print(answer)