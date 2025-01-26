#include<iostream>

using namespace std;

int main() {
    unsigned long long int t;
    cin >> t;
    unsigned long long int maxTree = 0;
    unsigned long long int n , k;
    for(int i = 0 ; i < t ; i++) {
        cin >> n >> k;
        if(maxTree < n*k) {
            maxTree = n*k;
        }
    }
    cout << maxTree << "\n";
}