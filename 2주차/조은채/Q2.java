public class Q2 {
    private static final int[] RATE = {90, 80, 70, 60}; // ex) 10% 할인가 = 원가격 * 0.9

    /**
     * 할인율 배열 구하기
     *
     * @param emoticons : 이모티콘 정가를 담은 1차원 정수 배열
     * @param users : 사용자의 구매 기준을 담은 2차원 정수 배열
     * @param temp : 현재 할인율(인덱스 0 부터 시작)
     * @param rates : emoticons.length 크기의 1차원 정수 배열
     */
    private void dfs(int[] emoticons, int[][] users, int temp, int[] rates){
        if (temp == emoticons.length){   // 이모티콘 개수만큼 다 돌았으면 종료
            updateAnswer(emoticons, users, rates);

            return;
        }

        // 재귀 형식
        for (int rate : RATE){  // 할인율 배열 크기만큼 돌면서 할인율 설정
            rates[temp] = rate;

            dfs(emoticons, users, temp + 1, rates);
        }
    }

    private static int SIGN_UP = 0;     // 이모티콘 플러스 가입자 수
    private static int SALES_SUM = 0;   // 이모티콘 판매액

    /**
     * 정답 값 갱신
     *
     * @param emoticons : 이모티콘 정가를 담은 1차원 정수 배열
     * @param users : 사용자의 구매 기준을 담은 2차원 정수 배열
     * @param rates : 할인율을 담은 1차원 정수 배열
     */
    private void updateAnswer(int[] emoticons, int[][] users, int[] rates){
        int sign = 0, sales = 0;    // 가입자 수, 판매액

        for (int[] user :           // 사용자 수 만큼 돌면서
                users) {
            int afterSale = 0;      // 할인가
            int rate = user[0];     // 사용자의 할인율 기준
            int price = user[1];    // 사용자의 이모티콘 구매 비용 기준

            for (int i = 0; i < rates.length; i++) {            // 할인율 배열의 크기만큼 돌면서
                if (100 - rates[i] >= rate){                    // 사용자의 할인율 기준보다 할인율이 높을 때
                    afterSale += emoticons[i] * rates[i] / 100; // 이모티콘의 할인가를 저장
                }

                if (afterSale >= price){    // 이모티콘 할인가의 총액이 사용자의 이모티콘 구매 비용 기준보다 높을 때
                    sign++;                 // 이모티콘 플러스 가입
                    afterSale = 0;          // 이모티콘 할인가 총합 초기화

                    break;
                }
            }

            sales += afterSale;             // 판매액에 해당 할인율일 때의 판매액 저장
        }

        if (sign > SIGN_UP){        // 해당 할인율일 때 가입자의 수가 저장된 가입자 수보다 큰 경우
            SIGN_UP = sign;
            SALES_SUM = sales;
        }else if (sign == SIGN_UP){ // 해당 할인율일 때 가입자의 수가 저장된 가입자 수랑 같은 경우
            SALES_SUM = Math.max(sales, SALES_SUM);
        }
    }

    /**
     * 정답 제출
     *
     * @param users : 사용자의 구매 기준을 담은 2차원 정수 배열
     * @param emoticons : 이모티콘 정가를 담은 1차원 정수 배열
     * @return
     */
    public int[] solution(int[][] users, int[] emoticons) {
        dfs(emoticons, users, 0, new int[emoticons.length]);

        return new int[]{SIGN_UP, SALES_SUM};
    }
}
