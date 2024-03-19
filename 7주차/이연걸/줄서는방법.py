# from itertools import permutations

# def solution(n, k):
#     cnt = 0
#     nums = [i for i in range(1, n + 1)]
    
#     for i in permutations(nums, n):
#         if cnt == k-1:
#             return i
#         cnt += 1

import math
 
def solution(n, k):
    nums = [i for i in range(1, n + 1)]
    answer = []
    
    while nums:
        a = (k - 1) // math.factorial(n - 1)
        answer.append(nums.pop(a))
        k = k % math.factorial(n - 1)
        n -= 1
        
    return answer