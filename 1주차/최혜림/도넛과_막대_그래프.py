# 생성정점 = 모든 정점 중 받는 간선이 0인 정점 (무조건 1개), 보내는 간선은 2개 이상 (총 그래프 개수가 2개 이상)
# 모든 그래프의 갯수 = 생성정점의 보내는 간선 수
# 막대그래프 갯수 = 모든 정점 중 보내는 간선이 0 인 정점
# 8자그래프 갯수 = 모든 정점 중 보내는 간선이 2 이상 , 받는 간선이 2 이상인 정점
# 도넛그래프 갯수 = 모든 그래프 갯수 - 막대그래프 갯수 - 8자 그래프 갯수


def solution(edges):
    graph_info = {}

    # 각 노드가 보낸 간선과 받은 간선을 저장
    for send, receive in edges:
        graph_info.setdefault(send, {"send_count": 0, "receive_count": 0})
        graph_info.setdefault(receive, {"send_count": 0, "receive_count": 0})

        graph_info[send]["send_count"] += 1
        graph_info[receive]["receive_count"] += 1

    created_vertex_num = 0
    all_graphs_cnt = 0
    bar_graphs_cnt = 0
    figure_8_graphs_cnt = 0
    donut_graphs_cnt = 0

    for key, value in graph_info.items():
        if value["send_count"] >= 2 and value["receive_count"] == 0:
            created_vertex_num = key
            all_graphs_cnt = value["send_count"]
        elif value["send_count"] == 0:
            bar_graphs_cnt += 1
        elif value["send_count"] >= 2 and value["receive_count"] >= 2:
            figure_8_graphs_cnt += 1

    donut_graphs_cnt = all_graphs_cnt - bar_graphs_cnt - figure_8_graphs_cnt

    result = [created_vertex_num, donut_graphs_cnt, bar_graphs_cnt, figure_8_graphs_cnt]

    return result


edges_example = [[2, 3], [4, 3], [1, 1], [2, 1]]
print(solution(edges_example))
