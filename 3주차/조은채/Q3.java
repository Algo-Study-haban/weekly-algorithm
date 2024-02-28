import java.util.Arrays;

public class Q3 {
    public int solution(int alp, int cop, int[][] problems) {
        int alpTarget = 0, copTarget = 0;

        // 목표 알고력, 코딩력 찾기
        for (int[] problem : problems) {
            alpTarget = Math.max(problem[0], alpTarget);
            copTarget = Math.max(problem[1], copTarget);
        }

        // 목표 알고력, 코딩력보다 이미 높은 알고력, 코딩력을 가진 경우 걸리는 시간 == 0
        if (alpTarget <= alp && copTarget <= cop){
            return 0;
        }

        // 런타임 오류 방지
        alp = Math.min(alp, alpTarget);
        cop = Math.min(cop, copTarget);

        int[][] dp = new int[alpTarget + 2][copTarget + 2];

        // 큰 값으로 dp 배열 초기화
        for (int[] arr :
                dp) {
            Arrays.fill(arr, Integer.MAX_VALUE);
        }

        // 시작 위치
        dp[alp][cop] = 0;

        for (int i = alp; i <= alpTarget; i++) {
            for (int j = cop; j <= copTarget; j++) {
                // 알고리즘 공부하여 알고력 1 높이는 경우
                dp[i + 1][j] = Math.min(dp[i + 1][j], dp[i][j] + 1);
                // 코딩 공부하여 코딩력 1 높이는 경우
                dp[i][j + 1] = Math.min(dp[i][j + 1], dp[i][j] + 1);

                // 문제를 푸는 경우
                for (int[] problem : problems) {
                    if (problem[0] <= i && problem[1] <= j){
                        // 목표 알고력, 코딩력을 넘겼을 경우
                        if (alpTarget < i + problem[2] && copTarget < j + problem[3]){
                            dp[alpTarget][copTarget] = Math.min(dp[alpTarget][copTarget], dp[i][j] + problem[4]);
                        }else if (alpTarget < i + problem[2]){  // 알고력이 목표치를 넘겼을 경우
                            dp[alpTarget][j + problem[3]] = Math.min(dp[alpTarget][j + problem[3]], dp[i][j] + problem[4]);
                        }else if (copTarget < j + problem[3]){  // 코딩력이 목표치를 넘겼을 경우
                            dp[i + problem[2]][copTarget] = Math.min(dp[i + problem[2]][copTarget], dp[i][j] + problem[4]);
                        }else if (alpTarget >= i + problem[2] && copTarget >= j + problem[3]){
                            dp[i + problem[2]][j + problem[3]] = Math.min(dp[i + problem[2]][j + problem[3]], dp[i][j] + problem[4]);
                        }
                    }
                }
            }
        }

        for (int[] arr :
                dp) {
            System.out.println(Arrays.toString(arr));
        }

        return dp[alpTarget][copTarget];
    }
}
