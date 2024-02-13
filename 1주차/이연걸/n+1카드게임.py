def solution(coin, cards):
    answer = 1
    n = len(cards)
    players = cards[: n//3]
    deck = cards[n//3: ]
    
    def game(player, dealer):
        for c1 in player:
            key_card = n + 1 - c1
            if key_card in dealer:
                player.remove(c1)
                dealer.remove(key_card)
                return True
        return False
    
    dealers = []
    while deck:
        dealers.append(deck.pop(0))
        dealers.append(deck.pop(0))
        if game(players, players):
            pass
        elif coin >= 1 and game(players, dealers):
            coin -= 1
        elif coin >= 2 and game(dealers, dealers):
            coin -= 2
        else:
            break
        answer += 1
        
    return answer