def isPrime(n):
    if(n < 1):
        return False
    for i in range(2,n):
        if(n%i == 0):
            return False
    return True
round = int(input())
for r in range(round):
    n = int(input())
    if(isPrime(n)):
        print("Is Prime")
    else:
        print("Not Prime")