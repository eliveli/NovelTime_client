import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

interface Props {
  theme: { novelImg: string; userImg: string };
}
export const IconNumber = styled.span`
  padding-left: 5px;
`;
export const TextIconBox = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  /* box-shadow: 0 0 2px rgb(0 0 0 / 60%); */

  min-width: 35px;
  max-width: 35px;
  min-height: 35px;
  max-height: 35px;

  /* @media screen and (min-width: 768px) {
    margin-left: 3px;
  }
  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  } */
`;
export const TextIcon = styled(Icon.Text)`
  width: 100%;
  height: 100%;
  /* @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  } */
`;
export const LikeIconBox = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  /* box-shadow: 0 0 2px rgb(0 0 0 / 60%); */

  min-width: 35px;
  max-width: 35px;
  min-height: 35px;
  max-height: 35px;

  /* @media screen and (min-width: 768px) {
    margin-left: 3px;
  }
  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  } */
`;
export const LikeIcon = styled(Icon.Heart)`
  width: 100%;
  height: 100%;
  /* @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  } */
`;
export const HandIconBox = styled.div`
  position: absolute;
  bottom: -2px;
  right: -1px;

  padding: 2px 2px 4px 2px;

  display: flex;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  /* box-shadow: 0 0 2px rgb(0 0 0 / 60%); */

  color: rgba(0, 0, 0, 0.4);

  min-width: 25px;
  max-width: 25px;
  min-height: 25px;
  max-height: 25px;

  ${theme.media.tablet(`
    color: rgba(0, 0, 0, 0.4);
    min-width: 27px;
    max-width: 27px;
    min-height: 27px;
    max-height: 27px;
  `)}
`;
export const HandIcon = styled(Icon.Hand)`
  width: 100%;
  height: 100%;
`;
export const PlatformIconBox = styled.div`
  display: flex;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  /* box-shadow: 0 0 2px rgb(0 0 0 / 60%); */

  color: rgba(0, 0, 0, 0.4);

  min-width: 25px;
  max-width: 25px;
  min-height: 25px;
  max-height: 25px;

  ${theme.media.tablet(`
    color: rgba(0, 0, 0, 0.4);
    min-width: 27px;
    max-width: 27px;
    min-height: 27px;
    max-height: 27px;
  `)}
`;
export const RunnerIcon = styled(Icon.Runner)`
  width: 100%;
  height: 100%;
`;
export const ReaderIcon = styled(Icon.Reader)`
  width: 100%;
  height: 100%;
`;

export const InfoIconBox = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: -2px;
  ${theme.media.tablet(`
    margin-bottom: 0;
  `)}
`;
export const NovelContainer = styled.article`
  width: 100%;

  padding: 12px 6px;
`;

export const NovelMainInfo = styled.div`
  display: flex;
  width: 100%;

  padding: 3px 0;
  border-bottom: 1px dotted rgba(100, 100, 100, 0.2);
  ${theme.media.tablet(`
    border-bottom: 0;
  `)}
`;

export const NovelDescMobile = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 3px 0;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
  // 태블릿,데스크탑 X. only for Mobile Phone
  ${theme.media.tablet(`
    display:none;
  `)}
`;
export const NovelDescPart = styled.div`
  padding: 5px 3px 5px 7px;

  //2줄 넘어가는 텍스트 ...표시
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  white-space: normal;
  height: 58px; //화면 보며 조정
  text-align: left;
  word-wrap: break-word;
`;
export const NovelDescTablet = styled.div`
  width: 100%;
  padding: 5px 3px 5px 7px;

  overflow: scroll;
  height: 130px; //화면 보며 조정

  white-space: pre-wrap; // line break 적용

  // 모바일 안 보임. only 태블릿, 데스크탑
  ${theme.media.mobile(`
    display: none;
  `)}

  ${theme.media.tablet(`
    border: 1px solid rgba(100, 100, 100, 0.2);
    border-radius: 5px;
  `)}

  ${theme.hideScrollBar}
`;
export const NovelDescAll = styled.div`
  width: 100%;
  padding: 5px 3px 5px 7px;

  overflow: scroll;
  height: 120px; //화면 보며 조정

  white-space: pre-line; // line break 적용

  /* 태블릿 */
  @media screen and (min-width: 768px) {
    white-space: pre-wrap; // line break with tab
  }

  ${theme.hideScrollBar}
`;
export const DownIconBox = styled.div`
  margin-top: 8px;
  z-index: 1;

  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;

  color: rgba(0, 0, 0, 0.3);

  @media screen and (min-width: 768px) {
    margin-left: 3px;
  }

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  }
`;

export const UpIconBox = styled.div`
  margin-top: 8px;
  z-index: 1;

  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;

  color: rgba(0, 0, 0, 0.3);

  @media screen and (min-width: 768px) {
    margin-left: 3px;
  }
  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  }
`;
export const DownIcon = styled(Icon.SmallDown)`
  width: 100%;
  height: 100%;
  @media (hover: hover) {
    &:hover {
      color: rgba(100, 100, 100, 0.3);
    }
  }
`;
export const UpIcon = styled(Icon.SmallUp)`
  width: 100%;
  height: 100%;
  @media (hover: hover) {
    &:hover {
      color: rgba(100, 100, 100, 0.3);
    }
  }
`;
export const NovelPlatformBox = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 3px 0;
`;

export const PlatformBorder = styled.span`
  display: inline-flex;
  /* align-items: flex-start; */
  /* justify-content: flex-end; */
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
`;
export const PlatformTextBox = styled.div`
  padding-left: 1px;
`;
export const PlatformText = styled.a<{
  platform: "카카오페이지" | "네이버 시리즈" | "리디북스" | "조아라";
}>`
  font-size: 14px;
  margin-right: 5px;

  text-decoration: none;

  font-weight: 600;
  color: #606060b0;

  :active,
  :hover {
    color: ${({ platform }) =>
      platform === "카카오페이지"
        ? "#ffcb0ff7"
        : platform === "네이버 시리즈"
        ? "#49e322e0"
        : platform === "리디북스"
        ? "#0e6dffe0"
        : platform === "조아라"
        ? "#5c9dff"
        : "gray"};
  }
`;
export const NovelInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  margin-left: 10px;
  width: 80%;

  border: 1px solid rgba(100, 100, 100, 0.2);
  padding: 10px;
  border-radius: 10px;

  ${theme.media.tablet(`
  width: 76%;
  padding: 8px 10px 10px 10px;
  justify-content: space-between;
  `)}
`;
export const NovelImgBox = styled.div`
  width: 27%;
  min-width: 100px;

  position: relative;

  ${theme.media.tablet(`
    width: 24%;
  `)}

  ${theme.media.hover(`
    cursor: pointer;
    opacity: 0.7;
  `)}
`;
export const NovelImgSmall = styled.div<Props>`
  /* div로 가로세로 비율 맞출 때 */
  padding-top: 135%; //카카오페이지
  /* padding-top: 146%; //시리즈, 리디북스 */
  /* padding-top: ${(props) =>
    props.theme.novelImg.includes("dn-img-page.kakao.com") ? "135%" : "146%"}; */

  border-radius: 5%;

  background-image: url(${(props) => props.theme.novelImg});
  background-position: center; //다른 컴포넌트의 작품 이미지도 center로 맞춰야하나 말아야하나
  background-repeat: no-repeat;
  background-size: cover;

  ${theme.media.tablet(`
    height: 100%;
  `)}
`;
export const NovelTitle = styled.div`
  font-weight: 600;
  font-size: 17px;

  ${theme.media.tablet(`
    font-size: 21px;
    margin-left: -2px;
    margin-top: -1px;
  `)}
`;
export const NovelSubInfoBox = styled.div`
  color: ${(props) => props.theme.color.textGray};
  font-weight: 600;
  font-size: 14px;

  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  ${theme.media.tablet(`
    margin-top: 6px;
  `)}
`;
export const NovelInfoAuthorBox = styled.div``;
export const NovelInfoAuthor = styled.div`
  line-height: 1.9;
  ${theme.media.mobile(`
    margin-top: 19px;
  `)}
`;
export const NovelInfoMobile = styled.div`
  line-height: 1.2;
  margin-top: 5px;
  // 태블릿 안 보임
  ${theme.media.tablet(`
    display: none;
  `)}
`;
export const NovelInfoMobileAge = styled.div`
  font-size: 12px;
  line-height: 1.9;
  // 태블릿 안 보임
  ${theme.media.tablet(`
    display: none;
  `)}
`;
export const NovelInfoTablet = styled.div`
  // 모바일 안 보임
  ${theme.media.mobile(`
    display: none;
  `)}
`;
export const NovelUpDescBox = styled.div`
  ${theme.media.tablet(`
    padding: 0px 4px 3px 2px;
  `)}
`;
