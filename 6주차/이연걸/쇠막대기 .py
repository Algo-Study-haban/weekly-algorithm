stick = input()

answer, stack = 0, []

prev_s = 0
for s in stick:
    if s == '(':
        stack.append(s)
    elif prev_s == '(':
        answer += (len(stack) - 1)
        stack.pop()
    elif prev_s == ')':
        answer += 1
        stack.pop()
    prev_s = s

print(answer)
