package com.a301.theknight.domain.game.entity.redis;

import com.a301.theknight.domain.game.entity.Weapon;
import lombok.Builder;
import lombok.Data;

@Data
public class AttackData {
    private final Hand attackHand;
    private final Weapon weapon;

    @Builder
    public AttackData(Weapon weapon, Hand hand) {
        this.attackHand = hand;
        this.weapon = weapon;
    }
}
