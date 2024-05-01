import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Queue;

public class Q11559 {
    static int answer = 0;

    static int[] dx = {0, 1, 0, -1};
    static int[] dy = {1, 0, -1, 0};

    static char[][] field = new char[12][6];

    class Node{
        int x, y;

        Node(int x, int y){
            this.x = x;
            this.y = y;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        for (int i = 0; i < 12; i++) {
            String str = br.readLine();

            for (int j = 0; j < 6; j++) {
                field[i][j] = str.charAt(j);
            }
        }
    }
}
