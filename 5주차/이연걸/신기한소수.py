import sys
import math
sys.setrecursionlimit(10000)

def is_prime(n):
    for i in range(2, int(math.sqrt(n) + 1)):
        if n % i == 0: return False
    return True

def dfs(n):
    if len(str(n)) == N: print(n)
    else:
        for i in range(1, 10, 2):
            if is_prime(n * 10 + i): dfs(n * 10 + i)

N = int(input())
for i in [2, 3, 5, 7]: dfs(i)

# import sys
# import math
# sys.setrecursionlimit(1000000)

# def is_prime(n):
#     for i in range(2, int(math.sqrt(n) + 1)):
#         if n % i == 0: return False
#     return True

# def dfs(n):
#     if str(n)[0] != '2' and str(n)[0] != '3' and str(n)[0] != '5' and str(n)[0] != '7': return False
#     if len(str(n)) == 1: return True
#     return is_prime(n) and dfs(n // 10)

# n = int(input())
# min_n, max_n = (10 ** (n-1)) * 2 + 1, 10 ** n
# nums = [i for i in range(min_n, max_n, 2) if dfs(i)]
# for num in nums:
#     print(num)