//backend Local
// const BASE_URL = 'http://localhost:8080';
//backend 배포
const BASE_URL = 'https://sword-shield.co.kr';

//frontend Local
const LOGIN_REDIRECT = 'http://localhost:3000/islogin';
//frontend 배포
// const LOGIN_REDIRECT = 'https://sword-shield.co.kr/islogin';

const API = '/api';
const WEBSOCKET = '/websocket';
const WEBSOCKET_PUBLISH = '/pub';
const WEBSOCKET_SUBSCRIBE = '/sub';

const EXAMPLE = '/example';
const GOOGLE_LOGIN = '/oauth2/authorization/google';

const GAME = '/games';

// 대기방
const CHAT = '/chat';
const MODIFYSETTING = '/modify';
const ENTER_ROOM = '/entry';
const ALL_MEMBERS = '/members';
const EXIT_ROOM = '/exit';
const SELECT_TEAM = '/team';
const READY = '/ready';

// 인게임
const PLAYERS_INFO = '/players';
const CONVERT = '/convert';
const CONVERT_COMPLETE = '/convert-complete';
const PROCEED = '/proceed';
const LEADER = '/leader';
const COUNT_WEAPON = '/weapons';
const SELECT_WEAPON = '/weapon-choice';
const DELETE_WEAPON = '/weapon-delete';
const TIMER = '/timer';
const ORDER = '/orders';
const SELECT_COMPLETE = '/select-complete';
const ATTACK_FIRST = '/pre-attack';
const CURRENT_ATTACKER = '/attacker'
const ATTACK = '/attack'
const DEFENSE = '/defense'
const ATTACK_INFO = '/attack-info'
const DEFENSE_INFO = '/defense-info'
const ATTACK_PASS = '/attack-pass'
const DEFENSE_PASS = '/defense-pass'
const DOUBT = '/doubt'
const DOUBT_INFO = '/doubt-info'
const EXECUTE = '/execute'
const END = '/end'

const api = {
  exampleFunction: () => BASE_URL + EXAMPLE + `${0}`,
  baseURL: () => BASE_URL,
  websocket: () => BASE_URL + WEBSOCKET,
  login: () => BASE_URL + GOOGLE_LOGIN,
  loginRedirect: () => LOGIN_REDIRECT,


  initRoom: () => BASE_URL + API + GAME,

  // 구독
  subModifyRoom: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + MODIFYSETTING,
  subState: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}`,
  subChatAll: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + CHAT + `-all`,
  subChatTeam: (gameId, team) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + CHAT + `-${team}`,
  subEnterRoom: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + ENTER_ROOM,
  subAllMembersInRoom: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + ALL_MEMBERS,
  subSelectTeam: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + SELECT_TEAM,
  subReady: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + READY,
  subExitRoom: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + EXIT_ROOM,

  // 발행
  pubModifyRoom: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + MODIFYSETTING,
  pubChat: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + CHAT,
  // chatTeam: (gameId, team) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + CHAT + `${team}`,
  pubEnterRoom: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + ENTER_ROOM,
  pubAllMembersInRoom: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + ALL_MEMBERS,
  pubSelectTeam: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + SELECT_TEAM,
  pubReady: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + READY,
  pubExitRoom: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + EXIT_ROOM,

  gameRoomInfo: (gameId) => BASE_URL + API + GAME + `/${gameId}`,
  getGameList: () => BASE_URL + API + GAME,

  //memebr 관련
  getMemberHistory: () => BASE_URL + API + '/history',
  getMemberInfo: () => BASE_URL + API + ALL_MEMBERS,
  deleteMember: () => BASE_URL + API + ALL_MEMBERS,
  updateMemberInfo: () => BASE_URL + API + ALL_MEMBERS,

  // 인게임
  subPlayersInfo: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + PLAYERS_INFO,
  subConvert: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + CONVERT,
  subNextPhase: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + PROCEED,
  subTimer: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + TIMER,
  subLeader: (gameId, team) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + `/${team}`.toLowerCase + LEADER,
  subCountWeapon: (gameId, team) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + `/${team}`.toLowerCase + COUNT_WEAPON,
  subOrder: (gameId, team) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + `/${team}`.toLowerCase + ORDER,
  subSelectComplete: (gameId, team) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + `/${team}`.toLowerCase + SELECT_COMPLETE,
  subAttackFirst: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + ATTACK_FIRST,
  subCurrentAttacker: (gameId, team) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + `/${team}`.toLowerCase + CURRENT_ATTACKER,
  subAttackInfo: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + ATTACK_INFO,
  subDefenseInfo: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + DEFENSE_INFO,
  subDoubtInfo: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + DOUBT_INFO,
  subExecute: (gameId) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + EXECUTE,
  subEnd: (gameId, team) => WEBSOCKET_SUBSCRIBE + GAME + `/${gameId}` + `/${team}`.toLowerCase + END,
  pubConvertComplete: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + CONVERT_COMPLETE,
  pubSelectWeapon: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + SELECT_WEAPON,
  pubDeleteWeapon: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + DELETE_WEAPON,
  pubSelectComplete: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + SELECT_COMPLETE,
  pubAttack: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + ATTACK,
  pubDefense: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + DEFENSE,
  pubAttackPass: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + ATTACK_PASS,
  pubDefensePass: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + DEFENSE_PASS,
  pubDoubt: (gameId) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + DOUBT,
  pubOrder: (gameId, team) => WEBSOCKET_PUBLISH + GAME + `/${gameId}` + `/${team}`.toLowerCase + ORDER,

  //rank 관련
  getRankList: () => BASE_URL + API + '/ranking',
}
export default api;