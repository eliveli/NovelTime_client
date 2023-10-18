import { styled } from "assets/styles/theme";

const MainBG = styled.main<{
  isDetail?: "T" | "R";
  isChatRoomList?: true;
  isWritingList?: true;
  isMarginBottom?: true;
}>`
  width: 100%;
  max-width: 860px;
  margin: 0 auto;
  background-color: white;

  /* on mobile */
  @media screen and (max-width: 767px) {
    padding: 0 ${16}px 16px;

    ${({ isChatRoomList }) => isChatRoomList && `padding-bottom: 0;`}

    ${({ isDetail }) => isDetail && `padding: 10px;`}
  }

  /* on tablet, desktop */
  @media screen and (min-width: 768px) {
    padding: 0 20px 20px;

    ${({ isChatRoomList }) => isChatRoomList && `padding-bottom: 0;`}

    ${({ isDetail }) => isDetail === "T" && `padding-top: 20px;`}
    ${({ isDetail }) => isDetail === "R" && `padding-top: 25px;`}
  }

  // on mobile and tablet, 메인리스트 페이지에서 하단 내비게이션 만큼 margin-bottom 설정
  @media screen and (max-width: 1023px) {
    ${({ isMarginBottom }) => isMarginBottom && `margin-bottom: 60px;`} // for home, novel list
  
    ${({ isChatRoomList }) => isChatRoomList && `margin-bottom: 60px;`}
    
    ${({ isWritingList }) =>
      isWritingList && `margin-bottom: 60px; padding-bottom: 0;`} // for talk list, recommend list
  }
`;

export default MainBG;
