from collections import deque


def solution(queue1, queue2):
    queue1 = deque(queue1)
    queue2 = deque(queue2)

    q1_sum = sum(queue1)
    q2_sum = sum(queue2)

    # 두 큐의 합이 홀수면 불가능
    if q1_sum + q2_sum % 2 == 1:
        return -1

    limit = len(queue1) + len(queue2)

    count = 0

    while q1_sum != q2_sum:
        if count >= limit:
            return -1

        while queue2 and q1_sum < q2_sum:
            tmp_queue2 = queue2.popleft()
            queue1.append(tmp_queue2)
            count += 1
            q2_sum -= tmp_queue2
            q1_sum += tmp_queue2

        while queue1 and q1_sum > q2_sum:
            tmp_queue1 = queue1.popleft()
            queue2.append(tmp_queue1)
            count += 1
            q1_sum -= tmp_queue1
            q2_sum += tmp_queue1

    return count
