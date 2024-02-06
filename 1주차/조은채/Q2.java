import java.util.*;

public class Q2 {
    public int[] solution(int[][] edges) {

        // 정점의 번호, 도넛 모양 그래프의 수, 막대 모양 그래프의 수, 8자 모양 그래프의 수
        int[] answer = {0, 0, 0, 0};

        HashMap<Integer, Integer> mapIn = new HashMap<>();  // {정점번호, 해당 정점으로 들어오는 간선 수}
        HashMap<Integer, Integer> mapOut = new HashMap<>(); // {정점번호, 해당 정점에서 나가는 간선 수}

        for (int[] edge :
                edges) {
            mapIn.put(edge[1], mapIn.getOrDefault(edge[1], 0) + 1);
            mapOut.put(edge[0], mapOut.getOrDefault(edge[0], 0) + 1);
        }

        for (int a :
                mapOut.keySet()) {
            if (mapOut.get(a) >= 2 && !mapIn.containsKey(a)){   // answer에 정점 번호 저장 (들어오는 간선이 없는 정점)
                answer[0] = a;
            }

            if (mapOut.get(a) >= 2 && mapIn.containsKey(a) && mapIn.get(a) >= 2){   // 8자 모양 그래프 개수 저장(들어오는 간선이 2개 이상, 나가는 간선 2개 이상인 정점)
                answer[3]++;
            }
        }

        for (int a :    // answer에 막대 그래프 개수 저장 (들어오는 간선만 있고, 나가는 간선이 없는 정점)
                mapIn.keySet()) {
            if (mapIn.get(a) >= 1 && !mapOut.containsKey(a)){
                answer[2]++;
            }
        }

        // answer에 도넛 그래프 개수 저장 ( answer[0] 에서 나가는 간선의 개수에서 나머지 그래프의 개수를 뺀 개수)
        answer[1] = mapOut.get(answer[0]) - answer[2] - answer[3];

        return answer;
    }
}
