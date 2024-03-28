import java.util.ArrayList;

public class Programmers1 {
    public int[] solution(int n, long k) {
        int[] answer = new int[n];

        ArrayList<Integer> list = new ArrayList<>();

        long factorial = 1;

        // 팩토리얼(총개수), 사람 리스트 구하기
        for (int i = 1; i <= n; i++) {
            factorial *= i;
            list.add(i);
        }

        // 인덱스를 맞추기 위해 k--
        k--;

        int index = 0;

        while(n > 0) {
            factorial /= n;

            int value = (int) (k / factorial);

            answer[index++] = list.get(value);
            list.remove(value);

            k %= factorial;

            n--;
        }

        return answer;
    }
}
