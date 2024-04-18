import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Stack;

public class Q1725 {
    static int N;
    static int[] arr;

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        N =  Integer.parseInt(br.readLine());
        arr = new int[N + 2];

        for(int i = 1; i < N + 1; i++) {
            arr[i] = Integer.parseInt(br.readLine());
        }

        // 인덱스 저장할 스택
        Stack<Integer> stack = new Stack<>();

        // 제일 처음 0을 넣어줌
        stack.push(0);

        int answer =0;

        for(int i = 1; i < N + 2; i++) {
            while(!stack.isEmpty()) {
                int top = stack.peek();

                // 새로 들어온 직사각형의 높이가 더 큰 경우 아래 연산 패스
                if(arr[top] <= arr[i]) {
                    break;
                }

                // 새로 들어온 직사각형의 높이가 더 작으면 앞의것은 이제 계산할 필요 없어서 제거해줌
                stack.pop();

                // 이전 직사각형 높이가 더 큰 경우 큰 직사각형이 이전에 위치할 확률 높으니 넓이 구해줌
                answer = Math.max(answer, arr[top] * (i - stack.peek() - 1));
            }

            stack.push(i);
        }
        System.out.println(answer);
    }
}
