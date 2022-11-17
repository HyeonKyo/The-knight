package com.a301.theknight.domain.game.template;

import com.a301.theknight.domain.common.service.SendMessageService;
import com.a301.theknight.domain.game.dto.player.response.MemberTeamResponse;
import com.a301.theknight.domain.game.dto.prepare.GamePlayersInfoResponse;
import com.a301.theknight.domain.game.dto.prepare.PlayerDataDto;
import com.a301.theknight.domain.game.dto.prepare.response.GameOrderDto;
import com.a301.theknight.domain.game.dto.prepare.response.GamePlayersInfoDto;
import com.a301.theknight.domain.game.entity.redis.InGame;
import com.a301.theknight.domain.game.entity.redis.InGamePlayer;
import com.a301.theknight.domain.game.entity.redis.TeamInfoData;
import com.a301.theknight.domain.game.repository.GameRedisRepository;
import com.a301.theknight.domain.player.entity.Team;
import com.a301.theknight.global.error.exception.CustomWebSocketException;
import org.redisson.api.RedissonClient;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.a301.theknight.global.error.errorcode.GamePlayingErrorCode.*;

@Service
public class AttackDataService extends GameDataService {

    private final GameRedisRepository redisRepository;

    public AttackDataService(RedissonClient redissonClient, GameRedisRepository redisRepository) {
        super(redissonClient);
        this.redisRepository = redisRepository;
    }

    @Override
    public void makeAndSendData(long gameId, SendMessageService messageService) {
        sendAttackerData(gameId, messageService);
        sendPlayersData(gameId, messageService);
    }

    private void sendAttackerData(long gameId, SendMessageService messageService) {
        InGame inGame = getInGame(gameId);
        inGame.updateCurrentAttackTeam();
        TeamInfoData teamInfoData = getTeamInfoData(inGame);
        int maxMembers = inGame.getMaxMemberNum() / 2;

        int nextAttackerIndex = findNextAttacker(gameId, maxMembers, teamInfoData);
        teamInfoData.updateCurrentAttackIndex(nextAttackerIndex);
        redisRepository.saveInGame(gameId, inGame);

        long nextAttackerId = teamInfoData.getOrderList()[nextAttackerIndex].getMemberId();
        MemberTeamResponse response = MemberTeamResponse.builder()
                .memberId(nextAttackerId)
                .team(inGame.getCurrentAttackTeam().name()).build();
        messageService.sendData(gameId, "/attacker", response);
    }

    private void sendPlayersData(long gameId, SendMessageService messageService) {
        GamePlayersInfoResponse playersInfo = getPlayersInfo(gameId);
        messageService.sendData(gameId, "/a/players", playersInfo.getPlayersAInfoDto());
        messageService.sendData(gameId, "/b/players", playersInfo.getPlayersBInfoDto());
    }

    private GamePlayersInfoResponse getPlayersInfo(long gameId) {
        GamePlayersInfoDto playersAInfo = getTeamPlayersInfo(gameId, Team.A);
        GamePlayersInfoDto playersBInfo = getTeamPlayersInfo(gameId, Team.B);

        return GamePlayersInfoResponse.builder()
                .playersAInfoDto(playersAInfo)
                .playersBInfoDto(playersBInfo)
                .build();
    }

    private GamePlayersInfoDto getTeamPlayersInfo(long gameId, Team team) {
        List<InGamePlayer> playerList = redisRepository.getInGamePlayerList(gameId);

        List<PlayerDataDto> players = playerList.stream()
                .map(inGamePlayer -> PlayerDataDto.toDto(inGamePlayer, team))
                .collect(Collectors.toList());

        return GamePlayersInfoDto.builder()
                .maxMember(players.size())
                .players(players).build();
    }

    private TeamInfoData getTeamInfoData(InGame inGame) {
        return Team.A.equals(inGame.getCurrentAttackTeam()) ?
                inGame.getTeamAInfo() : inGame.getTeamBInfo();
    }

    private int findNextAttacker(long gameId, int maxMembers, TeamInfoData teamInfoData) {
        GameOrderDto[] orderList = teamInfoData.getOrderList();
        int curIndex = (teamInfoData.getCurrentAttackIndex() + 1) % maxMembers;

        for (int i = 0; i < maxMembers; i++) {
            GameOrderDto gameOrderDto = orderList[curIndex];
            InGamePlayer inGamePlayer = getInGamePlayer(gameId, gameOrderDto.getMemberId());
            if (!inGamePlayer.isDead()) {
                return curIndex;
            }
            curIndex = (curIndex + 1) % maxMembers;
        }
        throw new CustomWebSocketException(ALL_TEAM_PLAYER_IS_DEAD);
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
