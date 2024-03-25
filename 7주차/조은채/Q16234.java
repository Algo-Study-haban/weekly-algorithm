import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class Q16234 {
    public static class Point {
        int x;
        int y;

        public Point(int x, int y) {
            this.x = x;
            this.y = y;
        }
    }

    static int N, L, R;
    static int[][] board;
    static boolean[][] visited;

    static int[] dx = {0, 1, 0, -1};
    static int[] dy = {1, 0, -1, 0};

    // 인구 이동이 필요한 좌표 저장
    static ArrayList<Point> list;

    public void q16234() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        N = Integer.parseInt(st.nextToken());
        L = Integer.parseInt(st.nextToken());
        R = Integer.parseInt(st.nextToken());

        board = new int[N][N];

        for(int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine(), " ");

            for(int j = 0; j < N; j++) {
                board[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        System.out.println(move());
    }

    //더 이상 인구이동이 일어나지 않을 때까지 반복
    public static int move() {
        int day = 0;

        while(true) {
            boolean isMove = false;
            visited = new boolean[N][N];

            for(int i = 0; i < N; i++) {
                for(int j = 0; j < N; j++) {
                    if(!visited[i][j]) {
                        int sum = BFS(i, j); //bfs탐색으로 열릴 수 있는 국경선 확인 하며 인구 이동할 총 인구수 반환

                        if(list.size() > 1) {
                            changePopulation(sum);
                            isMove = true;
                        }
                    }
                }
            }

            if(!isMove) {
                return day;
            }

            day++;
        }
    }

    public static int BFS(int x, int y) {
        Queue<Point> q = new LinkedList<>();
        list = new ArrayList<>();

        q.offer(new Point(x, y));
        list.add(new Point(x, y));
        visited[x][y] = true;

        int sum = board[x][y];

        while(!q.isEmpty()) {
            Point temp = q.poll();

            for(int i = 0; i < 4; i++) {
                int nx = temp.x + dx[i];
                int ny = temp.y + dy[i];

                if(nx >= 0 && ny >= 0 && nx < N && ny < N && !visited[nx][ny]) {
                    int diff = Math.abs(board[temp.x][temp.y] - board[nx][ny]);

                    if(L <= diff && diff <= R) {
                        q.offer(new Point(nx, ny));
                        list.add(new Point(nx, ny));
                        sum += board[nx][ny];
                        visited[nx][ny] = true;
                    }
                }
            }
        }

        return sum;
    }

    // 이동 후 인구 변화 저장
    public static void changePopulation(int sum) {
        int avg = sum / list.size();

        for(Point p : list) {
            board[p.x][p.y] = avg;
        }
    }
}
