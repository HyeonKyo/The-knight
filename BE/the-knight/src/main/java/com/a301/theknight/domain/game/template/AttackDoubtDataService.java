package com.a301.theknight.domain.game.template;

import com.a301.theknight.domain.common.service.SendMessageService;
import com.a301.theknight.domain.game.dto.attack.response.AttackResponse;
import com.a301.theknight.domain.game.dto.player.response.MemberTeamResponse;
import com.a301.theknight.domain.game.entity.redis.InGame;
import com.a301.theknight.domain.game.entity.redis.InGamePlayer;
import com.a301.theknight.domain.game.entity.redis.TurnData;
import com.a301.theknight.domain.game.repository.GameRedisRepository;
import com.a301.theknight.domain.game.util.GameLockUtil;
import com.a301.theknight.global.error.exception.CustomWebSocketException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import static com.a301.theknight.global.error.errorcode.GamePlayingErrorCode.INGAME_IS_NOT_EXIST;
import static com.a301.theknight.global.error.errorcode.GamePlayingErrorCode.INGAME_PLAYER_IS_NOT_EXIST;

@Service
public class AttackDoubtDataService extends GameDataService {

    private final GameRedisRepository redisRepository;

    public AttackDoubtDataService(GameLockUtil gameLockUtil, GameRedisRepository redisRepository) {
        super(gameLockUtil, redisRepository);
        this.redisRepository = redisRepository;
    }

    @Override
    @Transactional
    public void makeAndSendData(long gameId, SendMessageService messageService) {
        InGame inGame = getInGame(gameId);
        inGame.clearDoubtData();
        redisRepository.saveInGame(gameId, inGame);

        TurnData turn = getTurnData(inGame);

        InGamePlayer attacker = getInGamePlayer(gameId, turn.getAttackerId());
        InGamePlayer defender = getInGamePlayer(gameId, turn.getDefenderId());

        AttackResponse response = makeAttackResponse(turn, attacker, defender);
        messageService.sendData(gameId, "/attack-info", response);
    }

    private AttackResponse makeAttackResponse(TurnData turn, InGamePlayer attacker, InGamePlayer defender) {
        return AttackResponse.builder()
                .attacker(MemberTeamResponse.builder()
                        .memberId(attacker.getMemberId())
                        .nickname(attacker.getNickname())
                        .team(attacker.getTeam().name()).build())
                .defender(MemberTeamResponse.builder()
                        .memberId(defender.getMemberId())
                        .nickname(defender.getNickname())
                        .team(defender.getTeam().name()).build())
                .weapon(turn.getAttackData().getWeapon().name())
                .hand(turn.getAttackData().getAttackHand().name())
                .build();
    }

    private TurnData getTurnData(InGame inGame) {
        if (inGame.isTurnDataEmpty()) {
            inGame.initTurnData();
        }
        return inGame.getTurnData();
    }

    private InGamePlayer getInGamePlayer(long gameId, long memberId) {
        return redisRepository.getInGamePlayer(gameId, memberId)
                .orElseThrow(() -> new CustomWebSocketException(INGAME_PLAYER_IS_NOT_EXIST));
    }

    private InGame getInGame(long gameId) {
        return redisRepository.getInGame(gameId)
                .orElseThrow(() -> new CustomWebSocketException(INGAME_IS_NOT_EXIST));
    }
}
