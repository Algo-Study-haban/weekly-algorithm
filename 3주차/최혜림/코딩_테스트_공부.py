def solution(alp, cop, problems):
    max_alp = max(prob[0] for prob in problems)
    max_cop = max(prob[1] for prob in problems)

    # dp[i][j] : (알고력 i, 코딩력 j) 상태에 도달하는 데 필요한 최단 시간
    # dp[초기 알고력][초기 코딩력] = 0으로 기저 사례를 잡고 나머지 DP 배열의 값은 무한(적당히 큰 값)으로 초기화
    dp = [[float("inf")] * (max_cop + 1) for _ in range(max_alp + 1)]

    alp = min(alp, max_alp)  # 둘중 하나라도 목표값을 넘어가면 안된다.
    cop = min(cop, max_cop)

    dp[alp][cop] = 0

    for i in range(alp, max_alp + 1):
        for j in range(cop, max_cop + 1):
            # 알고리즘을 공부하여 알고력을 1 높이는 경우
            if i < max_alp:
                dp[i + 1][j] = min(dp[i + 1][j], dp[i][j] + 1)
            # 코딩을 공부하여 코딩력을 1 높이는 경우
            if j < max_cop:
                dp[i][j + 1] = min(dp[i][j + 1], dp[i][j] + 1)

            # 문제 하나를 선택하여 알고력과 코딩력을 높이는 경우
            for alp_req, cop_req, alp_rwd, cop_rwd, cost in problems:
                if i >= alp_req and j >= cop_req:
                    new_i = min(i + alp_rwd, max_alp)
                    new_j = min(j + cop_rwd, max_cop)
                    dp[new_i][new_j] = min(dp[new_i][new_j], dp[i][j] + cost)

    print(dp)
    return dp[max_alp][max_cop]
