package com.a301.theknight.domain.game.entity.redis;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@Data
public class DoubtData {
    private long suspectId;
    private long suspectedId;
    private DoubtStatus doubtStatus;
    private Hand doubtHand;
    private boolean doubtResult;
    private boolean deadLeader;
}
