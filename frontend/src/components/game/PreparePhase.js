import { useSelector } from "react-redux";
import api from "../../api/api";
import PlayerWithWeaponList from "./PlayerWithWeaponList";
import OrderPicker from "./OrderPicker";
import WeaponPicker from "./WeaponPicker";
import { Box, Button } from "@mui/material";

export default function PreparePhase() {
  const timer = useSelector((state) => state.game.timer.timer);
  const leader = useSelector((state) => state.game.leader);
  const me = useSelector((state) => state.game.me);
  const players = useSelector((state) => state.game.players);
  const order = useSelector((state) => state.game.order);
  const isSelectComplete = useSelector((state) => state.game.isSelectComplete);
  const isLeader = me.memberId === leader;

  const stompClient = useSelector((state) => state.websocket.stompClient);
  const memberId = parseInt(window.localStorage.getItem("memberId"));
  const myTeam = useSelector((state) => state.game.me).team;
  const gameId = useSelector((state) => state.room.roomInfo).gameId;

  const onPubSelectComplete = () => {
    stompClient.send(api.pubSelectComplete(gameId), {}, {});
  };

  function onClick() {
    onPubSelectComplete();
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Box sx={{ fontSize: "5vmin", color: "white"}}>진행 순서와 무기를 선택하세요</Box>
        <Box sx={{ fontSize: "2.5vmin", paddingTop: "1vmin", color: "white" }}>제한시간: {timer}</Box>
        <div
          style={{
            width: "100vmin",
            height: "7vmin",
            backgroundColor: "#d9d9d9",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "2.2vmin",
            marginTop: "3vmin"
          }}
        >
          {isLeader
            ? "당신은 리더입니다"
            : "제한시간 내에 선택하지 않으면 순서와 무기가 랜덤으로 배정됩니다"}
        </div>
      </Box>
      <OrderPicker />
      <WeaponPicker></WeaponPicker>
      {isLeader && (
        <Button
          variant="contained"
          style={{
            width: "50vmin",
            height: "7vmin",
            // backgroundColor: "#878886",
            // color: "white"
          }}
          onClick={() => onClick()}
          // 순서와 무기가 모두 선택되었을 때, 선택완료 활성화
          disabled={
            !(
              !isSelectComplete &&
              players.players
                .filter((player) => player.team === me.team)
                .every((player) => player.weapons[0] && player.weapons[1]) &&
              order.every((element) => element)
            )
          }
        >
          선택완료
        </Button>
      )}
      <PlayerWithWeaponList></PlayerWithWeaponList>
    </Box>
  );
}
