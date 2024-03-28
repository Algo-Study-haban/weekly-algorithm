answer = 0
N, L = map(int, input().split())
mmap = []
for _ in range(N): mmap.append(list(map(int, input().split())))

def check(line):
    vis = [False] * N
    for i in range(1, N):
        if abs(line[i] - line[i-1]) > 1: return False

        if line[i] < line[i-1]:
            for j in range(L):
                if i + j >= N or vis[i + j] or line[i] != line[i + j]:
                    return False
                
                if line[i] == line[i + j]:
                    vis[i + j] = True

        elif line[i] > line[i - 1]:
            for j in range(L):
                if i -j -1 < 0 or vis[i -j -1] or line[i -1] != line[i -j -1]:
                    return False
                
                if line[i -1] == line[i -j -1]:
                    vis[i -j -1] = True

    return True

for i in range(N):
    if check(mmap[i]): answer += 1
    if check([mmap[j][i] for j in range(N)]): answer += 1

print(answer)