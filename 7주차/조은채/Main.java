import java.io.IOException;
import java.util.Arrays;
import java.util.Stack;

public class Main {
    public static void main(String[] args) throws IOException {
        /*Programmers1 programmers1 = new Programmers1();
        System.out.println(Arrays.toString(programmers1.solution(3, 5)));*/

        /*Programmers2 programmers2 = new Programmers2();
        String name = "JAZ";
        programmers2.solution(name);*/

        /*Q1759 q = new Q1759();
        q.q1759();*/

        /*Q16234 q16234 = new Q16234();
        q16234.q16234();*/

        Solution solution = new Solution();
        solution.solution("10 20 Z 30");
    }


    static class Solution {
        public int solution(String s) {
            int answer = 0;

            String[] list = s.split(" ");

            Stack<Integer> stack = new Stack<>();

            for(int i = 0; i < list.length; i++){
                if (!list[i].equals("Z")){
                    stack.add(Integer.parseInt(list[i]));
                }else{
                    stack.pop();
                }
            }

            for(int a : stack){
                answer += a;
            }


            return answer;
        }
    }
}
