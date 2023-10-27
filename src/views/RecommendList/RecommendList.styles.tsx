import theme, { styled } from "assets/styles/theme";
import { Img } from "store/serverAPIs/types";
import Icon from "../../assets/Icon";

export const RightIcon = styled(Icon.ListRight)`
  @media screen and (max-width: 767px) {
    margin: auto 0 auto 6px;
  }

  @media screen and (min-width: 768px) {
    margin-left: 8px;
  }
`;

export const RightIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(100, 100, 100, 0.5);

  border-left: 1px solid ${(props) => props.theme.color.lightGray0_1};
`;

export const Text = styled.article<{ isLast?: boolean }>`
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);

  &:last-of-type {
    // it does not work when element is article
    border-bottom: 0;
  }

  // this is used in home page
  ${({ isLast }) => isLast && `border-bottom: 0;`}

  display: flex;
  flex-direction: column;

  @media screen and (max-width: 767px) {
    width: 100%;
    padding: 12px 0 6px;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding: 16px 0;
  }

  ${theme.media.hover(
    `cursor: pointer;
     opacity: 0.7;`,
  )}
`;

export const UserContainer = styled.div`
  @media screen and (max-width: 767px) {
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    width: calc(50% + 8px);

    padding-left: 16px;
    border-left: 8px dashed rgba(0, 0, 0, 0.1);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const NovelContainer = styled.div<{ isDesc: boolean }>`
  display: flex;

  ${({ isDesc }) => isDesc && `align-items: center;`}

  @media screen and (max-width: 767px) {
    width: 100%;
  }

  @media screen and (min-width: 768px) {
    box-shadow: 0 0 2px rgb(0 0 0 / 10%);
    width: calc(50% - 8px);
  }
`;

export const LastLineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const NovelInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: calc(100% - 70px);

  @media screen and (max-width: 767px) {
    padding-left: 6px;
  }

  @media screen and (min-width: 768px) {
    padding-left: 10px;
    padding-right: 10px;
    justify-content: space-evenly;
  }
`;

export const NovelImg = styled.div<{ novelImg: string }>`
  @media screen and (max-width: 767px) {
    height: 80px;
  }

  @media screen and (min-width: 768px) {
    height: 100px;
  }

  min-width: 70px;
  border-radius: 5%;

  ${({ novelImg }) => {
    if (novelImg) {
      return `
        background-image: url(${novelImg});
    `;
    }

    return `border: 1px solid #e5e5e5;`;
  }}

  background-repeat: no-repeat;
  background-size: cover;
`;

export const NovelTitle = styled.div`
  font-weight: 500;

  display: inline-block;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NovelSubInfoBox = styled.div`
  color: ${(props) => props.theme.color.textGray};
  font-weight: 500;
  font-size: 14px;
`;
export const NovelInfoLineHeight = styled.div`
  line-height: 1.9;
`;
export const NovelInfo = styled.div``;

export const UserImg = styled.div<{ userImg: Img }>`
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  background-image: url(${({ userImg }) => userImg.src});
  background-position: ${({ userImg }) => userImg.position || "center"};
  background-repeat: no-repeat;
  background-size: cover;
`;
export const UserNameBox = styled.div`
  display: flex;
  color: rgba(100, 100, 100, 0.9);

  @media screen and (min-width: 768px) {
    border-bottom: 1px dotted lightgray;
  }
`;

export const UserName = styled.p`
  margin: 0;
  padding-left: 6px;
`;
export const CreateDate = styled.p`
  margin: 0;
  padding-left: 12px;
`;
export const RecommendPreview = styled.div<{ isDesc: boolean }>`
  display: flex;
  justify-content: space-between;

  border-radius: 5px;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  width: 100%;

  @media screen and (max-width: 767px) {
    margin-top: 8px;
    margin-bottom: 7px;
    padding: 0 6px;
  }

  @media screen and (min-width: 768px) {
    margin-bottom: 10px;
    padding: 0 8px;
  }
`;

export const TitleAndDescContainer = styled.div`
  padding: 6px 8px 3px 4px;

  @media screen and (max-width: 767px) {
    width: calc(100% - 23px); // 100% - (width in RightIconBox)
  }

  @media screen and (min-width: 768px) {
    width: calc(100% - 25px); // 100% - (width in RightIconBox)
  }
`;

export const RecommendTitleOnDesc = styled.div`
  font-weight: 500;

  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  // set ellipsis line to 1
`;

export const RecommendDesc = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3; // set ellipsis line to 3
  -webkit-box-orient: vertical;

  white-space: normal;
  text-align: left;
  word-wrap: break-word;
`;

export const RecommendTitleContainer = styled.div`
  @media screen and (max-width: 767px) {
    padding: 9px 5px;
    width: calc(100% - 23px); // 100% - (width in RightIconBox)
  }

  @media screen and (min-width: 768px) {
    padding: 6px 8px 4px 4px;
  }
`;

export const RecommendTitle = styled.div`
  font-weight: 500;

  @media screen and (max-width: 767px) {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    // set ellipsis line to 1
  }

  @media screen and (min-width: 768px) {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; // set ellipsis line to 2
    -webkit-box-orient: vertical;

    white-space: normal;
    text-align: left;
    word-wrap: break-word;
  }
`;

export const IconBox = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
  color: rgba(100, 100, 100, 0.9);
`;
export const IconNO = styled.span`
  font-size: 17px;
`;

// (구분) img vs div의 backgorund-image (하기)
// <img src="" />
// : 받아오는 이미지 소스의 height를 그대로 가져올 때
// <div style={{
//   background-image: url("");
//   background-position: center;
//   background-repeat: no-repeat;
//   background-size: cover;
// }} />
// : 이미지 height가 고정되어 있어 받아오는 이미지 소스의 height를 변경해야 할 때
// : 이 때 원본이미지 비율이 변경되지 않도록 유지하면서 position만 맞춰주는 것
