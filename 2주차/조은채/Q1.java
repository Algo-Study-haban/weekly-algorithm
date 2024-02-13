import java.util.ArrayList;
import java.util.HashMap;
import java.util.StringTokenizer;

public class Q1 {
    public ArrayList<Integer> solution(String today, String[] terms, String[] privacies) {
        ArrayList<Integer> answer = new ArrayList<>();

        // . 을 구분자로 년, 월, 일 받아줌
        StringTokenizer st = new StringTokenizer(today, ".");

        int year = Integer.parseInt(st.nextToken());
        int month = Integer.parseInt(st.nextToken());
        int day = Integer.parseInt(st.nextToken());

        // hashMap에 약관 종류를 key 유효기간을 value 로 담아줌
        HashMap<String, Integer> map = new HashMap<>();

        for (int i = 0; i < terms.length; i++) {
            st = new StringTokenizer(terms[i], " ");

            map.put(st.nextToken(), Integer.parseInt(st.nextToken()));
        }

        for (int i = 0; i < privacies.length; i++) {
            // .과 공백문자를 구분자로 각 개인정보의 수집 일자와 약관 종류를 받아줌
            st = new StringTokenizer(privacies[i], ". ");

            int befoYear = Integer.parseInt(st.nextToken());
            int befoMonth = Integer.parseInt(st.nextToken());
            int befoDay = Integer.parseInt(st.nextToken());

            String befoTerm = st.nextToken();

            if (befoDay == 1){  // 개인정보 수집 일자가 1일일 경우
                befoDay = 28;   // 한달에 28일 있다고 가정되었기 때문

                befoMonth += map.get(befoTerm) % 12 - 1;    // 12로 나눈 나머지에서 -1 해준 만큼 더해줌
            }else {             // 개인정보 수집 일자가 1일이 아닐 경우
                befoDay--;      // 파기 일자 = 수집 일자 - 1

                befoMonth += map.get(befoTerm) % 12;        // 유효기간 전부 다 더해줌
            }

            befoYear += map.get(befoTerm) / 12;             // 12로 나눠 나온 몫 만큼 연도에 더해줌

            if (befoMonth > 12){                            // 다 계산한 월이 12 보다 크다면
                befoMonth -= 12;                            // -12 해주고
                befoYear++;                                 // 연도++ 해줌
            }

            // 오늘 날짜와 비교하여 유효기간 지난 번호들만 answer에 넣어줌
            if (befoYear < year){
                answer.add(i + 1);
            }else if(befoYear == year){
                if (befoMonth < month){
                    answer.add(i + 1);
                }else if (befoMonth == month){
                    if (befoDay < day){
                        answer.add(i + 1);
                    }
                }
            }
        }

        return answer;
    }
}
