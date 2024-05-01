import java.util.Collections;
import java.util.PriorityQueue;

public class Programmers2 {
    public static int solution(int n, int k, int[] enemy) {
        int answer = 0;

        PriorityQueue<Integer> q = new PriorityQueue<>(Collections.reverseOrder());

        for(int i = 0; i < enemy.length; i++){
            q.offer(enemy[i]);

            n -= enemy[i];

            if(n < 0){
                if (k > 0){
                    n += q.poll();

                    k--;
                }else{
                    answer = i;
                    break;
                }
            }
        }
        return answer;
    }

    public static void main(String[] args) {
        int[] ene = {4, 2, 4, 5, 3, 3, 1};
        System.out.println(solution(7, 3, ene));
    }
}
