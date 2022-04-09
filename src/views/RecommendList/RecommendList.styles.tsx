import { styled } from "assets/styles/theme";
import Icon from "../../assets/Icon";

interface Props {
  theme: { novelImg: string; userImg: string };
}

export const RightIcon = styled(Icon.ListRight)`
  margin: auto 0 auto 6px;

  /* 태블릿, PC */
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

export const Text = styled.article`
  /* 모바일 */
  width: 100%;
  padding: 12px 0 6px;
  /* padding: 12px 6px 6px; */
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  &:last-child {
    border-bottom: 0;
  }

  display: flex;
  flex-direction: column;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    flex-direction: row;
    padding: ${16 - 2}px 0 16px; // children인 두 컨테이너에 margin-top 2px임. 합하면 위쪽 간격 16px로써 아래 간격과 같음
  }
  /* PC */
  @media screen and (min-width: 1024px) {
  }
`;
export const LastLineContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  /* border-bottom: 1px solid rgba(100, 100, 100, 0.1); */
`;
export const UserContainer = styled.div`
  width: 100%;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    margin-top: 2px;
    padding-left: 16px;

    border-left: 8px dashed rgba(0, 0, 0, 0.1);

    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  /* PC  */
  @media screen and (min-width: 1024px) {
  }
`;

export const NovelContainer = styled.div`
  display: flex;
  width: 100%;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    margin-top: 2px;
    box-shadow: 0 0 2px rgb(0 0 0 / 10%);
    /* border-right: 8px solid gray; */
  }
`;
export const NovelInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-left: 6px;
  width: 100%;

  /* 태블릿 , PC */
  @media screen and (min-width: 768px) {
    margin-left: 10px;
    justify-content: space-evenly;
  }
`;

export const NovelImg = styled.div<Props>`
  /* 모바일 */
  height: 80px;
  min-width: 70px;
  border-radius: 5%;
  background-image: url(${(props) => props.theme.novelImg});
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    height: 100px;
  }
  /* PC */
  @media screen and (min-width: 1024px) {
  }
`;
export const UserImg = styled.div<Props>`
  border-radius: 50%;
  min-width: 20px;
  height: 20px;
  background-image: url(${(props) => props.theme.userImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;
export const UserNameBox = styled.div`
  display: flex;

  /* 태블릿, PC */
  @media screen and (min-width: 768px) {
    border-bottom: 1px dotted #80808085;
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
export const TalkPreview = styled.div`
  border-radius: 5px;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  padding: 0 6px;
  margin-bottom: 7px;
  margin-top: 8px;

  display: flex;
  justify-content: space-between;

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    margin: 0;
    margin-bottom: 10px;
    padding: 0px 8px;

    height: 62px; //패딩 등 바뀌면 변경해야 함
  }
  /* PC */
  @media screen and (min-width: 1024px) {
  }
`;
export const TalkTitle = styled.div`
  padding: 3px 1px 3px 0;

  font-weight: 600;

  /* font-size: 17px; */

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    padding: 7px 10px 7px 2px;

    //텍스트 가운데정렬 : 2줄 엘립시스 적용으로 인해 설정 무시됨
    // display: flex;
    // align-content: center;
    // align-items: center;

    //2줄 넘어가는 텍스트 ...표시
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    white-space: normal;
    height: 52px; // 화면 표시되는 것 보며 맞춰야 함
    text-align: left;
    word-wrap: break-word;
  }
  /* PC */
  @media screen and (min-width: 1024px) {
  }
`;

export const IconBox = styled.div`
  display: flex;
  gap: 6px;
  align-items: center;
`;
export const IconNO = styled.span``;
export const NovelTitle = styled.div<{ contnrWidth: number }>`
  font-weight: 600;

  // 줄 넘어가면 ... 표시
  display: inline-block;

  // at mobile
  width: ${(props) => props.contnrWidth - 70 - 6}px;
  // at tablet, desktop
  @media screen and (min-width: 768px) {
    width: ${({ contnrWidth }) => contnrWidth / 2 - 12 - (70 + 10) - 10}px;
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const NovelSubInfoBox = styled.div`
  color: ${(props) => props.theme.color.textGray};
  font-weight: 600;
  font-size: 14px;
`;
export const NovelInfoLineHeight = styled.div`
  line-height: 1.9;
`;
export const NovelInfo = styled.div``;

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
