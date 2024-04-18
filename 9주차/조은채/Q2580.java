import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.StringTokenizer;

class Q2580{
    static int[][] sudoku = new int[9][9];

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        for (int i = 0; i < 9; i++) {
            StringTokenizer st = new StringTokenizer(br.readLine(), " ");

            for (int j = 0; j < 9; j++) {
                sudoku[i][j] = Integer.parseInt(st.nextToken());
            }
        }

        DFS(0, 0);
    }

    public static void DFS(int row, int col){
        if (col == 9){  // 한 줄의 끝일 경우 다음줄 실행
            DFS(row + 1, 0);

            return;
        }

        if (row == 9){
            StringBuilder sb = new StringBuilder();

            for (int i = 0; i < 9; i++) {
                for (int j = 0; j < 9; j++) {
                    sb.append(sudoku[i][j]).append(" ");
                }
                sb.append("\n");
            }
            System.out.println(sb);
            System.exit(0);
        }

        if (sudoku[row][col] == 0){
            for (int i = 1; i <= 9; i++) {
                if (check(row, col, i)){
                    sudoku[row][col] = i;

                    DFS(row, col + 1);
                }
            }
            sudoku[row][col] = 0;
            return;
        }

        DFS(row, col + 1);
    }

    public static boolean check(int row, int col, int num){
        for (int i = 0; i < 9; i++) {   // 행 검사
            if (sudoku[row][i] == num){
                return false;
            }
        }

        for (int i = 0; i < 9; i++) {   // 열 검사
            if (sudoku[i][col] == num){
                return false;
            }
        }

        // 3 x 3 칸 검사
        int boxRow = (row / 3) * 3;
        int boxCol = (col / 3) * 3;

        for (int i = boxRow; i < boxRow + 3; i++) {
            for (int j = boxCol; j < boxCol + 3; j++) {
                if (sudoku[i][j] == num){
                    return false;
                }
            }
        }

        return true;
    }
}