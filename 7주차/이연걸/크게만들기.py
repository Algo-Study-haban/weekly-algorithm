N, K = map(int, input().split())
num = list(input().rstrip())
stack = []

for i in range(N):
    while K > 0 and stack and stack[-1] < num[i]:
        stack.pop()
        K -= 1
    stack.append(num[i])

while K != 0:
    stack.pop()
    K -= 1

for s in stack:
    print(s, end='')