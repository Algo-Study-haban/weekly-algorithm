#include <string>
#include <vector>
#include <iostream>

using namespace std;


int solution(vector<int> queue1, vector<int> queue2) {
    unsigned long long total = 0, t1 = 0, t2 = 0;
    int cnt = -1, maxCnt = queue1.size() * 3, i1 = 0, i2 = 0;
    for (int i=0; i < queue1.size(); i++) {
        t1 += queue1[i];
        t2 += queue2[i];
    }
    total = t1 + t2;
    if (total & 1)
        return -1;
    while (cnt++ < maxCnt) {
        if (t1 > t2) {
            t1 -= queue1[i1];
            t2 += queue1[i1];
            queue2.push_back(queue1[i1++]);
        }
        else if (t1 < t2) {
            t2 -= queue2[i2];
            t1 += queue2[i2];
            queue1.push_back(queue2[i2++]);
        }
        else
            return cnt;
    }
    return -1;
}