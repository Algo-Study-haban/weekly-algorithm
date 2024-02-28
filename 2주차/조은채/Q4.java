public class Q4 {
    static String[] dirsStr = {"d" , "l", "r", "u"};            // 사전순
    static int[][] dirs = {{1, 0}, {0, -1}, {0, 1}, {-1, 0}};   // 사전순에 맞춰 이동방향 저장
    static StringBuilder answer;
    static String result;
    static int endRow, endCol, mapRow, mapCol;

    /**
     * 이동한 거리 계산
     *
     * @param x : 출발 위치의 x 좌표
     * @param y : 출발 위치의 y 좌표
     * @param r : 탈출 위치의 x 좌표
     * @param c : 탈출 위치의 y 좌표
     * @return
     */
    private int distance(int x, int y, int r, int c) {
        return Math.abs(x - r) + Math.abs(y - c);
    }

    /**
     * DFS 이용한 거리 찾기
     *
     * @param row
     * @param col
     * @param depth
     * @param limit
     */
    private void dfs(int row, int col, int depth, int limit) {
        // 이동 경로가 k인 경로가 처음 만들어 졌을 때
        if (result != null) {
            return;
        }

        // 깊이 + 남은 거리가 k보다 클 때
        if (depth + distance(row, col, endRow, endCol) > limit) {
            return;
        }

        // 깊이가 k일 때
        if (limit == depth) {
            if (row == endRow && col == endCol) result = answer.toString();

            return;
        }

        // DFS 깊이 탐색 + 백트래킹
        for (int i = 0; i < dirs.length; i++) {
            int nRow = row + dirs[i][0];
            int nCol = col + dirs[i][1];
            if (nRow > 0 && nCol > 0 && nRow <= mapRow && nCol <= mapCol) {
                answer.append(dirsStr[i]);
                dfs(nRow, nCol, depth + 1, limit);
                answer.delete(depth, depth + 1);
            }
        }
    }

    public String solution(int n, int m, int x, int y, int r, int c, int k) {
        result = null;
        answer = new StringBuilder();
        mapRow = n;
        mapCol = m;
        endRow = r;
        endCol = c;

        // k 안에서 갈 수 있는지 판단
        int distance = distance(x, y, endRow, endCol);

        if (distance > k || (k - distance) % 2 == 1){
            return "impossible";
        }

        dfs(x, y, 0, k);
        //

        return result != null ? result : "impossible";
    }
}
