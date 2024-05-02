from collections import deque
import sys
n = int(sys.stdin.readline())
dq = deque()

for _ in range(n):
    cmd = sys.stdin.readline().split()
    if cmd[0] == "size":
        print(len(dq))
    elif cmd[0] == "empty":
        if not dq: print(1)
        else: print(0)
    elif cmd[0] == "front":
        if not dq: print(-1)
        else: print(dq[0])
    elif cmd[0] == "back":
        if not dq: print(-1)
        else: print(dq[-1])
    elif cmd[0] == "pop_front":
        if not dq: print(-1)
        else: print(dq.popleft())
    elif cmd[0] == "pop_back":
        if not dq: print(-1)
        else: print(dq.pop())
    else:
        if cmd[0] == "push_front":
            dq.appendleft(cmd[1])
        else:
            dq.append(cmd[1])