import java.util.*;

public class Programmers2 {
    static int n, m;

    static boolean[][] visit;

    static int[] dx = {1, -1, 0, 0};
    static int[] dy = {0, 0, 1, -1};

    // y별로 뽑을 수 있는 석유의 양
    static int[] oil;

    public void BFS(int[][] land, int x, int y) {
        Queue<int[]> q = new LinkedList<>();
        q.offer(new int[]{x, y});
        visit[x][y] = true;

        int count = 1;

        // 석유가 지나가는 y열을 저장
        Set<Integer> set = new HashSet<>();

        while (!q.isEmpty()) {
            int[] tmp = q.poll();
            set.add(tmp[1]);

            for (int i = 0; i < 4; i++) {
                int nx = tmp[0] + dx[i];
                int ny = tmp[1] + dy[i];

                if (nx >= 0 && ny >= 0 && nx < n && ny < m && land[nx][ny] == 1 && visit[nx][ny] == false) {
                    q.add(new int[]{nx, ny});
                    visit[nx][ny] = true;
                    count += 1;
                }
            }
        }

        for (int index : set) {
            oil[index] += count;
        }
    }

    public int solution(int[][] land) {
        n = land.length;
        m = land[0].length;

        oil = new int[m];
        visit = new boolean[n][m];

        for(int i = 0; i < n; i++) {
            for(int j = 0; j < m; j++) {
                if(land[i][j] == 1 && !visit[i][j]) {
                    BFS(land, i, j);
                }
            }
        }

        // oil 배열에 저장된 값 중 가장 큰 값을 반환
        return Arrays.stream(oil).max().getAsInt();
    }
}
