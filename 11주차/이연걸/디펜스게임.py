from heapq import heappush, heappop

def solution(n, k, enemy):
    # 4
    # 4 2
    # 4 4 2 -> 4 2
    # 5 4 2 -> 4 2
    # 4 3 2 -> 3 2
    # 3 3 2 -> 끝
    heap = []
    length, total = len(enemy), 0    
    for i in range(length):
        heappush(heap, enemy[i] * -1)
        total += enemy[i]
        
        if n < total:
            if k > 0:
                total -= heappop(heap) * -1
                k -= 1
            else:
                return i
    return length