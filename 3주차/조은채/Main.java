public class Main {
    public static void main(String[] args) {
        // 구현
        /*Q1 q1 = new Q1();
        String[] survey = {"RT", "RT", "RT"};
        int[] choices = {7, 5, 2};
        q1.solution(survey, choices);*/

        // 그리디
        /*Q2 q2 = new Q2();
        int[] queue1 = {3, 2, 7, 2};
        int[] queue2 = {4, 6, 5, 1};
        System.out.println(q2.solution(queue1, queue2));*/

        // DP
        Q3 q3 = new Q3();
        int alp = 0;
        int cop = 0;
        int[][] problems ={{0,0,2,1,2}, {4,5,3,1,2}, {4,11,4,0,2}, {10,4,0,4,2}};
        System.out.println(q3.solution(alp, cop, problems));

        // 다익스트라
        /*Q4 q4 = new Q4();
        int n = 6;
        int[][] paths = {{1, 2, 3}, {2, 3, 5}, {2, 4, 2}, {2, 5, 4}, {3, 4, 4}, {4, 5, 3}, {4, 6, 1}, {5, 6, 1}};
        int[] gates = {1, 3};
        int[] summits = {5};
        System.out.println(q4.solution(n, paths, gates, summits));*/
    }
}
