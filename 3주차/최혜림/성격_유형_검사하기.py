def solution(survey, choices):
    answer = ""

    survey_key = ["R", "T", "C", "F", "J", "M", "A", "N"]
    all_survey = {key: 0 for key in survey_key}

    for i, value in enumerate(survey):
        if choices[i] == 1:
            all_survey[value[0]] += 3
        elif choices[i] == 2:
            all_survey[value[0]] += 2
        elif choices[i] == 3:
            all_survey[value[0]] += 1
        elif choices[i] == 5:
            all_survey[value[1]] += 1
        elif choices[i] == 6:
            all_survey[value[1]] += 2
        elif choices[i] == 7:
            all_survey[value[1]] += 3
        else:
            continue

    survey_set = ["RT", "CF", "JM", "AN"]

    for i in survey_set:
        if all_survey[i[0]] > all_survey[i[1]]:
            answer += i[0]
        elif all_survey[i[0]] == all_survey[i[1]]:
            sort_alphabet = sorted(i)
            answer += sort_alphabet[0]
        else:
            answer += i[1]

    return answer
