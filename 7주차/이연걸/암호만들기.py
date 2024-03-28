L, C = map(int, input().split())
alphabets = list(input().split())
alphabets.sort()

def check(pw):
    consonant, vowel = 0, 0
    
    for c in pw:
        if c in ['a', 'e', 'i', 'o', 'u']: vowel += 1
        else: consonant += 1

    if vowel >= 1 and consonant >= 2: return True
    else: return False

def dfs(pw, idx):
    if len(pw) == L and check(pw):
        print(pw)
        return
    
    for i in range(idx, C):
        if alphabets[i] in pw: continue
        dfs(pw + alphabets[i], i + 1)


for i, c in enumerate(alphabets):
    dfs(c, i)