public class Q3 {
    public long solution(int cap, int n, int[] deliveries, int[] pickups) {
        long answer = 0;

        int del = 0, pick = 0;  // 배달량, 수거량

        for (int i = n - 1; i >= 0; i--) {  // 제일 먼 곳 부터 배달/수거
            del += deliveries[i];
            pick += pickups[i];

            while (del > 0 || pick > 0){    // 제일 먼 곳의 배달/수거량이 0이 될때까지
                del -= cap;                 // 트럭의 최대 적재량 빼줌
                pick -= cap;

                answer += (i + 1) * 2;      // 왕복 거리 더해줌
            }
        }

        return answer;
    }
}
