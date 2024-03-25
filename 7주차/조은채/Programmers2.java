public class Programmers2 {
    public int solution(String name) {
        int answer = 0;

        // 맨 오른쪽으로 간 횟수
        int move = name.length() - 1;

        int index;

        for (int i = 0; i < name.length(); i++) {
            answer += Math.min(name.charAt(i) - 'A', 'Z' - name.charAt(i) + 1);

            index = i + 1;

            // 연속되는 A 갯수 확인
            while (index < name.length() - 1 && name.charAt(index) == 'A') {
                index++;
            }

            // 순서대로 가는 것과, 뒤로 돌아가는 것 중 이동수가 적은 것을 선택
            move = Math.min(move, i * 2 + (name.length() - index));
            // 처음부터 뒤 먼저 입력 하는 경우 고려
            move = Math.min(move, (name.length() - index) * 2 + i);
            }

        return answer;
    }
}
