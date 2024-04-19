### (프론트엔드 개인 과제 전형) 뉴욕타임즈 검색 및 스크랩 웹

- 개발 기간 : 2024.04.19 ~ 2024.04.20(2일)
- 기술 스택 : Next.js, Redux toolkit, Typescript, TailwindCSS 등
.env -> NEXT_PUBLIC_NYTIMES_API_KEY = NYTIMES api key
<br/>


### 개발 내용 정리

#### 해야할 일 
- 기사 리스트업(API), 모달을 통한 Filter(API), 즐겨찾기 기능 및 해당 정보 로컬 스토리지 저장 기능(Redux persist), 무한 스크롤 기능 구현, 반응형 및 헤더/푸터/리스트/모달 UI 구현 등
<br/>

#### 1일차
- Nextjs, tailwindCSS, Redux toolkit, Redux persist, dayjs, axios 등 프로젝트 세팅,
- Redux persist 이해, NYTIMES API 내용 확인
- 리스트업, 필터링 기능 구현
- 헤더, 푸터, 리스트 컴포넌트 구현

#### 2일차
- 무한 스크롤 구현
- 스크랩 기능 구현
- 즐겨찾기 및 기타 아이콘 삽입
- 반응형, UI 디테일 확인 및 수정
- 에러 테스트
<br/>

### 미확인 요소 및 논의 요소
- 데이트피커를 현재 input type='date'로 구현했는데, 따로 datepicker 컴포넌트를 구현해야 하는지?
- 필터링 클릭했을 때, 현재 적용된 필터링이 모달에 입력된 상태로 나와야 하는지?(만약 그렇다면 초기화 버튼 필요하다고 생각함)
- 제목 필터가 길어졌을 때, 말줄임표를 사용하라고 했는데 임의로 6자 정도로 정함.
- API 호출에 로드가 좀 걸리는 편이라 로딩중 CSS로 구현함.
- 피그마에서 Dev 모드로 볼 수 없어서 정확한 margin padding을 확인 못하여 임의로 조정함.
- NYTIMES API의 fq를 통한 Headline 검색에 제한 사항이 조금 있었음
  1. headline 객체에 print_headline을 기준으로 검색하는데, 그 부분이 비어있는 경우가 있어서, 그런 경우엔 리스트에 main을 표시하도록 함
  2. 공백 단위의 검색이 됨, fulltext search가 안되는 듯함.

- search API로 10개씩 기사를 가져올 수 있고, 현재 최신순으로 가져오면서 페이지 단위를 변경하고 있음. 이곳에서 문제가 발생함.
  
  -> 첫 페이지 로드 후, 시간이 지나면 아예 새 기사가 올라와서 1페이지에 있던 기사가 2페이지로 넘어감. 이후 더보기(스크롤) 시 중복되는 기사가 생김
  
  -> 마지막 기사의 정확한 시간으로 그 다음 기사를 가져오는 쿼리가 없어서, 중복 기사는 리스트에 업데이트 하지 않는 것으로 반영함.

![스크린샷 2024-04-19 오후 7 19 44](https://github.com/hasangwon/nytimes-scrap/assets/75872687/f0b4d15f-7498-478c-a26c-3a58cfbd4060)
![스크린샷 2024-04-19 오후 7 21 24](https://github.com/hasangwon/nytimes-scrap/assets/75872687/5864f880-2dfc-47eb-9cba-9d8ff8e1bd4e)
