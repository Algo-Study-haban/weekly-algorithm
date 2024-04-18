import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class Q17144 {
    static int R, C, T;
    static int cleaner = -1;    // -1로 주어짐
    static int[][] room;
    static Queue<DustInfo> dusts;
    static int[] dx = {1, 0, -1, 0};
    static int[] dy = {0, -1, 0, 1};

    static class DustInfo{
        int x, y, amount;

        public DustInfo(int x, int y, int amount){
            this.x = x;
            this.y = y;
            this.amount = amount;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        R = Integer.parseInt(st.nextToken());
        C = Integer.parseInt(st.nextToken());
        T = Integer.parseInt(st.nextToken());

        room = new int[R][C];

        for (int i = 0; i < R; i++) {
            st = new StringTokenizer(br.readLine(), " ");

            for (int j = 0; j < C; j++) {
                room[i][j] = Integer.parseInt(st.nextToken());

                if (room[i][j] == -1 && cleaner == -1){
                    cleaner = i;    // 처음 나오는 -1로 위치 저장
                }
            }
        }

        cleaning();
    }

    static void cleaning(){
        while (T-- > 0){
            BFS();
            moveDust();
        }

        System.out.println(answer());
    }

    static void BFS(){
        dusts = new LinkedList<>();

        for (int i = 0; i < R; i++) {
            for (int j = 0; j < C; j++) {
                if (room[i][j] >= 5){
                    dusts.add(new DustInfo(i, j, room[i][j]));
                }
            }
        }

        while (!dusts.isEmpty()){
            DustInfo tmp = dusts.poll();

            int spreadDust = tmp.amount / 5;
            int count = 0;

            for (int i = 0; i < dx.length; i++) {
                int nx = tmp.x + dx[i];
                int ny = tmp.y + dy[i];

                // 범위 넘거나 청정기 있는곳 패스
                if (nx < 0 || ny < 0 || nx >= R || ny >= C || room[nx][ny] == -1){
                    continue;
                }

                room[nx][ny] += spreadDust;
                count++;
            }

            room[tmp.x][tmp.y] -= spreadDust * count;
        }
    }

    static void moveDust(){
        int up = cleaner;
        int down = cleaner + 1;

        for (int i = up - 1; i > 0; i--) {  // 북 -> 남
            room[i][0] = room[i - 1][0];
        }

        for (int i = 0; i < C - 1; i++) {
            room[0][i] = room[0][i + 1];
        }

        for (int i = 0; i < up; i++) {
            room[i][C - 1] = room[i + 1][C -1];
        }

        for (int i = C - 1; i > 0; i--) {
            room[up][i] = room[up][i - 1];
        }

        room[up][1] = 0;    // 청정기에서 정화됨

        for (int i = down + 1; i < R - 1; i++) {
            room[i][0] = room[i + 1][0];
        }

        for (int i = 0; i < C - 1; i++) {
            room[R - 1][i] = room[R - 1][i + 1];
        }

        for (int i = R - 1; i > down; i--) {
            room[i][C - 1] = room[i - 1][C - 1];
        }

        for (int i = C - 1; i > 1; i--) {
            room[down][i] = room[down][i - 1];
        }

        room[down][1] = 0;  // 청정기에서 정화됨
    }

    static int answer(){
        int answer = 2; // 청정기 값 더해줌

        for (int i = 0; i < R; i++) {
            for (int j = 0; j < C; j++) {
                answer += room[i][j];
            }
        }
        return answer;
    }
}
