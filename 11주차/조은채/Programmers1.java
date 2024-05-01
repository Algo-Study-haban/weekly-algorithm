import java.util.ArrayList;
import java.util.Arrays;
import java.util.PriorityQueue;

public class Programmers1 {
    static int[] dis;
    static ArrayList<ArrayList<Edge>> graph;

    public class Edge implements Comparable<Edge>{
        int vex, cost;

        Edge(int vex, int cost){
            this.vex = vex;
            this.cost = cost;
        }

        @Override
        public int compareTo(Edge o) {
            return this.cost - o.cost;
        }
    }

    public void dijkstra(int v){
        PriorityQueue<Edge> queue = new PriorityQueue<>();

        queue.offer(new Edge(v, 0));
        dis[v] = 0;

        while (!queue.isEmpty()){
            Edge tmp = queue.poll();

            int now = tmp.vex;
            int nowCost = tmp.cost;

            if (nowCost > dis[now]){
                continue;
            }

            for (Edge ob :
                    graph.get(now)) {
                if (dis[ob.vex] > nowCost + ob.cost){
                    dis[ob.vex] = nowCost + ob.cost;

                    queue.offer(new Edge(ob.vex, nowCost + ob.cost));
                }
            }
        }
    }

    public int solution(int N, int[][] road, int K) {
        int answer = 0;

        graph = new ArrayList<ArrayList<Edge>>();

        for(int i = 0; i < N + 1; i++){
            graph.add(new ArrayList<Edge>());
        }

        dis = new int[N + 1];

        Arrays.fill(dis, Integer.MAX_VALUE);

        for(int i = 0 ; i < road.length; i++){
            graph.get(road[i][0]).add(new Edge(road[i][1], road[i][2]));
            graph.get(road[i][1]).add(new Edge(road[i][0], road[i][2]));
        }

        dijkstra(1);

        for(int i = 1; i < dis.length; i ++){
            if(dis[i] <= K){
                answer++;
            }
        }

        return answer;
    }
}
