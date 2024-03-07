n = int(input())
formula = input()

nums, ops = [], []
for i, f in enumerate(formula):
    if i % 2 == 0: nums.append(int(f))
    else: ops.append(f)





def cal(n1, n2, op):
    if op == '*':
        return n1 * n2
    if op == '+':
        return n1 + n2
    if op == '-':
        return n1 + n2
    
def dfs(index, result):
    if index == n - 1:
        answer = max(answer, result)
        return
    
    if index + 2 < n:
        dfs()
    if index + 4 < n:
        dfs(inde)

dfs(0, int(formula[0]))
print(answer)
