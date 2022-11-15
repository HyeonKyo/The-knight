package com.a301.theknight.domain.dummy;

import com.a301.theknight.domain.game.dto.waiting.request.GameCreateRequest;
import com.a301.theknight.domain.game.dto.waiting.response.GameCreationResponse;
import com.a301.theknight.domain.game.entity.Game;
import com.a301.theknight.domain.game.entity.GameStatus;
import com.a301.theknight.domain.game.repository.GameRepository;
import com.a301.theknight.domain.game.service.GameService;
import com.a301.theknight.domain.member.entity.Member;
import com.a301.theknight.domain.member.repository.MemberRepository;
import com.a301.theknight.domain.player.dto.request.PlayerTeamRequest;
import com.a301.theknight.domain.player.entity.Team;
import com.a301.theknight.domain.player.repository.PlayerRepository;
import com.a301.theknight.domain.player.service.PlayerService;
import com.a301.theknight.domain.ranking.entity.Ranking;
import com.a301.theknight.domain.ranking.repository.RankingRepository;
import com.a301.theknight.global.error.exception.CustomRestException;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestInstance;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicInteger;
import java.util.stream.Collectors;


@SpringBootTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
public class CustomDummyTest {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private GameRepository gameRepository;
    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private RankingRepository rankingRepository;
    @Autowired
    private GameService gameService;
    @Autowired
    private PlayerService playerService;
    private PlayerTeamRequest playerTeamRequest = new PlayerTeamRequest(Team.B);

    private int[] maxMembers = {4, 10, 8, 6};
    private boolean[] visitedMember = new boolean[107];
    private boolean[] visiteResult = new boolean[14];

    @Test
    @Transactional(propagation = Propagation.NOT_SUPPORTED)
    void amy7852() {
        Member amy = memberRepository.findById(98L).get();
        visitedMember[97] = true;

        Ranking amy_s_Ranking = new Ranking(amy);
        int total = 14;
        int win = 9;
        int lose = total - win;

        for(int i=0; i < win; i++){
            amy_s_Ranking.saveWinScore();
        }
        for(int i=0; i < lose; i++){
            amy_s_Ranking.saveLoseScore();
        }
        rankingRepository.save(amy_s_Ranking);

        List<Member> allMembers = memberRepository.findAll();
        for(int i=0; i<14; i++){
            GameCreateRequest gameCreateRequest = createRequest(i);
            GameCreationResponse res = gameService.createGame(gameCreateRequest , 98);

            enterFull(allMembers, res.getGameId());
            Game newGame = gameRepository.findById(res.getGameId()).get();
            newGame.changeStatus(GameStatus.END);

            selectTeamFull(newGame);
        }

    }


    private GameCreateRequest createRequest(int i){
        int[] setItemNum = setItem(maxMembers[i % 4]);

        return GameCreateRequest.builder()
                .title("game" + i)
                .maxMember(maxMembers[i % 4])
                .sword(setItemNum[0])
                .twin(setItemNum[1])
                .shield(setItemNum[2])
                .hand(setItemNum[3])
                .build();
    }

    private int[] setItem(int maxUsers){
        int[] setItemNum = new int[4];
        Random random = new Random(System.currentTimeMillis());
        while(true){
            int sum = 0;
            for(int i=0; i<4; i++){
                setItemNum[i] = random.nextInt(maxUsers);
                sum += setItemNum[i];
            }
            if(sum == maxUsers){
                break;
            }
        }
        return setItemNum;
    }

    private void enterFull(List<Member> allMembers, long gameId){
        while(true){
            if(enterRoom(allMembers,gameId)) break;
        }
    }

    private boolean enterRoom(List<Member> allMembers, long gameId){
        Random random = new Random(System.currentTimeMillis());
        try{
            int playerNum = getRandomMember(random, 107);
            playerService.entry(gameId, allMembers.get(playerNum - 1).getId());
            visitedMember[playerNum] = true;
        } catch (CustomRestException e){
            System.out.println("exception occur");
            return true;
        }
        return false;
    }

    private int getRandomMember(Random random, int bound){
        int memberNum = random.nextInt(bound);

        while((0 == memberNum) || visitedMember[memberNum]){
            memberNum = random.nextInt(bound);
        }
        System.out.println("memberNum : " + memberNum);

        return memberNum;
    }

    private void selectTeamFull(Game game) {
        Random random = new Random(System.currentTimeMillis());
        while(!isEqualPlayerNum(gameRepository.findByIdFetchJoin(game.getId()).get())){
            int playerNum = random.nextInt(game.getCapacity());
            long memberId = game.getPlayers().get(playerNum).getMember().getId();
            playerService.team(game.getId(), memberId, playerTeamRequest);
        }

    }

    private boolean isEqualPlayerNum(Game game){
        AtomicInteger teamA = new AtomicInteger();
        AtomicInteger teamB = new AtomicInteger();
        game.getPlayers().stream()
                .map(player -> Team.A.equals(player.getTeam()) ? teamA.getAndIncrement() : teamB.getAndIncrement())
                .collect(Collectors.toList());

        return teamA.intValue() == teamB.intValue();
    }


    private boolean isATeam(){
        Random random = new Random(System.currentTimeMillis());
        return (random.nextInt(14) + 1) % 2 == 1;
    }
}
