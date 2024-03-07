T = int(input())
for _ in range(T):
    str = input()
    stack, vps = [], True
    for c in str:
        if c == '(':
            stack.append(c)
        elif len(stack) == 0:
            vps = False
            break
        else:
            stack.pop()

    if vps and len(stack) == 0: print("YES")
    else: print("NO")
