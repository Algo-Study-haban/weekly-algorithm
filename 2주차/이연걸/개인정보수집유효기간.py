# 년 월 일 -> 일
def solution(today, terms, privacies):
    answer = []
    deadline = {}
    
    def convert(date):
        policy = ""
        y, m, d = date.split('.')
        if ' ' in d:
            d, policy = d[:2], d[3]
        y, m, d = int(y) - 2000, int(m), int(d)
        return (y*12*28) + (m*28) + d, policy
    
    today, _ = convert(today)

    for term in terms:
        deadline[term[0]] = int(term[1:]) * 28
    for i, privacy in enumerate(privacies):
        date, policy = convert(privacy)
        if date + deadline[policy] <= today:
            answer.append(i+1)
    
    return answer
