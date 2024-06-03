## 미나리북 - 책 중고 판매 및 대여 플랫폼


### 목적:  
사용자는 해당 플랫폼에 판매하고 싶은 책의 정보를 공유하여 책을 판매 할 수 있고, 일정기간 동안 보지 않는 책을 대여해주고 대여비를 받을 수 있다.


### 구현 기능:
- **카카오 로그인** : Kakao Developer의 로그인을 이용해서 프론트에서 loginCode를 파라미터에 넣어서 서버의 API를 호출한다. 사용자의 AccessToken과 RefreshToken을 JWT를 이용하여 생성한 후 발급한다. 
- **책 판매/대여하기**: 사용자가 원하는 책의 정보, 실제 사진, 흔적 여부, 거래 장소 등 입력한 후 책 업로드한다
- **책 ISBN/제목 검색하기**: 사용자는 판매하고 싶은 책의 ISBN나 제목을 검색해서 카카 ISBN 서지정보 검색 API를 사용하여 해당 책 정보를 가져온다.
- **카테고리 검색**: IT/컴퓨터, 소설과 같은 카테고리를 사용 하여 원하는 책을 검색할 수 있다
- **채팅하기**: 사용자 간의 1:1 채팅이 가능하다. 실시간 채팅을 구현하기 위해 주기적으로 API를 호출하는 방식이 아닌 웹소켓을 연결하여 개발한다
- **관심목록**: 사용자가 관심하고 있는 책들을 관심목록에 추가하고 관심 목록을 조회할 수 있다


### 구성원 및 업무 분담:
**한승규:**
- 데이터베이스 설계
- 백엔드
- 클라우드

**도안탄히엔:**
- 디자인 설계
- 프론트엔드

### 디자인 설계
[Figma 디자인](https://www.figma.com/design/bES4AOWz3c28M0N5tAh05I/%EB%AF%B8%EB%82%98%EB%A6%AC%EB%B6%81?node-id=0-1&t=Fh7P8n7Hvr41vWvt-0)


### 사용한 기술:
<table>
  <tr>
    <th>분야</th>
    <th>스택</th>
  </tr>
  <tr>
    <td>프론트엔드</td>
    <td>
      <img src="https://github.com/thanhhien234/MinaryBookstore/assets/95044821/03b3d928-bc98-490e-9d50-d1516c58035f" width="80">
      <img src="https://github.com/thanhhien234/MinaryBookstore/assets/95044821/3921e36e-dca4-4f2a-a567-e04e10c4c502" width="80">
      <img src="https://github.com/thanhhien234/MinaryBookstore/assets/95044821/ef4acdf7-0e85-46c6-8ce4-784b2f7f5182" width="80">
    </td>
  </tr>
  <tr>
    <td>백엔드</td>
    <td>
      <img src="https://github.com/thanhhien234/MinaryBookstore/assets/95044821/8db54969-a689-4364-9f35-7ee16743f9fd" width="80">
      <img src="https://github.com/thanhhien234/MinaryBookstore/assets/95044821/2700b032-17d7-44e0-a27b-1376361ea1f1" width="80">
      <img src="https://github.com/thanhhien234/MinaryBookstore/assets/95044821/eb81968a-118a-4e5f-8a9b-1be574507bf2" width="80">
    </td>
  </tr>
  <tr>
    <td>DevOps</td>
    <td>
      <img src="https://github.com/thanhhien234/MinaryBookstore/assets/95044821/a3f53870-34f7-4b6e-955a-a374e5305269" width="80">
      <img src="https://github.com/thanhhien234/MinaryBookstore/assets/95044821/d011fb2f-4dc8-40e8-817e-28fa26739df6" width="80">
    </td>
  </tr>
</table>

### 시연 영상:
[미나리북 시연](https://youtu.be/50CdBtpwKjc)
