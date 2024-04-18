public class Programmers1 {
    public int solution(int storey) {
        int answer = 0;

        while (storey > 0){
            int tmp = storey % 10;

            storey /= 10;

            if (tmp == 5){
                if (storey % 10 >= 5){
                    storey++;
                    answer += 10 - tmp;
                }else {
                    answer += tmp;
                }
            }else if (tmp > 5){
                storey++;
                answer += 10 - tmp;
            }else {
                answer += tmp;
            }
        }

        return answer;
    }
}
