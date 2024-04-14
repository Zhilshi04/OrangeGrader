#include<iostream>
#include<math.h>
using namespace std;

bool isPrime(int number)
{
    if (number <= 1)
    {
        return false;
    }
    else
    {
        for(int i = 2 ; i <= (sqrt(number));i++)
        {
            if(number%i == 0)
            {
                return false;
            }
        }
    }
    return true;
}

int main()
{
    int round , n;
    cin >> round;
    for (int i = 0 ; i < round ; i++)
    {
        cin >> n;
        if(isPrime(n))
        {
            cout << "Is Prime" << endl;
        }
        else
        {
            cout << "Not Prime" << endl;
        }
    }
    return 0;
}