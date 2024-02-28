public class Main {
    public static void main(String[] args) {
        Q1 q1 = new Q1();

        String[] arr1 = {"muzi", "ryan", "frodo", "neo"};
        String[] arr2 = {"muzi frodo", "muzi frodo", "ryan muzi", "ryan muzi", "ryan muzi", "frodo muzi", "frodo ryan", "neo muzi"};

        System.out.println(q1.solution(arr1, arr2));
    }
}
