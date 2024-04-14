def isPrime(n):
    if n <= 1:
        return False
    else:
        for i in range(2,n):
            if n%i == 0:
                return False
    return True
ls = []
round = int(input())
for i in range(round):
    n = int(input())
    if isPrime(n):
        # print("Is Prime")
        ls.append("Is Prime")
    else:
        # print("Not Prime")
        ls.append("Not Prime")
for i in ls:
    print(i)
# for i in range(1000):
#     if isPrime(i):
#         print(f"{i} : Is Prime")
    
