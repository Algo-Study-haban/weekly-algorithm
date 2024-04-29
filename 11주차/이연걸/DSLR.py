T = int(input())

def D(n):
    return (n * 2) % 10000

def S(n):
    if n == 0: return 9999
    return n - 1

def L(n):
    length = 10 ** (len(str(n)) - 1)
    sub = n // length 
    n -=  sub * length
    return (n * 10) + sub

def R(n):
    new_n, sub = n // 10, n % 10
    length = 10 ** len(str(new_n))
    return new_n + (sub * length)

def backtracking(n, B):
    
    pass

for _ in range(T):
    ans = ""
    A, B = map(int, input().split())
    lst_a, lst_b = sorted(list(map(int, str(A)))), sorted(list(map(int, str(B))))
    while lst_a != lst_b:
        A = D(A)
        ans += "D"
        lst_a = sorted(list(map(int, str(A))))

    backtracking(A, B)
    print(ans)
