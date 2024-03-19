from heapq import heappush, heappop
def solution(operations):
    heap = []
    
    for op in operations:
        if op[0] == 'I':
            heappush(heap, int(op[2:]))
        elif len(heap) > 0 and op == "D -1":
            heappop(heap)
        elif len(heap) > 0 and op == "D 1":
            heap.pop()
    
    if len(heap) == 0:
        return [0, 0]
    return [max(heap), min(heap)]