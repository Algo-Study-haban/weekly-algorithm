def solution(cap, n, deliveries, pickups):
    answer = 0        
    
    for i in range(n-1, -1, -1):
        if deliveries[i] != 0: break
        deliveries.pop()
    for i in range(n-1, -1, -1):
        if pickups[i] != 0: break
        pickups.pop()
    
    while deliveries or pickups:
        answer += max(len(deliveries), len(pickups)) * 2
        
        d_cap, p_cap = cap, cap
        while deliveries:
            if deliveries[-1] <= d_cap:
                d_cap -= deliveries.pop()
            else:
                deliveries[-1] -= d_cap
                break
        while pickups:
            if pickups[-1] <= p_cap:
                p_cap -= pickups.pop()
            else:
                pickups[-1] -= p_cap
                break
        
    return answer
        