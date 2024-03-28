string = input()
exp = list(input())
exp_l = len(exp)

def stack_check(stack):
    sl = len(stack)
    
    for i in range(1, exp_l + 1):
        if stack[sl - i] != exp[exp_l - i]:
            return False
    return True

stack = []
for s in string:
    stack.append(s)

    if stack and stack[-1] == exp[-1] and stack_check(stack):
        for _ in range(exp_l):
            stack.pop()

if len(stack) == 0: print("FRULA")
else:
    for s in stack:
        print(s, end='')

# while exp in string:
#     string = string.replace(exp, '')

# if string == "":
#     print("FRULA")
# else:
#     print(string)