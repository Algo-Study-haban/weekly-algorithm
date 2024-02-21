# def solution(alp, cop, problems):
#     ap, cp = 0, 0
#     n = len(problems)
    
#     dp = [0] * n # min time until problem i
#     if problems[0][0] > alp: ap += problems[0][0] - alp
#     if problems[0][1] > cop: cp += problems[0][1] - cop
#     dp[0] = max(ap, cp)
#     ap, cp = alp + dp[0], cop + dp[1]

#     def find_min_time(cut, xp, t, p):
#         a_cnt, c_cnt = 0, 0
#         while cut[0] > p[0] or cut[1] > p[1]:
#             if cut[0] > p[0]:
#                 p[0] += xp[0]
#                 a_cnt += 1
#             if cut[1] > p[1]:
#                 p[1] += xp[1]
#                 c_cnt += 1
#         return max(a_cnt, c_cnt) * t
    
#     for i in range(1, n):
#         _, _, prev_ap_xp, prev_cp_xp, prev_t = problems[i-1]
#         ap_cut, cp_cut, ap_xp, cp_xp, t = problems[i]
#         prev_sol = find_min_time([ap_cut, cp_cut], [prev_ap_xp, prev_cp_xp], prev_t, [ap, cp])
#         cur_sol = find_min_time([ap_cut, cp_cut], [ap_xp, cp_xp], t, [ap, cp])
#         dp[i] = dp[i-1] + min(prev_sol, cur_sol)
            
#     return dp[n-1]