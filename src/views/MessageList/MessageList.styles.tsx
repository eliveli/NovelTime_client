import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

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
    isShowRoomTablet && !isBeforeClickList && !isListOpen && `width: 46px;`}
`;
export const MessageContainer = styled.div<{ isCrntMsg: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px dotted rgba(0, 0, 0, 0.1);
  white-space: nowrap;
  padding: 16px 0;
  ${theme.media.mobile(`
    padding:12px 0;
  `)}

  ${({ isCrntMsg }) => isCrntMsg && `border:1px solid rgba(0, 0, 0, 0.1);`}
`;
export const MsgRoomCntnr = styled.div<{
  isListOpen: boolean;
}>`
  position: relative;
  // for dividing the space
  ${({ isListOpen }) => (isListOpen ? `width:50%;` : `width: 100%;`)}
`;
export const NextToImgContainer = styled.div`
  width: 100%;
  margin-left: 12px;
`;

export const UserImg = styled.div<{ userImg: string }>`
  border-radius: 50%;
  min-width: 45px;
  height: 45px;
  background-image: url(${({ userImg }) =>
    userImg || "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png"});

  background-position: center;
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

  margin-left: 0;
  padding: 0;
`;

export const UserName = styled.p`
  margin: 0;
  font-size: 15px;
`;
export const CreateDate = styled.span`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  font-weight: 600;
  padding-left: 8px;
  white-space: nowrap;
`;
export const UnreadTalkNoContnr = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: white;
  box-shadow: 0 0 2px orange;
  color: ${theme.color.main};
  font-weight: 600;

  border-radius: 5px;
  padding: 2px 5px 0px;
  height: 18px;
`;
export const UnreadTalkNO = styled.span`
  font-size: 15px;
`;
export const MessageImgBox = styled.div`
  min-width: 40px;
`;
export const MessageImg = styled.div<{ img?: string }>`
  padding-top: 100%;

  background-image: url(${({ img }) => img});
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;

  border-radius: 10%;
`;

export const MessageTitle = styled.h3`
  font-size: 19px;
  margin: 0;
  font-weight: 600;
`;
export const MessageContent = styled.p<{ contentWidth: number }>`
  margin: 0;
  color: rgba(0, 0, 0, 0.7);
  font-size: 15px;

  // 1줄 엘립시스 ...
  display: inline-block;
  width: ${({ contentWidth }) => contentWidth}px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
