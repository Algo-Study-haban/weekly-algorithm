n, w, L = map(int, input().split())
weights = list(map(int, input().split()))
 
bridge = [0] * w   
cur, time = 0, 0  
 
while bridge:
    time += 1

    if weights:
        if sum(bridge) + weights[0] <= L:
            bridge.append(weights[0])
            weights.pop(0)
        else:
            bridge.append(0)
print(time)