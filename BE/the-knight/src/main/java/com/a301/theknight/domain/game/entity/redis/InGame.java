package com.a301.theknight.domain.game.entity.redis;

import com.a301.theknight.domain.game.dto.playing.response.GameOrderDto;
import com.a301.theknight.domain.player.entity.Team;
import lombok.Builder;
import lombok.Getter;

import java.io.Serializable;

@Getter
@Builder
public class InGame implements Serializable {
    private Team currentAttackTeam;
    private TeamInfoData teamAInfo;
    private TeamInfoData teamBInfo;

    public void choiceOrder(InGamePlayer inGamePlayer, int orderNumber) {
        inGamePlayer.saveOrder(orderNumber);

        TeamInfoData teamInfoData = inGamePlayer.getTeam().equals(Team.A) ? teamAInfo : teamBInfo;
        teamInfoData.getOrderList()[orderNumber - 1] = GameOrderDto.builder()
                .memberId(inGamePlayer.getMemberId())
                .nickname(inGamePlayer.getNickname())
                .image(inGamePlayer.getImage()).build();
    }

    public int getTeamPlayerSize() {
        return teamAInfo.getPeopleNum();
    }
}