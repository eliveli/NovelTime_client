import theme, { styled } from "assets/styles/theme";
import { Img } from "store/serverAPIs/types";

export const ListAndRoomCntnr = styled.div`
  display: flex;
`;
export const ChatRoomListCntnr = styled.div<{
  isRoom: boolean;
  isRoomSpread: boolean;
}>`
  // for dividing the space
  ${({ isRoom }) => !isRoom && `width:100%;`}
  ${({ isRoom, isRoomSpread }) => isRoom && isRoomSpread && `width:56px;`}
  ${({ isRoom, isRoomSpread }) => isRoom && !isRoomSpread && `width: 50%;`}
`;
export const ChatRoomPreviewContainer = styled.div<{
  isCurrentRoom: boolean;
  isRoom: boolean;
  isRoomSpread: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  border-left: 1px solid rgba(0, 0, 0, 0.1);

  ${({ isRoom }) => !isRoom && `border-left:0;`}

  ${({ isRoomSpread }) => isRoomSpread && `position: relative;`}
      
  white-space: nowrap;
  padding: 16px 5px;
  ${theme.media.mobile(`
    padding:12px 5px;
  `)}

  ${({ isCurrentRoom }) => isCurrentRoom && `border: 2px solid ${theme.color.mainLight};`}
`;
export const ChatRoomCntnr = styled.div<{
  isRoomSpread: boolean;
}>`
  position: relative;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(0, 0, 0, 0.1);

  background-color: white;

  // for dividing the space
  ${({ isRoomSpread }) => (isRoomSpread ? `width: 100%;` : `width:50%;`)}
`;
export const NextToImgContainer = styled.div<{ isRoomSpread: boolean }>`
  width: 100%;
  margin-left: 12px;

  ${({ isRoomSpread }) => !isRoomSpread && "position: relative;"}
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
`;
export const CreateDate = styled.span`
  padding-left: 8px;
  white-space: nowrap;
`;
export const UnreadTalkNoContnr = styled.div<{ isRoomSpread: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 23px;
  padding: 0px 5px 2px;
  position: absolute;

  background-color: white;
  color: ${theme.color.main};
  font-weight: 500;

  ${({ isRoomSpread }) =>
    isRoomSpread
      ? `
    top: 12px;
    left: -7px;
    box-shadow: 0 0 3px darkorange;
    border-radius: 10px;
    `
      : `
    top: -1px;
    right: 0;
    box-shadow: 0 0 2px orange;
    border-radius: 5px;  
  `}
`;
export const UnreadTalkNO = styled.span`
  font-size: 20px;
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
