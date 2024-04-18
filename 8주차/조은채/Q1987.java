import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

public class Q1987 {
    int R, C;

    int[][] board;
    boolean[] check = new boolean[26];

    int[] dx = {1, 0, -1, 0};
    int[] dy = {0, 1, 0, -1};

    int answer = 0;

    public void DFS(int x, int y, int count){
        if (check[board[x][y]]){    // 방문한 적 있으면 최대값으로 갱신 후 리턴
            answer = Math.max(answer, count);

            return;
        }else {
            check[board[x][y]] = true;

            for (int i = 0; i < dx.length; i++) {
                int nx = x + dx[i];
                int ny = y + dy[i];

                if (nx >= 0 && nx < R && ny >= 0 && ny < C){
                    DFS(nx, ny, count + 1);
                }
            }

            // 다른 루트 탐색 위해 방문체크배열 초기화
            check[board[x][y]] = false;
        }
    }

    public void q1987() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        R = Integer.parseInt(st.nextToken());
        C = Integer.parseInt(st.nextToken());

        board = new int[R][C];

        for (int i = 0; i < R; i++) {
            String str = br.readLine();

            for (int j = 0; j < C; j++) {
                board[i][j] = str.charAt(j) - 'A';
            }
        }

        DFS(0, 0, 0);

        System.out.println(answer);
    }
}
