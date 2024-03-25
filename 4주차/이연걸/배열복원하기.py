'''
h, w, x, y = map(int, input().split())

b = []
a = [[0] * (w) for _ in range(h)]
for i in range(h + x):
    b.append(list(map(int, input().split())))

for i in range(x):
    for j in range(w):
        a[i][j] = b[i][j]

for i in range(h, len(b)):
    for j in range(y, len(b[0])):
        a[i - x][j - y] = b[i][j]

for i in range(h):
    for j in range(w):
        print(a[i][j], end=' ')
    print()

1  2  3  4
5  6  7  8
9  10 11 12
13 14 15 16

0  0  0  0  0  0 
0  0  0  0  0  0
0  0  1  2  3  4
0  0  5  6  7  8
0  0  9  10 11 12
0  0  13 14 15 16

4 4 2 2
1  2  3  4  0  0 
5  6  7  8  0  0 
9  10 12 14 3  4
13 14 20 22 7  8
0  0  9  10 11 12
0  0  13 14 15 16
'''

h, w, x, y = map(int, input().split())
a, b = [[0] * w for _ in range(h)], []

for _ in range(h + x):
    b.append(list(map(int, input().split())))

for i in range(h):
    for j in range(w):
        a[i][j] = b[i][j]

for i in range(x, h):
    for j in range(y, w):
        a[i][j] = b[i][j] - a[i-x][j-y]

for i in range(h):
    for j in range(w):
        print(a[i][j], end=' ')
    print()