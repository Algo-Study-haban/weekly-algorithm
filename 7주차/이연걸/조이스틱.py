# # ABCDEFGHIJKLMNOPQRSTUVWXYZ
# def solution(name):
#     arr, N = [], len(name)
    
#     def up_down_cnt(n):
#         if n > 77: return 91 - n
#         return n - 65
#     def move_cursor(arr, cursor):
#         m_c, p_c = cursor, cursor
#         cnt = 0
#         while True:
#             if m_c == -1: m_c = N - 1
#             if p_c == N: p_c = 0
#             if m_c in arr:
#                 arr.remove(m_c)
#                 return cnt, m_c
#             if p_c in arr:
#                 arr.remove(p_c)
#                 return cnt, p_c
#             m_c, p_c = m_c - 1, p_c + 1
#             cnt += 1

#     for i, n in enumerate(name):
#         if n != 'A': arr.append(i)

#     answer, cursor = 0, 0
#     while arr:
#         cnt, cursor = move_cursor(arr, cursor)
#         up_down =  up_down_cnt(ord(name[cursor]))
#         answer += cnt + up_down

#     return answer

def solution(name):
    answer = 0
    N = len(name)

    for n in name:
        if (n != 'A'):
            up_down_cnt = min(ord(n) - ord('A'), ord('Z') - ord(n) + 1)
            answer += up_down_cnt
    
    move = N - 1 
    for left in range(N):
        # left: 왼쪽 끝에서 현재 인덱스까지 이동한 거리
        # right: 오른쪽 끝에서 이동한 거리
        # "ABAAAAAAAAABB" 일 때
        # left B == 1라면 
        # right 13 - 11 == 2
        
        idx = left + 1
        while (idx < N) and (name[idx] == 'A'): # right는 오른쪽 끝에서, left 오른쪽을 기준으로 처음 A가 아닌 알파벳의 위치만큼 빼줘야 한다!
            idx += 1
            
        right = N - idx
        back_distance = min(left, right) # 한쪽 방향으로 이동 후, 반대 방향으로 이동하는 최소거리
        print(left, right)
        
        move = min(move, left + right + back_distance)

    answer += move
    return answer