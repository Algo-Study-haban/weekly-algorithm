from heapq import heappush, heappop
from collections import defaultdict

def solution(N, road, K):
    answer = 0
    graph = defaultdict(list)
    for st, en, dist in road:
        graph[st].append([en, dist])
        graph[en].append([st, dist])

    def dijkstra():
        heap = []
        heappush(heap, [1, 0])
        weights = [1e9] * (N+1)
        weights[1] = 0

        while heap:
            node, wei = heappop(heap)
            if wei > weights[node]: continue

            for nxt_node, nxt_wei in graph[node]:
                tot_wei = wei + nxt_wei
                if weights[nxt_node] > tot_wei:
                    weights[nxt_node] = tot_wei
                    heappush(heap, [nxt_node, tot_wei])
        return weights

    distances = dijkstra()
    for dist in distances:
        if dist <= K:
            answer += 1
    return answer
