from collections import deque

T = int(input())

for _ in range(T):
    A, B = map(int, input().split())
    
    Q = deque()
    Q.append((A, ""))
    vis = [False] * 10000

    while Q:
        a, path = Q.popleft()
        vis[a] = True
        if a == B:
            print(path)
            break

        new_a = (2 * a) % 10000
        if not vis[new_a]:
            Q.append((new_a, path + "D"))
            vis[new_a] = True

        new_a = (a - 1) % 10000
        if not vis[new_a]:
            Q.append((new_a, path + "S"))
            vis[new_a] = True

        new_a = (10 * a + (a // 1000)) % 10000
        if not vis[new_a]:
            Q.append((new_a, path + "L"))
            vis[new_a] = True
        
        new_a = (a // 10 + (a % 10) * 1000) % 10000
        if not vis[new_a]:
            Q.append((new_a, path + "R"))
            vis[new_a] = True