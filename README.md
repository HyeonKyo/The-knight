# 더 나이트 (The Knight)

## 0. 프로젝트 회고
### 1. 역할 및 시도한 것
* Spring Websocket 비동기 메시징 프로그래밍으로 게임 진행 API 구현
* 게임 진행, 인증, 채팅, 랭킹 등 API 및 도메인 로직 구현
* Redisson Lock을 활용하여 동시성 문제 해결
* Redisson Lock, Spring AOP를 활용한 Multi Click(따닥) 문제 해결
* Redis에 인증정보를 캐싱하여 TPPS 및 응답시간 성능 개선
* Junit5를 활용하여 비즈니스 로직 단위테스트 시도

### 2. 배운 점
* Websocket으로 실시간 양방향 통신 프로그램의 API를 구현하며 많이 배웠다. 양방향 통신이라는 점과 비동기라는 점이 프로그래밍의 복잡도를 크게 높였고, 이를 구현하며 API 구현 능력을 한 층 업그레이드 시킬 수 있었다.
* 게임 제한시간이 지나면 강제로 로직을 수행하는 등 복잡한 요구사항을 템플릿 메소드 패턴과 같은 디자인 패턴을 활용하여 작성하였다. 이 덕분에 프로젝트 중에 많은 요구사항 변경에도 적은 부분만 코드를 변경하며 유지보수성이 높은 코드에 대한 중요성을 깨달을 수 있었다. 이후 디자인 패턴 및 객체지향 프로그래밍을 학습하며 유지보수성이 높은 코드를 작성하고자 노력해야겠다.
* Redis를 활용하여 캐싱 및 NoSQL을 적용하며 성능적인 부분을 개선해볼 수 있었다.
* 동시성 문제를 예상하고 제어하는 방법에 대해 학습할 수 있었다.


### 3. 아쉬웠던 점
* NoSQL, 캐싱, 동시성 등 Redis에 너무 많은 역할을 부여한 점이 아쉽다. 프로젝트 초반 NoSQL을 더 잘 알았다면 InGame 데이터를 저장하는 역할은 MongoDB를 사용하는 것이 더 좋았을 것 같다.
* 프로젝트 일정이 타이트하고 실시간 게임 구현을 처음 해봐서 변경 사항이 많아 단위 테스트를 끝까지 깨지지 않게 유지하지 못했다. 또한, 구현 후 단위 테스트를 적용하려고 보니 의존성이 복잡하여 단위 테스트가 어려운 코드도 많았다. 이후 비즈니스 로직 구현 시 TDD를 적용하여 테스트와 유지보수가 용이한 코드를 작성하는 것이 목표이다.
* Ngrinder를 활용하여 서비스 성능 테스트를 수행해보았지만, 지표들을 분석하는 능력이 부족하여 성능 개선을 크게 도모하지 못한 부분이 아쉽다. 서비스 운영 경험과 함께 CS 지식의 중요성을 더욱 체감하게 되었다.


## 1. 서비스 소개

---

### **서비스 개요**

- 자신의 손에 있는 무기의 정체를 숨기면서 상대 팀의 리더를 찾아 공격하는 턴제 심리 전략 게임
- 진행 기간 : 2022.10.11 ~ 2022.11.18 (6주)

### 기획 의도

- 두뇌/전략 게임을 직접 플레이 하고 싶어하는 사람들의 수요를 충족시켜주는
- 기존의 온라인/오프라인 진행 방식의 한계를 개선한
- 웹 기반 온라인 턴제 전략 게임

### 서비스 화면

**1. 게임 초기 화면 (게임설명, 로비, 랭킹)**
<img src=./img/intro.gif>

**2. 게임 대기방 (팀 선택 및 게임 시작)**
<img src=./img/room.gif>

**3. 무기 및 순서 선택**
<img src=./img/weapon.gif>

**4. 게임 플레이 화면 (공격, 방어, 의심 선택)**
<img src=./img/play.gif>

### 팀원 소개

<img src=./img/1.png>

## 2. 설계

---

### Architecture

<img src=./img/2.png>

### ERD

<img src=./img/3.png>

### 와이어 프레임

[https://www.figma.com/file/AryONRgFRD5QA2v8O7L0XO/%EC%9E%90%EC%9C%A8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-team-library?t=hlLl3ZevFRoJ8pml-6](https://www.figma.com/file/AryONRgFRD5QA2v8O7L0XO/%EC%9E%90%EC%9C%A8%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8-team-library?t=hlLl3ZevFRoJ8pml-6)

<img src=./img/4.png>

### API 명세

[https://www.notion.so/API-f4c5e99a8a2549c3b699c5926af7c7c7](https://www.notion.so/API-f4c5e99a8a2549c3b699c5926af7c7c7)

<img src=./img/5.png>

## 3. 기술 스택

---

### Frontend

<img src=./img/6.png>

- react : `18.2.0`
- react-redux : `8.0.4`
- redux-toolkit : `1.8.6`
- sockjs-client : `1.6.1`
- stompjs : `2.3.3`
- react-spring : `9.5.5`
- mui/material : `5.10.10`

### Backend

<img src=./img/7.png>

- Spring boot : `2.7.5`
- QueryDSL : `1.0.10`
- redisson : `3.18.0`
- sockJs-client : `1.5.1`
- stomp : `1.2`
- mariaDB : `10.9.3`
- redis : `7.0.5`

### Infra

<img src=./img/8.png>

- ubuntu : `20.04`
- jenkins : `2.361.2`
- docker : `20.10.21`
- nginx :  `1.22.1`

### IDE

<img src=./img/9.png>

## 4. 협업 도구

---

### Git

- Git Flow를 브랜치 전략으로 선정
- Develop 브랜치와 Master 브랜치에 MR을 Merge하면, GitLab Webhook이 발생하고 Jenkins를 이용하여 자동 배포 환경 구현
- Master 브랜치에 Merge되는 순간 Docker Image를 Run하여 자동 배포
- Git commit convention

```markdown
- ✨ feat : 새로운 기능 추가
- 🍋 modify : 약간의 코드 수정 (코드 리뷰 이후 등)
- 🐛 fix : 버그 수정
- 📝 docs : 문서 수정
- 💄 style : 코드 포매팅, 세미콜론 누락, 코드 변경이 없는 경우
- ♻ refactor : 코드 리펙토링 (로직 수정 X)
- ✅ test : 테스트 코드, 리펙토링 테스트 코드 추가
- 🔨 chore : 빌드 업무 수정, 패키지 매니저 수정
- 🔧 config: 환경설정 파일 추가 및 수정
```

### Jira

- 개발 일정 관리

<img src=./img/10.png>

<img src=./img/11.png>

### Notion

[https://www.notion.so/MAIN-83661bff425c486dbea9aa9ded3144e3](https://www.notion.so/The-Knight-83661bff425c486dbea9aa9ded3144e3)