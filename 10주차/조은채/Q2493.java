import java.io.*;
import java.util.*;

public class Q2493 {
    static class Info{
        int order, height;

        Info(int order, int height){
            this.order = order;
            this.height = height;
        }
    }

    public static void main(String[] args) throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));

        int N = Integer.parseInt(br.readLine());

        StringTokenizer st = new StringTokenizer(br.readLine());

        Stack<Info> stack = new Stack<>();

        for (int i = 0; i < N; i++) {
            int tmp = Integer.parseInt(st.nextToken());

            if (stack.isEmpty()){
                stack.push(new Info(i + 1, tmp));

                System.out.print(0 + " ");
            }else {
                while (true){
                    if (stack.isEmpty()){
                        stack.push(new Info(i + 1, tmp));

                        System.out.print(0 + " ");

                        break;
                    }

                    if (stack.peek().height > tmp){
                        stack.add(new Info(i + 1, tmp));

                        System.out.print(stack.peek().order + " ");

                        break;
                    }else {
                        stack.pop();
                    }
                }
            }
        }
    }
}
