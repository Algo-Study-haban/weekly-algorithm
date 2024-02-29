import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class Main {
    public static void main(String[] args) throws IOException {
        // 구현
        //Q16967 q1 = new Q16967();
        //q1.q16967();

        // 아기상어2 : BFS
        //Q17086 q2 = new Q17086();
        //q2.q17086();

        // 트럭
        //Q13335 q3 = new Q13335();
        //q3.q13335();
    }
}

class Q16967{
    public void q16967() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        int H = Integer.parseInt(st.nextToken());
        int W = Integer.parseInt(st.nextToken());
        int X = Integer.parseInt(st.nextToken());
        int Y = Integer.parseInt(st.nextToken());

        int[][] arrB = new int[H + 1][W + 1];

        for (int i = 0; i < H + 1; i++) {
            st = new StringTokenizer(br.readLine(), " ");

            for (int j = 0; j < W + 1; j++) {
                arrB[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        int[][] arrA = new int[H][W];

        for (int i = 0; i < H; i++) {
            for (int j = 0; j < W; j++) {
                if (i - X < 0 || j - Y < 0){
                    arrA[i][j] = arrB[i][j];
                }else {
                    arrA[i][j] = arrB[i][j] - arrA[i - X][j - Y];
                }
            }
        }

        for (int i = 0; i < H; i++) {
            for (int j = 0; j < W; j++) {
                System.out.print(arrA[i][j] + " ");
            }
            System.out.println();
        }
    }
}

class Q17086{
    static class Point{
        private int x, y;

        Point(int x, int y){
            this.x = x;
            this.y = y;
        }
    }

    static int N, M;
    static int[][] arr, dis;
    static Queue<Point> q = new LinkedList<>();

    // 12시부터 시계방향
    static int[] dx = {0, 1, 1, 1, 0, -1, -1, -1};
    static int[] dy = {1, 1, 0, -1, -1, -1, 0, 1};

    public static void BFS(){
        while (!q.isEmpty()){
            // 현재위치
            Point tmp = q.poll();

            for (int i = 0; i < dx.length; i++) {
                int nx = tmp.x + dx[i];
                int ny = tmp.y + dy[i];

                // 인덱스 범위 안에서,                          상어가 없는곳이면서,     아직 들리지 않은 곳
                if (nx >= 0 && nx < N && ny >= 0 && ny < M && arr[nx][ny] == 0 && dis[nx][ny] == 0){
                    q.offer(new Point(nx, ny));

                    dis[nx][ny] = (dis[tmp.x][tmp.y] == Integer.MIN_VALUE) ? 1 : dis[tmp.x][tmp.y] + 1;
                }
            }
        }
    }

    public void q17086() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        N = Integer.parseInt(st.nextToken());
        M = Integer.parseInt(st.nextToken());

        arr = new int[N][M];
        dis = new int[N][M];

        for (int i = 0; i < N; i++) {
            st = new StringTokenizer(br.readLine(), " ");

            for (int j = 0; j < M; j++) {
                arr[i][j] = Integer.parseInt(st.nextToken());

                // 상어 있는 자리 저장
                if (arr[i][j] == 1){
                    q.offer(new Point(i, j));

                    dis[i][j] = Integer.MIN_VALUE;
                }
            }
        }

        BFS();

        int answer = Integer.MIN_VALUE;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < M; j++) {
                if (dis[i][j] > answer){
                    answer = dis[i][j];
                }
            }
        }

        System.out.println(answer);
    }
}

class Q13335{
    public void q13335() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        int n = Integer.parseInt(st.nextToken());
        int w = Integer.parseInt(st.nextToken());
        int L = Integer.parseInt(st.nextToken());

        Queue<Integer> q = new LinkedList<>();

        st = new StringTokenizer(br.readLine(), " ");

        for (int i = 0; i < n; i++) {
            q.offer(Integer.parseInt(st.nextToken()));
        }

        Queue<Integer> bridge = new LinkedList<>();
        for (int i = 0; i < w; i++) {
            bridge.offer(0);
        }

        int bridgeWeight = 0, time = 0;

        while (!q.isEmpty()){
            if (q.peek() + bridgeWeight - bridge.peek() <= L){  // 다음에 올라올 트럭 무게 + 현재 다리위 트럭 무게 확인 후 버틸 수 있으면
                time++;                         // 시간 1초 증가
                bridgeWeight -= bridge.poll();  // 다리 위 맨 앞 트럭 무게 빼주고 대기중에서도 빼줌
                bridge.offer(q.peek());         // q에서(대기중 트럭) 다리 위로 이동
                bridgeWeight += q.poll();       // 다리 위 무게에 더해줌
            }else {
                time++;
                bridgeWeight -= bridge.poll();
                bridge.offer(0);
            }
        }

        int maxIndex = 0;

        for (int i = 0; i < w; i++) {
            if (bridge.poll() != 0){
                maxIndex = i + 1;
            }
        }

        System.out.println(time + maxIndex);
    }
}


