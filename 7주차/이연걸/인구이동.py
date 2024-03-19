from collections import deque

dir = [(-1, 0), (1, 0), (0, 1), (0, -1)]
N, L, R = map(int, input().split())
country = []
for _ in range(N): country.append(list(map(int, input().split())))

def move(i, j, country, union):
    tot, log = 0, []
    dq = deque()
    dq.append((i, j))
    union[i][j] = True

    while dq:
        x, y = dq.popleft()
        log.append((x, y))
        tot += country[x][y]
        for dx, dy in dir:
            nx, ny = x + dx, y + dy
            if nx < 0 or ny < 0 or nx >= N or ny >= N: continue
            if abs(country[x][y] - country[nx][ny]) < L or abs(country[x][y] - country[nx][ny]) > R: continue
            if union[nx][ny]: continue
            dq.append((nx, ny))
            union[nx][ny] = True

    pop = tot // len(log)
    for x, y in log:
            country[x][y] = pop
    if len(log) == 1: return False
    else: return True

move_cnt = 0
while True:
    check = False
    union = [[False for _ in range(N)] for _ in range(N)]
    for i in range(N):
        for j in range(N):
            if not union[i][j] and move(i, j, country, union):
                check = True

    if not check: break
    else: move_cnt += 1

print(move_cnt)



# from collections import deque

# dir = [(-1, 0), (1, 0), (0, 1), (0, -1)]
# N, L, R = map(int, input().split())
# country = []
# for _ in range(N):
#     country.append(list(map(int, input().split())))
# union = [[0 for _ in range(N)] for _ in range(N)]

# def move(i, j, country, union, mark):
#     cnt = 0
#     tot, log = 0, []
#     dq = deque()
#     dq.append((i, j))

#     while dq:
#         x, y = dq.popleft()
#         log.append((x, y))
#         tot += country[x][y]
#         union[x][y] = mark
#         for dx, dy in dir:
#             nx, ny = x + dx, y + dy
#             if nx < 0 or ny < 0 or nx >= N or ny >= N: continue
#             if abs(country[x][y] - country[nx][ny]) < L or abs(country[x][y] - country[nx][ny]) > R: continue
#             if union[nx][ny] == mark: continue
#             dq.append((nx, ny))
#             union[nx][ny] = mark
#             cnt += 1

#     if i == 0 and j == 1:
#         print(country[i][j])

#     population = int(tot / len(log))
#     for x, y in log:
#         country[x][y] = population
#     if cnt != 0: return True
#     else: return False

# move, move_cnt = True, 1
# while move:
#     check = False
#     for i in range(N):
#         for j in range(N):
#             if move(i, j, country, union, move_cnt):
#                 move_cnt += 1
#                 check = True
#                 print(i, j)
#                 print(country)
#     if not check:
#         break
# print(move_cnt - 1)