import theme, { styled } from "assets/styles/theme";
import Icon from "../../assets/Icon";

export const ProfileContnr = styled.div`
  height: 200px;
  background-color: #ff9c3db0;
  ${theme.media.tablet(`
    height: 250px;
  `)}
`;
export const ProfileAlign = styled.div`
  height: 100%;
  width: 100%;
  max-width: 860px;
  margin: auto;
  display: flex;
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
export const UserName = styled.span`
  margin-left: 5px;
  font-size: 15px;
  color: white;
`;
export const MessageIcon = styled.img`
  margin-left: 15px;
  width: 37px;
  height: 37px;
`;
export const ProfileUserCntnr = styled.div`
  display: flex;
  align-items: flex-end;
  margin-bottom: 12px;

  margin-left: 16px;
  ${theme.media.tablet(`
    margin-left: 20px;
  `)}
`;

export const ExtraSpace = styled.div`
  width: 100%;
  height: 7px;
`;
export const WritingSection = styled.section`
  // in mobile
  display: flex;
  flex-direction: column;
  gap: 10px;

  margin-bottom: 7px;

  ${theme.media.tablet(`
    display: grid;
    grid-template-columns: repeat(2,1fr);
    grid-gap: 10px;
  `)}
`;
export const WiringContnr = styled.div<{ isComment?: true }>`
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 9px;
  padding: 10px;
  display: flex;
  ${({ isComment }) => isComment && `flex-direction:column;`}
  ${theme.media.tablet(`
    justify-content: space-between;
  `)}
`;
export const NovelImg = styled.div<{ novelImg: string; imgHeight: number }>`
  min-height: 80px;
  height: 100%;
  /* min-width: 70px; */
  min-width: ${({ imgHeight }) => imgHeight * 0.8}px;
  border-radius: 5%;
  background-image: url(${({ novelImg }) =>
    novelImg ||
    "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260"});
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
         font-weight: 600;
         `
      : `color: rgba(0,0,0,0.5);
         font-size: 15px;
         font-weight: 600;
        `}
`;
export const UserContnr = styled.div<{ talkId?: string }>`
  display: flex;
  color: rgba(0, 0, 0, 0.6);

  ${({ talkId }) => (talkId ? ` font-weight: 600; ` : ``)}
  font-size: 15px;
  margin-top: -2px;
  margin-bottom: 2px;
  margin-left: 0px;
`;
export const WritingUserName = styled.span<{ talkId?: string }>`
  margin-right: 10px;

  ${({ talkId }) =>
    talkId
      ? ``
      : `
        font-weight: 600;
        font-size: 14px;
      `}
`;
export const CreateDate = styled.span`
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
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

export const HeartIcon = styled(Icon.Heart)``;
export const CommntIcon = styled(Icon.Comment)``;
export const IconNoInfo = styled.span`
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: -1px;
`;
export const NovelTitle = styled.p<{ talkId?: string }>`
  margin: 0;
  ${({ talkId }) =>
    talkId
      ? `font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;`
      : `color: rgba(0,0,0,0.8);
    font-weight: 600;
    font-size: 16px;`}
`;
export const FilterContnr = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 25px;

  margin: 16px 0 12px 4px;
`;
type FilterType = "프리톡" | "추천" | "댓글";
export const Filter = styled.p<{ category: FilterType; selectedCtgr: FilterType }>`
  margin: 0;
  font-weight: 600;
  color: rgba(100, 100, 100, 0.6);
  ${({ category, selectedCtgr }) =>
    category === selectedCtgr &&
    `color:${theme.color.main}; border-bottom: 3px solid ${theme.color.mainLight};`}
`;
export const CommentContentContnr = styled.div`
  display: flex;
  align-items: flex-end;
`;
export const CommentContent = styled.p`
  margin: 0;
  margin-right: 10px;
  color: rgba(0, 0, 0, 0.8);
  font-weight: 600;
`;
export const CommentTalkTitle = styled.p`
  margin: 0;
  margin-top: -2px;
  margin-bottom: 2px;

  display: flex;
  align-items: center;

  color: rgba(130, 130, 130, 0.9);
  font-size: 15px;
  /* font-weight: 600; */
`;
export const CommentNovelTitle = styled.p`
  margin: 0;
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  font-weight: 600;
`;
export const WritingMark = styled.span`
  color: rgba(0, 0, 0, 0.5);
  font-size: 14px;
`;
