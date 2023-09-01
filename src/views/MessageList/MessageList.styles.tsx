import theme, { styled } from "assets/styles/theme";
import { Img } from "store/serverAPIs/types";

export const MsgListCntnrDevice = styled.div<{ isTablet: boolean }>`
  ${({ isTablet }) => (isTablet ? `display: flex;` : ``)}
`;
export const MsgListCntnr = styled.div<{
  isShowRoomTablet: boolean;
  isListOpen: boolean;
  isBeforeClickList: boolean;
}>`
  // for dividing the space
  ${({ isShowRoomTablet }) => !isShowRoomTablet && `width:100%;`}
  ${({ isShowRoomTablet, isBeforeClickList }) =>
    isShowRoomTablet && isBeforeClickList && `width:100%;`}
  ${({ isShowRoomTablet, isBeforeClickList, isListOpen }) =>
    isShowRoomTablet && !isBeforeClickList && isListOpen && `width:50%;`}
  ${({ isShowRoomTablet, isBeforeClickList, isListOpen }) =>
    isShowRoomTablet && !isBeforeClickList && !isListOpen && `width: 56px;`}
`;
export const MessageContainer = styled.div<{ isCrntMsg: boolean; isBeforeClickList: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;

  /* border-bottom: 1px dotted rgba(0, 0, 0, 0.1); */
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  ${({ isBeforeClickList }) => isBeforeClickList && `border-left:0;`}

  white-space: nowrap;
  padding: 16px 5px;
  ${theme.media.mobile(`
    padding:12px 5px;
  `)}

  ${({ isCrntMsg }) => isCrntMsg && `border: 2px solid ${theme.color.mainLight};`}
`;
export const MsgRoomCntnr = styled.div<{
  isListOpen: boolean;
}>`
  position: relative;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  background-color: white;

  // for dividing the space
  ${({ isListOpen }) => (isListOpen ? `width:50%;` : `width: 100%;`)}
`;
export const NextToImgContainer = styled.div`
  width: 100%;
  margin-left: 12px;
  position: relative;
`;

export const UserImg = styled.div<{ userImg: Img }>`
  border-radius: 50%;
  min-width: 45px;
  height: 45px;

  ${({ userImg }) => !userImg.src && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ userImg }) => userImg.src});
  background-position: ${({ userImg }) => userImg.position || "center"};
  background-repeat: no-repeat;
  background-size: cover;
`;

export const FirstLineInfoContnr = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  margin-left: 0;
  padding: 0;
`;
export const UserNameBox = styled.div`
  display: flex;
  align-items: flex-end;

  color: rgba(100, 100, 100, 0.9);

  margin-left: 0;
  padding: 0;
`;

export const UserName = styled.p`
  margin: 0;
  /* font-size: 15px; */
`;
export const CreateDate = styled.span`
  /* font-size: 14px; */
  /* font-weight: 500; */
  padding-left: 8px;
  white-space: nowrap;
`;
export const UnreadTalkNoContnr = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 23px;
  padding: 0px 5px 2px;
  position: absolute;
  top: -1px;
  right: 0;

  background-color: white;
  box-shadow: 0 0 2px orange;
  color: ${theme.color.main};
  font-weight: 500;

  border-radius: 5px;
`;
export const UnreadTalkNO = styled.span`
  font-size: 20px;
`;
export const MessageImgBox = styled.div`
  min-width: 40px;
`;
export const MessageImg = styled.div<{ img?: string }>`
  padding-top: 100%;

  ${({ img }) => !img && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ img }) => img});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  border-radius: 10%;
`;

export const MessageTitle = styled.h3`
  font-size: 19px;
  margin: 0;
  font-weight: 500;
`;
export const MessageContent = styled.p<{ contnrWidth: number }>`
  margin: 0;
  color: rgba(0, 0, 0, 0.7);
  font-size: 15px;

  // 1줄 엘립시스 ...
  display: inline-block;
  width: ${({ contnrWidth }) => contnrWidth - (45 + 12 + 10) - 2}px;
  // container width - (img width + margin left + padding) - amount necessary
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
