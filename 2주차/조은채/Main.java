import java.util.Arrays;

public class Main {
    public static void main(String[] args) {
        /*
        Q1 q1 = new Q1();
        String today = "2020.01.01";
        String[] terms = {"Z 3", "D 5"};
        String[] privacies = {"2019.01.01 D", "2019.11.15 Z", "2019.08.02 D", "2019.07.01 D", "2018.12.28 Z"};
        q1.solution(today, terms, privacies);
        */

        //  DFS
        /*
        Q2 q2 = new Q2();
        int[][] users = {{40, 10000}, {25, 10000}};
        int[] emoticons = {7000, 9000};
        System.out.println(Arrays.toString(q2.solution(users, emoticons)));
        */


        /*  DP
        Q3 q3 = new Q3();
        int cap = 2, n = 7;
        int[] deliveries = {1, 0, 2, 0, 1, 0, 2};
        int[] pickups = {0, 2, 0, 1, 0, 2, 0};
        q3.solution(cap, n, deliveries, pickups);
        */

        // DFS
        /*
        Q4 q4 = new Q4();
        System.out.println(q4.solution(3, 4, 2, 3, 3, 1, 5));
        */

        // DFS
        Q5 q5 = new Q5();
        long[] numbers = {7, 42, 5};
        System.out.println(Arrays.toString(q5.solution(numbers)));
    }
}
