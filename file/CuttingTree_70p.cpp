#include<iostream>

using namespace std;

int main() {
    int t;
    cin >> t;
    int maxTree = 0;
    int n , k;
    for(int i = 0 ; i < t ; i++) {
        cin >> n >> k;
        if(maxTree < n*k) {
            maxTree = n*k;
        }
    }
    cout << maxTree << "\n";
}