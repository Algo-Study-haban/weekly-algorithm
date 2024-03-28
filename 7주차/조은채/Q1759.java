import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.StringTokenizer;

public class Q1759 {
    static int l, s;
    static int[] ch;
    static String[] arr, pm;

    public boolean contain(){
        boolean flag = false;
        int cons = 0, vo = 0;

        for (String a : pm) {
            if (a.equals("a") || a.equals("i") || a.equals("u") || a.equals("e") || a.equals("o")){
                vo++;
            }else {
                cons++;
            }
        }

        if (cons >= 2 && vo >= 1){
            flag = true;
        }

        return flag;
    }

    public void DFS(int start, int L){
        if (L == l){
            if (contain()){
                for (String a : pm) {
                    System.out.print(a);
                }
                System.out.println();
            }
        }else {
            for (int i = start; i < s; i++) {
                pm[L] = arr[i];
                DFS(i + 1, L + 1);
            }
        }
    }

    public void q1759() throws IOException {
        BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        StringTokenizer st = new StringTokenizer(br.readLine(), " ");

        l = Integer.parseInt(st.nextToken());
        s = Integer.parseInt(st.nextToken());

        ch = new int[s];
        pm = new String[l];

        st = new StringTokenizer(br.readLine(), " ");

        int arrLen = st.countTokens();
        arr = new String[arrLen];

        for (int i = 0; i < arrLen; i++) {
            arr[i] = st.nextToken();
        }

        Arrays.sort(arr);

        DFS(0, 0);
    }
}
