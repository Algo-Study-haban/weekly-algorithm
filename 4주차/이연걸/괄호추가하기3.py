n = int(input())
formula = input()
answer = -1e9
def cal(n1, n2, op):
    if op == '*':
        return n1 * n2
    if op == '+':
        return n1 + n2
    if op == '-':
        return n1 + n2
    
def dfs(cur, result):
    if len(cur) == n:
        answer = max(answer, result)
        return
    
    if len(cur) < n:
        dfs()


dfs("", int(formula[0]))
print(answer)
