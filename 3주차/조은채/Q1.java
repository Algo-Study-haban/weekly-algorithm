import java.util.HashMap;

public class Q1 {
    public String solution(String[] survey, int[] choices) {
        String answer = "";

        HashMap<String, Integer> map = new HashMap<>();

        String[] mbti = {"R", "T", "C", "F", "J", "M", "A", "N"};

        for (String str :
                mbti) {
            map.put(str, 0);
        }

        for (int i = 0; i < survey.length; i++) {
            String a = survey[i].substring(0, 1);
            String b = survey[i].substring(1);

            if (choices[i] == 1){
                map.put(a, map.getOrDefault(a, 0) + 3);
            }else if (choices[i] == 2){
                map.put(a, map.getOrDefault(a, 0) + 2);
            }else if (choices[i] == 3){
                map.put(a, map.getOrDefault(a, 0) + 1);
            }else if (choices[i] == 5){
                map.put(b, map.getOrDefault(b, 0) + 1);
            }else if (choices[i] == 6){
                map.put(b, map.getOrDefault(b, 0) + 2);
            }else if (choices[i] == 7){
                map.put(b, map.getOrDefault(b, 0) + 3);
            }
        }

        answer += map.get("R") >= map.get("T") ? "R" : "T";
        answer += map.get("C") >= map.get("F") ? "C" : "F";
        answer += map.get("J") >= map.get("M") ? "J" : "M";
        answer += map.get("A") >= map.get("N") ? "A" : "N";

        return answer;
    }
}
