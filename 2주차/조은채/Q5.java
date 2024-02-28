public class Q5 {
    private static int[] answer;

    /**
     * 이진트리로 표현 가능한지 판별
     *
     * @param number : 판별할 수
     * @return
     */
    private static boolean dfs(String number) {
        boolean valid = true;   // 판별 플래그

        int mid = (number.length() - 1) / 2;    // root의 index
        char root = number.charAt(mid);

        String left = number.substring(0,mid);
        String right = number.substring(mid + 1);

        // 부모 노드가 0일 경우 리프노드까지 모든 자식 노드는 1이면 안됨
        if(root == '0' && (left.charAt((left.length() - 1) / 2) =='1' || right.charAt((right.length() - 1) / 2) == '1')){
            return false;
        }

        if(left.length() >= 3) {
            valid = dfs(left);

            if(valid) {
                valid = dfs(right);
            }
        }
        return valid;
    }

    public int[] solution(long[] numbers) {
        answer = new int [numbers.length];

        // 받아온 numbers를 포화 이진트리로 만듦
        for(int i = 0; i < numbers.length; i++) {
            StringBuilder biNum = new StringBuilder(Long.toBinaryString(numbers[i]));

            int j = 0;

            while((int)Math.pow(2, j) - 1 < biNum.length()) {
                j++;
            }

            while((int)Math.pow(2, j) - 1 != biNum.length()) {
                biNum.insert(0, "0");
            }

            // 이진트리로 표현 가능한지 판별 후 answer에 담아줌
            if(dfs(biNum.toString())) {
                answer[i] = 1;
            }
        }
        return answer;
    }
}
