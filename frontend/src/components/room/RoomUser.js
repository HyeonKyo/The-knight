import React, { useEffect } from "react";

import { Grid, Box, Button } from "@mui/material";
import UserBox from "../../commons/user/UserBox";
import { black, red, yellow, gray } from "../../_css/ReactCSSProperties";
import { onPubReady } from "../../websocket/RoomPublishes";

export default function RoomUser(props) {
	const emptyUser = {
    id: -1,
    nickname: "",
    image: "",
    readyStatus: false,
    team: '',
    ranking: -1,
    score: -1,
    win: -1,
    lose: -1,
    empty: true,
	};
	// users 정보
	const [memberDatas, setMemberDatas] = React.useState([]);
	const [ready, setReady] = React.useState(false);
	React.useEffect(()=>{
		console.log(props.memberDatas);
		const tempDatas = [...props.memberDatas];
		for (let i = 0; i < tempDatas.length; i++){
			if (tempDatas[i].id.toString() === window.localStorage.getItem("memberId")) {
				setReady(tempDatas[i].readyStatus);
				break;
			}
		}
		while(tempDatas.length < props.roomData.maxMember){
			tempDatas.push(emptyUser);
		}
		console.log(tempDatas);
		setMemberDatas(tempDatas);
	}, [props.memberDatas, props.roomData]);
	
	// 방 정보
	const [roomData, setRoomData] = React.useState(props.roomData);
	React.useEffect(()=>{
		if(props.roomData){
			console.log(props.roomData);
			setRoomData(props.roomData);
		}
	}, [props.roomData]);

	// 레디버튼
	const onReady = () => {
		const currentReady = ready;
		setReady(!currentReady);
		onPubReady({ stompClient: props.stompClient, gameId: roomData.gameId, ready: !currentReady });
	}
	return (
		<Box sx={{p: 3, display: "flex", justifyContent: "space-evenly",flexDirection: "column", width: "100%", height: "100%"}}>
			<Box sx={{display: "flex", justifyContent: "space-evenly"}}>
				{memberDatas.slice(0, parseInt(roomData.maxMember / 2)).map((memberData, index) => (
					<UserBox key={`user${memberData.nickname}${index + parseInt(roomData.maxMember / 2) - parseInt(roomData.maxMember / 2)}`}
						userData={memberData} width={props.size * 6} height={props.size * 6}/>
				))}
			</Box>
			<Box sx={{ display: "flex", position:"relative", justifyContent: "space-evenly"}}>
				{memberDatas.slice(parseInt(roomData.maxMember / 2), memberDatas.length).map((memberData, index) => (
					<UserBox key={`user${memberData.nickname}${index + parseInt(roomData.maxMember / 2)}`} 
					userData={memberData} width={props.size*6} height={props.size*6}/>
				))}
				{roomData.ownerId && roomData.ownerId.toString()===window.localStorage.getItem("memberId")
					? 
					<Button onClick={onReady} style={{
							position: "absolute", bottom: 0, right: -props.size * 3, width: props.size * 3, height: props.size * 3,
							border: `${props.size / 10}px solid ${black}`, borderRadius: "50%", background: ready ? gray : yellow, color: black, fontSize: props.size / 2, fontWeight: 900
					}}>
						Start
					</Button>
					: 
					<Button onClick={onReady} style={{
							position: "absolute", bottom: 0, right: -props.size * 3, width: props.size * 3, height: props.size * 3,
							border: `${props.size / 10}px solid ${black}`, borderRadius: "50%", background: yellow, color: black, fontSize: props.size / 2, fontWeight: 900
					}}>
						{ready ? "Cancel" : "Ready"}
					</Button>
				}
			</Box>
		</Box>
	);
}