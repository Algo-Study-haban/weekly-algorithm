from heapq import heappush, heappop


def solution(n, paths, gates, summits):
    def dijstra(start):
        q = []
        heappush(q, (0, start))
        distance[start] = 0
        while q:
            dist, now = heappop(q)
            if distance[now] < dist:
                continue
            if now in summits:
                continue
            for i in graph[now]:
                if i[0] in gates:
                    continue
                cost = max(distance[now], i[1])
                if cost < distance[i[0]]:
                    distance[i[0]] = cost
                    heappush(q, (cost, i[0]))
        return distance

    summits.sort()
    summits = set(summits)
    gates = set(gates)

    answer = [0, 1e9]
    graph = [[] for _ in range(n + 1)]

    for i, j, w in paths:
        graph[i].append((j, w))
        graph[j].append((i, w))

    distance = [1e9] * (n + 1)

    for start in gates:
        dist = dijstra(start)

    for end in summits:
        if dist[end] < answer[1]:
            answer = [end, dist[end]]
        elif dist[end] == answer[1]:
            answer[0] = min(end, answer[0])
    return answer
