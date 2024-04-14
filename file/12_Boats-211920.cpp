#include<iostream>
#include<algorithm>
#include<vector>

using namespace std;

bool myfun(int i , int j){return i > j;}
int main()
{
  int roundT,count = 0,roundB;
  vector<int>T,B;
  int tmp;
  cin >> roundT >> roundB;

  bool status = false;
  

  for(int i = 0 ; i < roundT ; i++)
  {
    cin >> tmp;
    T.push_back(tmp);
  }
  for(int i = 0 ; i < roundB ; i++)
  {
    cin >> tmp;
    B.push_back(tmp);
  }

  sort(T.begin() , T.end());
  sort(B.begin() , B.end());
  
  for(auto elementT : T)
  {
    for(auto elementB : B)
    {
      if(elementT >= elementB)
      {
        count++;
        B.erase(B.begin());
        break;
      }
      else
      {
        break;
      }
    }
  }


  cout << count << endl;

  return 0;
}
