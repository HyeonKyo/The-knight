package com.a301.theknight.domain.game.factory;

import com.a301.theknight.domain.game.entity.GameStatus;
import com.a301.theknight.domain.game.repository.GameRedisRepository;
import com.a301.theknight.domain.game.template.*;
import com.a301.theknight.global.error.errorcode.GamePlayingErrorCode;
import com.a301.theknight.global.error.exception.CustomWebSocketException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import static com.a301.theknight.global.error.errorcode.GamePlayingErrorCode.*;
import static com.a301.theknight.global.error.errorcode.GamePlayingErrorCode.INGAME_IS_NOT_EXIST;

@RequiredArgsConstructor
@Component
public class GameScreenDataServiceFactory {
    private final GameRedisRepository gameRedisRepository;

    private final PrepareDataService prepareDataTemplate;
    private final PredecessorDataService predecessorDataService;
    private final AttackDataService attackDataService;
    private final DefenseDataService defenseDataService;
    private final AttackDoubtDataService attackDoubtDataService;
    private final DefenseDoubtDataService defenseDoubtDataService;
    private final DoubtResultDataService doubtResultDataService;
    private final ExecuteDataService executeDataService;
    private final EndDataService endDataService;

    public GameDataService getGameDataTemplate(long gameId) {
        GameStatus gameStatus = getGameStatus(gameId);

        switch (gameStatus) {
            case PREPARE:
                return prepareDataTemplate;
            case PREDECESSOR:
                return predecessorDataService;
            case ATTACK:
                return attackDataService;
            case DEFENSE:
                return defenseDataService;
            case ATTACK_DOUBT:
                return attackDoubtDataService;
            case DEFENSE_DOUBT:
                return defenseDoubtDataService;
            case DOUBT_RESULT:
                return doubtResultDataService;
            case EXECUTE:
                return executeDataService;
            case END:
                return endDataService;
        }
        throw new CustomWebSocketException(WRONG_GAME_STATUS);
    }

    private GameStatus getGameStatus(long gameId) {
        return gameRedisRepository.getInGame(gameId)
                .orElseThrow(() -> new CustomWebSocketException(INGAME_IS_NOT_EXIST))
                .getGameStatus();
    }
}
