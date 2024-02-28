import java.util.*;

public class Q1 {
    public int solution(String[] friends, String[] gifts) {
        int answer = 0;

        HashMap<String, Integer> map = new HashMap<>(); // 이름을 해쉬맵 형태로 저장

        for (int i = 0; i < friends.length; i++) {
            map.put(friends[i], i);
        }

        int[][] kakao = new int[friends.length][friends.length];    // 주고받은 선물
        int[] gitfScore = new int[friends.length];                  // 선물지수

        for (int i = 0; i < gifts.length; i++) {
            StringTokenizer st = new StringTokenizer(gifts[i], " ");    // gifts 이름 나눠서 저장

            String name1 = st.nextToken();
            String name2 = st.nextToken();

            // 주고받은 선물 표 작성
            kakao[map.get(name1)][map.get(name2)]++;

            // 선물지수 계산
            gitfScore[map.get(name1)]--;
            gitfScore[map.get(name2)]++;
        }

        for (int i = 0; i < friends.length; i++) {
            int temp = 0;   // map.get(i) 가 받을 선물

            for (int j = 0; j < friends.length; j++) {
                if (i == j){
                    continue;
                }else if ((kakao[i][j] > kakao[j][i]) || (kakao[i][j] == kakao[j][i] && gitfScore[i] > gitfScore[j])){  // 받을 선물 개수 계산
                    temp++;
                }
            }

            answer = Math.max(temp, answer);
        }

        return answer;
    }
}
