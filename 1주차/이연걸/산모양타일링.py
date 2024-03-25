def solution(n, tops):
    DIV = 10007
    dp = [[0, 0] for _ in range(n)]

    if tops[0] == 1:
        dp[0] = [3, 1]
    else:
        dp[0] = [2, 1]
    
    for i in range(1, n):
        if tops[i] == 1:
            # 
            dp[i][0] = ((dp[i-1][0] + dp[i-1][1]) * 2 + dp[i-1][0]) % DIV
            dp[i][1] = (dp[i-1][0] + dp[i-1][1]) % DIV
        else:
            dp[i][0] = (dp[i-1][0] * 2 + dp[i-1][1]) % DIV
            dp[i][1] = (dp[i-1][0] + dp[i-1][1]) % DIV

    return (dp[n-1][0] + dp[n-1][1]) % DIV

