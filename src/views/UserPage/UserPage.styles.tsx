import theme, { styled } from "assets/styles/theme";
import { Img } from "store/serverAPIs/types";
import Icon from "../../assets/Icon";

export const ProfileContnr = styled.div<{ isUserBG: boolean }>`
  margin-bottom: 7px;

  background-color: ${({ isUserBG }) => (isUserBG ? "transparent" : "rgb(255 156 61 / 63%)")};

  ${theme.media.mobile(`
    height: 200px;
  `)}
  ${theme.media.tablet(`
    height: 250px;
  `)}
`;
export const ProfileBG = styled.div<{ userBGSrc: string; userBGPosition: string }>`
  height: 100%;
  width: 100%;
  max-width: 860px;
  margin: auto;
  display: flex;
  background-image: url(${({ userBGSrc }) => userBGSrc});
  background-position: ${({ userBGPosition }) => userBGPosition};
  background-size: cover; // show full image
`;
export const UserImg = styled.div<{ userImg: Img; isTitle?: true }>`
  border-radius: 50%;
  min-width: 45px;
  height: 45px;

  ${({ userImg }) => !userImg.src && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ userImg }) => userImg.src});
  background-position: ${({ userImg }) => userImg.position || "center"};

  ${({ isTitle }) =>
    isTitle &&
    `
      min-width: 20px;
      max-width: 20px;
      height: 20px;
      margin-right: 3px;
      margin-left: -2px;
    `}

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const UserName = styled.span`
  margin-left: 5px;
  font-size: 15px;
  font-weight: 500;
  font-size: 16px;
  font-family: "Noto Sans KR";
  color: #ff9c3dd9;
`;
export const NavigatingToUserHome = styled.div`
  display: flex;
  align-items: flex-end;
`;
export const MessageIcon = styled.img`
  margin-left: 15px;
  width: 37px;
  height: 37px;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;
export const LogOutIconBox = styled(Icon.IconBox)`
  margin-left: 9px;
`;
export const ProfileUserCntnr = styled.div`
  display: flex;
  align-items: flex-end;

  ${theme.media.mobile(`
    margin-bottom: 16px;
    margin-left: 16px;
  `)}
  ${theme.media.tablet(`
    margin-bottom: 20px;
    margin-left: 20px;
  `)}
`;
export const ProfileUserInfoBG = styled.div`
  background-color: #ffffffd9;
  box-shadow: 0 0 7px 7px #ffffffd9;

  border-radius: 10px;

  display: flex;
  align-items: flex-end;
`;

export const UserImgAndName = styled.div`
  display: flex;
  align-items: flex-end;

  ${theme.media.hover(
    `cursor: pointer;
     opacity: 0.7;`,
  )}
`;

export const ProfileBtn = styled.button<{ isLogOut?: true }>`
  white-space: nowrap;

  border-radius: 20px;
  padding: 2px 9px 2px 7px;

  background-color: #ffffff96;

  font-size: 13px;
  font-weight: 500;

  ${({ isLogOut }) =>
    isLogOut
      ? `color: rgba(100,100,100,0.7);
        border: 1px solid rgba(0,0,0,0.2);
        margin-left: 9px;
    `
      : `
        color: #f29f05f0;
        border: 1px solid #f29f058f;
        margin-left: 12px;
  `}

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;

export const WritingSection = styled.section<{ isNoContent: boolean; isForListAll?: true }>`
  margin-bottom: 7px;

  ${({ isForListAll }) => isForListAll && "margin-top: 12px;"}

  @media (max-width: 767px) {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  @media (min-width: 768px) {
    ${({ isNoContent }) =>
      isNoContent
        ? `display: flex;
          flex-direction: column;
          gap: 10px;`
        : `
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          grid-gap: 10px;
      `}// "minmax(0, 1fr)" is necessary to set ellipsis to its grid item
  }
`;

export const WritingContnr = styled.div<{
  isComment?: true;
  isNoContent?: true;
  isNovelList?: boolean;
}>`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 9px;
  padding: 10px;
  display: flex;

  ${({ isComment }) => isComment && `flex-direction:column;`}

  ${({ isNoContent }) => {
    if (isNoContent) {
      return `justify-content: center; align-items: center;`;
    }

    return `${theme.media.tablet(`justify-content: space-between;`)}
      ${theme.media.hover(`cursor: pointer; opacity: 0.7;`)}
      `;
  }}

  ${({ isNovelList }) => isNovelList && `margin: 15px 0 7px;`}
`;

export const NoContentInListDetailed = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 9px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 15px 0 7px;
`;

export const EditAndDeleteContainer = styled.div<{ isEditingBG: boolean }>`
  position: absolute;
  top: 16px;
  right: 22px;

  padding-right: 6px;
  margin-right: -6px;

  ${({ isEditingBG }) =>
    !isEditingBG &&
    `
      background-color: #ffffffd9;
      box-shadow: 0 0 6px 4px #ffffffd9;
    `};

  border-radius: 2px;
`;

export const ListInfoContnr = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 9px;
  padding: 16px;
  display: flex;
  justify-content: space-between;
  position: relative;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;
export const UserImgContainerForListAll = styled.div`
  display: flex;
  gap: 6px;
  font-size: 16px;
`;
export const UserImgForListAll = styled.div<{ userImg: Img; isEditingBG: boolean }>`
  border-radius: 50%;
  min-width: 20px;
  height: 20px;

  ${({ isEditingBG, userImg }) => {
    if (isEditingBG) return "";

    if (!userImg.src) return `border: 1px solid #e5e5e5;`;

    return `background-image: url(${userImg.src});`;
  }};

  background-position: ${({ userImg }) => userImg.position || "center"};
  background-repeat: no-repeat;
  background-size: cover;
`;
export const ListInfoSubContainer = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
export const IconsContnrForListAll = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 9px;
`;
export const NovelImgContainer = styled.div`
  display: flex;
`;
export const NovelImgForListAll = styled.div<{
  novelImg: string;
  idx: number;
  isEditingBG: boolean;
}>`
  ${({ idx }) => idx === 1 && "width:100px;"}
  ${({ idx }) => [2, 3].includes(idx) && "width:50px;"}
  // I did like this because "novelImgs.map" didn't work
  
  height: 100px;

  border-radius: 5%;
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;

  ${({ isEditingBG, novelImg }) => {
    if (isEditingBG) return "";

    if (novelImg) return `background-image: url(${novelImg});`;

    return `background-color: #f5f5f5cf;`;
  }}
`;

export const NovelImg = styled.div<{ novelImg: string; imgHeight: number }>`
  min-height: 80px;
  height: 100%;
  min-width: ${({ imgHeight }) => imgHeight * 0.8}px;
  border-radius: 5%;

  ${({ novelImg }) => !novelImg && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ novelImg }) => novelImg});
  background-position: top;
  background-repeat: no-repeat;
  background-size: cover;
`;
export const ContnrNearImg = styled.div<{ isTalk?: true }>`
  ${({ isTalk }) => (isTalk ? `margin-right: 10px;` : `margin-left: 10px;`)}
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;
export const WritingTitle = styled.p<{ talkId?: string }>`
  margin: 0;

  ${({ talkId }) =>
    talkId
      ? `color: rgba(0, 0, 0, 0.8);
         font-weight: 500;
         `
      : `color: rgba(0,0,0,0.5);
         font-size: 15px;
         font-weight: 500;
        `}
`;
export const UserContnr = styled.div<{ talkId?: string }>`
  display: flex;

  ${({ talkId }) => (talkId ? ` font-weight: 500; ` : ``)}
  font-size: 15px;
  margin-top: -2px;
  margin-bottom: 2px;
  margin-left: 0px;
`;
export const WritingUserName = styled.span<{ talkId?: string }>`
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.8);

  ${({ talkId }) =>
    talkId
      ? ``
      : `
        font-weight: 500;
        font-size: 14px;
      `}
`;
export const CreateDate = styled.span`
  color: rgba(0, 0, 0, 0.8);
  font-weight: 500;
  font-size: 15px;
`;
export const IconsContnr = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 10px;
  gap: 9px;
`;
export const IconInfoContnr = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const HeartIcon = styled(Icon.SmallHeart)``;
export const CommntIcon = styled(Icon.Comment)``;
export const IconNoInfo = styled.span`
  color: rgba(0, 0, 0, 0.8);

  margin-bottom: -1px;
`;
export const NovelTitle = styled.p<{ talkId?: string }>`
  margin: 0;
  ${({ talkId }) =>
    talkId
      ? `font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 500;`
      : `color: rgba(0,0,0,0.8);
    font-weight: 500;
    font-size: 16px;`}
`;
export const FilterContnr = styled.div<{
  category: "contentInUserPage" | "contentInHome" | "novelPlatform";
}>`
  display: flex;
  align-items: flex-end;
  gap: 25px;
  margin: ${({ category }) => {
    if (category === "contentInUserPage") return "12px 0 12px 4px";
    if (category === "contentInHome") return "4px 0 12px 4px";
    return "9px 0 0 4px";
  }};
`;

export const Filter = styled.p<{ category: string; selectedCtgr: string }>`
  margin: 0;
  padding-left: 6px;
  padding-right: 6px;
  font-weight: 500;

  ${({ category, selectedCtgr }) => {
    if (category === selectedCtgr) {
      return `color:${theme.color.main}; border-bottom: 3px solid ${theme.color.mainLight};`;
    }
    return `color: rgba(100, 100, 100, 0.6); ${theme.media.hover(
      `cursor: pointer; opacity: 0.7;`,
    )}`;
  }}
`;

export const CommentContentContnr = styled.div`
  display: flex;
  align-items: flex-end;
`;
export const CommentContent = styled.p`
  margin: 0;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 500;
`;
export const CommentTalkTitle = styled.p`
  margin: -1px 0 0 0;

  display: flex;
  align-items: stretch;

  color: rgba(130, 130, 130, 0.9);
  font-size: 15px;
`;
export const CommentNovelTitle = styled.p`
  margin: 0;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 500;
`;
export const WritingMark = styled.span`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
  padding-left: 3px;
  padding-right: 3px;
`;
export const ListTitleLimitHeightContnr = styled.div<{
  isListMore: boolean;
  limitContnrWidth: number;
}>`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 12px;

  width: ${({ limitContnrWidth }) => limitContnrWidth}px;

  ${({ isListMore }) =>
    isListMore
      ? ``
      : `overflow-x: scroll; overflow-y: hidden; height: 32px;
      `}
  ${theme.hideScrollBar}
`;
export const ListTitleContnr = styled.div<{ isListMore: boolean; limitContnrWidth: number }>`
  display: flex;
  align-items: flex-start;
  row-gap: 12px;
  column-gap: 12px;
  ${({ isListMore }) => (isListMore ? `flex-wrap: wrap;` : ``)}
  width: ${({ limitContnrWidth }) => limitContnrWidth}px;
`;
export const ListTitle = styled.span<{
  listId?: string;
  selectedListId?: string;
}>`
  white-space: nowrap;
  color: rgba(100, 100, 100, 0.8);
  border-radius: 20px;
  border: 1px solid rgba(22, 21, 21, 0.2);
  background-color: white;
  padding: 5px 10px 4px;
  font-size: 14px;
  font-weight: 500;

  ${({ listId, selectedListId }) =>
    listId &&
    selectedListId &&
    listId === selectedListId &&
    `color:${theme.color.main}; border: 1px solid ${theme.color.mainLight}; order: -1;`}

  ${({ listId, selectedListId }) =>
    listId &&
    listId !== selectedListId &&
    theme.media.hover(
      `cursor: pointer;
      opacity: 0.7;`,
    )}
`;
export const ListTitleNormalStyle = styled.span`
  color: rgba(100, 100, 100, 0.6);
  font-size: 12px;
  margin-right: 3px;
`;

export const NovelContainer = styled.div`
  position: relative;
`;

export const IconContainer = styled.div`
  background-color: "transparent";

  min-width: 25px;
  max-width: 25px;
  min-height: 25px;
  max-height: 25px;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }

  position: absolute;
  left: -3px;
  top: 3px;
  color: rgba(100, 100, 100, 0.6);
`;

export const NovelListContnr = styled.div`
  margin: 0 -6px;

  display: grid;
  justify-content: space-between;
  column-gap: 10px;

  @media screen and (max-width: 499px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (min-width: 500px) and (max-width: 699px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

export const ButtonToEditContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;
  display: flex;
  gap: 15px;
`;
export const ButtonToEdit = styled.span<{ isNoBorder?: true }>`
  color: rgba(0, 0, 0, 0.4);
  font-weight: 500;
  font-size: 15px;
  ${({ isNoBorder }) => !isNoBorder && `border-bottom: 1px solid #d3d3d382;`}

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;

// make the parent of more btn //
// the title list container is set overflow hidden,
// so in the container, when title category is scrolled, more btn is scrolled too.
// I want to more btn fixed to the exact space,
//  so I made the parent of the more btn positioned relative,
// and made the btn positioned absolute, and set the detail position value.
export const BtnParentForTitle = styled.div`
  position: relative;
  width: 100%;
`;
export const BtnBoxBGForTitle = styled.div<{ isListMore: boolean }>`
  padding-left: ${({ isListMore }) => (isListMore ? 0 : 4)}px;
  position: absolute;
  height: 32px;
  background-color: white;
  right: 0;
  margin-top: 12px;
`;
export const BtnBoxForTitle = styled(Icon.IconBox)`
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);
  color: rgba(100, 100, 100, 0.4);
  margin-right: 1px;
  margin-top: 2px;
`;
export const ContainerWidth = styled.div`
  width: 100%;
`;
export const HearIconBox = styled(Icon.IconBox)<{ isLike: boolean }>`
  order: -1;
  margin-right: -7px;
`;
export const ShareIconBox = styled(Icon.IconBox)`
  color: rgba(100, 100, 100, 0.4);
  margin-left: 10px;
`;
export const OthersTitleContnr = styled.div`
  display: flex;
  align-items: center;
`;

export const UserContentContainer = styled.div<{ isEditingBG: boolean }>`
  ${({ isEditingBG }) => {
    if (!isEditingBG) return "";

    return `
      position: relative;

      &:before {
        content: "";
        position: absolute;
        
        width: 100%;
        height: 100vh;
        
        background-color: rgba(0,0,0,0.5);
      }
  `;
  }}
`;
