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

  @media (max-width: 1023px) {
    height: calc(100vh - 71px - 60px); // calc(100vh - top nav - msgInputHeight)
  } // on mobile and tablet

  @media (min-width: 1024px) {
    height: calc(100vh - 61px); // calc(100vh - top nav)
  } // on desktop

  overflow-y: scroll;
  overflow-x: hidden;
  ${theme.hideScrollBar}
`;

export const ChatRoomPreviewContainer = styled.div<{
  isRoom: boolean;
  isRoomSpread: boolean;
  isCurrentRoom: boolean;
}>`
  width: 100%;
  display: flex;
  align-items: center;
  white-space: nowrap;

  ${({ isRoomSpread }) => isRoomSpread && `position: relative;`}

  ${theme.media.mobile(`
    padding: 12px 5px;
  `)}
  ${theme.media.tablet(`
    padding: 16px 5px;
  `)}

  ${({ isCurrentRoom, isRoom }) => {
    if (isCurrentRoom) return `border: 2px solid ${theme.color.mainLight};`;

    if (isRoom) {
      return `border-left: 1px solid rgba(0, 0, 0, 0.1); border-bottom: 1px solid rgba(0, 0, 0, 0.1);`;
    }

    return `border-left: 0; border-bottom: 1px solid rgba(0, 0, 0, 0.1);`;
  }}

  ${({ isCurrentRoom }) =>
    !isCurrentRoom &&
    `${theme.media.hover(
      `cursor: pointer;
       opacity: 0.7;`,
    )}`}
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
  width: calc(100% - 45px);
  padding-left: 12px;

  ${({ isRoomSpread }) => !isRoomSpread && "position: relative;"}
`;

export const UserImg = styled.div<{ userImg: Img }>`
  min-width: 45px;
  height: 45px;
  border-radius: 50%;

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
export const UnreadMessageNoContnr = styled.div<{
  isRoomSpread?: boolean;
  isForMobileNav?: true;
  isForDesktopNav?: true;
}>`
  display: flex;
  justify-content: center;
  align-items: center;

  position: absolute;

  background-color: white;
  color: ${theme.color.main};
  font-weight: 500;

  ${({ isRoomSpread, isForMobileNav, isForDesktopNav }) => {
    if (isRoomSpread) {
      return `
        top: 12px;
        left: -7px;
        height: 23px;
        padding: 0px 5px 2px;
        box-shadow: 0 0 3px darkorange;
        border-radius: 10px;
      `;
    }
    if (isRoomSpread === false) {
      return `
        top: -1px;
        right: 0;
        height: 23px;
        padding: 0px 5px 2px;
        box-shadow: 0 0 2px orange;
        border-radius: 5px;  
      `;
    }
    if (isForMobileNav) {
      return `
        top: 3px;
        right: calc(50% - 24px);
        height: 16px;
        padding: 0px 3px 0px;
        box-shadow: 0 0 3px darkorange;
        border-radius: 10px;
      `;
    }
    if (isForDesktopNav) {
      return `
        top: 16px;
        right: 10px;
        height: 16px;
        padding: 0px 3px 0px;
        box-shadow: 0 0 3px darkorange;
        border-radius: 10px;
      `;
    }
  }}
`;

export const UnreadMessageNumber = styled.span<{ isForNav?: true }>`
  font-size: ${({ isForNav }) => (isForNav ? 13 : 20)}px;
  font-weight: ${({ isForNav }) => (isForNav ? 600 : 300)};
`;

export const MessageContent = styled.p`
  margin: 0;
  color: rgba(0, 0, 0, 0.7);
  font-size: 15px;

  display: inline-block;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
