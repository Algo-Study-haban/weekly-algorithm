import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Q14889 {
    static int N, diff = Integer.MAX_VALUE;
    static int[][] team;

    static boolean[] combi;

    public static void DFS(int Depth, int num){
        if (Depth == (N / 2)){    // 조합 구했을 경우
            findMin(combi);
        }else{
            for (int i = num; i < N ; i++) {
                combi[i] = true;

                DFS(Depth + 1, i + 1);
                combi[i] = false;
            }
        }
    }

    public static void findMin(boolean[] combi){
        int start = 0, link = 0;

        for (int i = 0; i < N; i++) {
            for (int j = i + 1; j < N; j++) {
                if (combi[i] && combi[j]){
                    start += team[i][j];
                    start += team[j][i];
                }else if (!combi[i] && !combi[j]){
                    link += team[i][j];
                    link += team[j][i];
                }
            }
        }

        diff = Math.min(diff, Math.abs(start - link));
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        N = Integer.parseInt(br.readLine());
        team = new int[N][N];

        StringTokenizer st;

        combi = new boolean[N];

        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine());

            for (int j = 0; j < N; j++) {
                team[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        DFS(0, 0);

        System.out.println(diff);
    }
}
