import React from "react";
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api/api';

const initRoom = createAsyncThunk('room/initRoom', async (props, { rejectWithValue }) => {
  try {
    const res = await axios.post(`${api.initRoom()}`, props.roomInfo, {
      headers: {Authorization: `Bearer ${window.localStorage.getItem("loginToken")}`}
    });
    console.log("방 생성 성공", res);
    return {gameId: res.data.gameId};
  } catch (err) {
    console.log(props.roomInfo);
    console.log("방 생성 실패", err);
    return rejectWithValue(err.response.data);
  }
});

const getRoomInfo = createAsyncThunk('room/getRoomInfo', async (gameId, { rejectWithValue }) => {
  try {
    console.log(api.gameRoomInfo(gameId));
    const res = await axios.get(api.gameRoomInfo(gameId), {headers: {Authorization: `Bearer ${window.localStorage.getItem("loginToken")}`}});
    return res.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue(err.response.data);
  }
});

const getUsersInfo = createAsyncThunk('room/getUsersInfo', async (gameId, { rejectWithValue }) => {
  try {
    const res = await axios.get(api.gameMembersInfo(gameId), {});
    console.log(res.data);
    return res.data;
  } catch (err) {
    return rejectWithValue(err.response.data);
  }
});

const roomInit = {
  // state : -1,
  gameId: -1,
  title: "테스트 제목",
  maxMember: 10,
  currentMembers: 0,
  sword: 0,
  twin: 0,
  shield: 0,
  hand: 0,
}
const userInit = [{
  id: -1,
  nickname: "닉네임",
  image: "url",
  team: "A", // A/B
  readyStatus: false,
},{
  id: -1,
  nickname: "닉네임",
  image: "url",
  team: "A", // A/B
  readyStatus: false,
},{
  id: -1,
  nickname: "닉네임",
  image: "url",
  team: "A", // A/B
  readyStatus: false,
},{
  id: -1,
  nickname: "닉네임",
  image: "url",
  team: "A", // A/B
  readyStatus: false,
},];
export const roomSlice = createSlice({
  name: 'room',
  initialState:{roomInfo: roomInit, usersInfo: userInit},
  reducers:{
    modifyRoomSetting:(state, action) =>{
      const tempRoomData = {...state.roomInfo};
      tempRoomData.title = action.payload.title;
      tempRoomData.maxMember = action.payload.maxMember;
      tempRoomData.sword = action.payload.sword;
      tempRoomData.twin = action.payload.twin;
      tempRoomData.shield = action.payload.shield;
      tempRoomData.hand = action.payload.hand;
      state.roomInfo = tempRoomData;
      console.log(tempRoomData);
    },
    setState:(state, action) =>{
      state.roomInfo.state = action.payload.state;
    },
    setMembers:(state, action) =>{
      console.log(action);
      state.usersInfo = [...action.payload];
    },
    changeTeam:(state, action) =>{
      const tempUsersInfo = [...state.usersInfo];
      for(let i=0;i<tempUsersInfo.length;i++){
        if(tempUsersInfo[i].id === action.payload.memberId){
          tempUsersInfo[i].team = action.payload.team;
          break;
        }
      }
      state.usersInfo = tempUsersInfo;
    },
    changeReady:(state, action) =>{
      const tempUsersInfo = state.usersInfo;
      for(let i=0;i<tempUsersInfo.length;i++){
        if(tempUsersInfo[i].id === action.payload.memberId){
          tempUsersInfo[i].readyStatus = action.payload.readyStatus;
          break;
        }
      }
      state.usersInfo = tempUsersInfo;
    },
  },
  extraReducers: {
    [initRoom.fulfilled]: (state, action) => {
      state.roomInfo.gameId = action.payload.gameId;
    },
    [initRoom.rejected]: state => {
      state.roomInfo = roomInit;
    },
    [getRoomInfo.fulfilled]: (state, action) => {
      state.roomInfo = action.payload;
      console.log(action.payload);
    },
    [getRoomInfo.rejected]: state => {
      state.roomInfo = roomInit;
    },
    [getUsersInfo.fulfilled]: (state, action) => {
      state.usersInfo = [...action.payload];
    },
    [getUsersInfo.rejected]: state => {
      state.usersInfo = userInit;
    },
  },
});

export { initRoom, getRoomInfo, getUsersInfo };
export const { modifyRoomSetting, setState, setMembers, changeTeam, changeReady } = roomSlice.actions;
export default roomSlice.reducer;