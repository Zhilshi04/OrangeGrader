#include <iostream>
#include<cmath>

using namespace std;

bool isPrime(int number)
{
    if(number <= 1)
    {
        return false;
    }
    for(int i = 2 ; i < sqrt(number) ; i++)
    {
        if(number%i == 0)
        {
            return false;
        }
    }
    return true;
}


int main() {
    int num;
    int round;
    cin >> round;
    string str[round];
    for(int i = 0 ; i < round ; i++)
    {
        cin >> num;
        if(isPrime(num))
        {
            // cout << "Is Prime"<<endl;
            str[i] = "Is Prime";
        }
        else
        {
            // cout << "Not Prime"<<endl;
            str[i] = "Not Prime";
        }
    }
    for(int i = 0 ; i < round ; i++)
    {
        cout << str[i] << endl;
    }
    return 0;
}
