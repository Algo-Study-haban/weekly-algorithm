import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.LinkedList;
import java.util.Queue;
import java.util.StringTokenizer;

public class Q16918 {
    static int time = 1;
    static int R, C, N;
    static char board[][];
    static int[][] check;

    static int[] dx = {1, 0, -1, 0};
    static int[] dy = {0, -1, 0, 1};
    static Queue<Bomb> q = new LinkedList<>();

    public static class Bomb{
        int x, y;

        public Bomb(int x, int y){
            this.x = x;
            this.y = y;
        }
    }

    public static void installBomb(){
        for (int i = 0; i < R; i++) {
            for (int j = 0; j < C; j++) {
                if (board[i][j] == '.'){
                    board[i][j] = 'O';
                    check[i][j] = time + 3;
                }
            }
        }
    }

    public static void BFS(){
        for (int i = 0; i < R; i++) {
            for (int j = 0; j < C; j++) {
                if (check[i][j] == time){
                    q.add(new Bomb(i, j));
                }
            }
        }

        while (!q.isEmpty()){
            Bomb tmp = q.poll();

            board[tmp.x][tmp.y] = '.';
            check[tmp.x][tmp.y] = 0;

            for (int i = 0; i < dx.length; i++) {
                int nx = tmp.x + dx[i];
                int ny = tmp.y + dy[i];

                if (nx >= 0 && ny >= 0 && nx < R && ny < C){
                    board[nx][ny] = '.';
                    check[nx][ny] = 0;
                }
            }
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine());

        R = Integer.parseInt(st.nextToken());
        C = Integer.parseInt(st.nextToken());
        N = Integer.parseInt(st.nextToken());

        board = new char[R][C];
        check = new int[R][C];

        for (int i = 0; i < R; i++) {
            String str = br.readLine();

            for (int j = 0; j < C; j++) {
                board[i][j] = str.charAt(j);

                if (str.charAt(j) == 'O'){
                    check[i][j] = 3;
                }
            }
        }

        while (time < N){
            time++;
            installBomb();

            if (time == N){
                break;
            }

            time++;
            BFS();
        }
        print();
    }

    public static void print(){
        for (int i = 0; i < R; i++) {
            for (int j = 0; j < C; j++) {
                System.out.print(board[i][j]);
            }
            System.out.println();
        }
    }
}

/*
* 0     1      2      3      4       5
* 000   000    222    101     22     xxx
* 030   020    212    000     22     x1x
* 000   000    222    101
* */