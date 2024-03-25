from bisect import bisect_left

def solution(info, query):
    answer, _dict = [], {}
    column = [['java', 'python', 'cpp'], ['backend', 'frontend'], ['junior', 'senior'], ['chicken', 'pizza']]
    
    def save(dep, item, _dict):
        if dep == 4:
            _dict.append(int(item[dep]))
            _dict.sort()
            return
        if item[dep] not in _dict:
            if dep != 3: _dict[item[dep]] = {}
            else: _dict[item[dep]] = []
        save(dep + 1, item, _dict[item[dep]])
    
    def find(dep, item, _dict):
        arr = item[dep]
        if dep == 4:
            target = int(arr[0])
            r_idx, l_idx = len(_dict), bisect_left(_dict, target)
            return r_idx - l_idx
        
        n = 0
        for a in arr:
            if a in _dict:
                n += find(dep + 1, item, _dict[a])
        return n
    
    for i in info:
        save(0, i.split(), _dict)
    for q in query:
        items = q.split()
        arr, idx = [], 0
        for item in items:
            if item == 'and': continue
            if item == '-': arr.append(column[idx])
            else: arr.append([item])
            idx += 1
        answer.append(find(0, arr, _dict))
        
    return answer
