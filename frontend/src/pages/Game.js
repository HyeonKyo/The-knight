import React from "react";
import { useNavigate } from 'react-router-dom';
import LoginCheck from "../commons/login/LoginCheck";
import PlayerWithWeapon from '../components/game/playerWithWeapon';
import Grid from '@mui/material/Grid';

export default function Information() {
  // 비 로그인 시 로그인 화면으로
  const isLogin = LoginCheck();
  const navigate = useNavigate();
  React.useEffect(()=>{
    if(!isLogin){
      navigate('/login');
    }
  }, []);

  const countMemberInTeam = 3

  return (
    <div>
      <h1>진행 순서와 무기를 선택하세요</h1>
      <h3>100</h3>
      <div style={{ backgroundColor: "grey" }}>
        당신은 리더입니다.
      </div>
      <Grid container>
        <Grid item xs={12/countMemberInTeam}>
          <PlayerWithWeapon isMe={true} nickName="닉네임"/>
        </Grid>
        <Grid item xs={12/countMemberInTeam}>
          <PlayerWithWeapon isMe={false} nickName="닉네임"/>
        </Grid>
        <Grid item xs={12/countMemberInTeam}>
          <PlayerWithWeapon isMe={false} nickName="닉네임"/>
        </Grid>
      </Grid>
    </div>
  );
}