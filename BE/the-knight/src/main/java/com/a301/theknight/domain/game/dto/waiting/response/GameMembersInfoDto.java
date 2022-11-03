package com.a301.theknight.domain.game.dto.waiting.response;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class GameMembersInfoDto {
    private int maxUser;
    private List<MemberDataDto> members;
}
