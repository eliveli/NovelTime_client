import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

interface Props {
  theme: { novelImg: string; userImg: string };
}
export const IconNumber = styled.span`
  padding-left: 5px;
  font-size: 19px;
  color: rgba(100, 100, 100, 0.6);
`;
export const TextIconBox = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  color: rgba(100, 100, 100, 0.6);

  min-width: 35px;
  max-width: 35px;
  min-height: 35px;
  max-height: 35px;
`;
export const TextIcon = styled(Icon.Text)``;
export const LikeIconBox = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  /* box-shadow: 0 0 2px rgb(0 0 0 / 60%); */
  color: rgba(100, 100, 100, 0.5);

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
export const LikeIcon = styled(Icon.SmallHeart)`
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
export const HandIcon = styled(Icon.Hand)``;
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
export const RunnerIcon = styled(Icon.Runner)``;
export const ReaderIcon = styled(Icon.Reader)``;

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

  padding: 12px 0;
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
  // ?????????,???????????? X. only for Mobile Phone
  ${theme.media.tablet(`
    display:none;
  `)}
`;
export const NovelDescPart = styled.div`
  padding: 5px 3px 5px 0;
  /* padding: 5px 3px 5px 7px; */

  //2??? ???????????? ????????? ...??????
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  white-space: normal;
  height: 58px; //?????? ?????? ??????
  text-align: left;
  word-wrap: break-word;
`;
export const NovelDescTablet = styled.div`
  width: 100%;

  padding: 3px 5px;

  overflow: scroll;
  height: 130px; //?????? ?????? ??????

  white-space: pre-wrap; // line break ??????

  // don't show this in mobile
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
  /* padding: 5px 3px 5px 7px; */
  padding: 5px 3px 5px 0;

  overflow: scroll;
  height: 120px; //?????? ?????? ??????

  white-space: pre-line; // line break ??????

  /* ????????? */
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
  @media (hover: hover) {
    &:hover {
      color: rgba(100, 100, 100, 0.3);
    }
  }
`;
export const UpIcon = styled(Icon.SmallUp)`
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
  platform: "??????????????????" | "????????? ?????????" | "????????????" | "?????????";
}>`
  font-size: 14px;
  margin-right: 5px;

  font-weight: 500;

  :active,
  :hover {
    color: ${({ platform }) =>
      platform === "??????????????????"
        ? "#ffcb0ff7"
        : platform === "????????? ?????????"
        ? "#49e322e0"
        : platform === "????????????"
        ? "#0e6dffe0"
        : platform === "?????????"
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
  /* div??? ???????????? ?????? ?????? ??? */
  padding-top: 135%; //??????????????????
  /* padding-top: 146%; //?????????, ???????????? */
  /* padding-top: ${(props) =>
    props.theme.novelImg.includes("dn-img-page.kakao.com") ? "135%" : "146%"}; */

  border-radius: 5%;

  background-image: url(${(props) => props.theme.novelImg});
  background-position: center; //?????? ??????????????? ?????? ???????????? center??? ??????????????? ???????????????
  background-repeat: no-repeat;
  background-size: cover;

  ${theme.media.tablet(`
    height: 100%;
  `)}
`;
export const NovelTitle = styled.div`
  font-weight: 500;
  font-size: 17px;

  ${theme.media.tablet(`
    font-size: 21px;
    margin-left: -2px;
    margin-top: -1px;
  `)}
`;
export const NovelSubInfoBox = styled.div`
  color: ${(props) => props.theme.color.textGray};
  font-weight: 500;
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
  // ????????? ??? ??????
  ${theme.media.tablet(`
    display: none;
  `)}
`;
export const NovelInfoMobileAge = styled.div`
  font-size: 12px;
  line-height: 1.9;
  // ????????? ??? ??????
  ${theme.media.tablet(`
    display: none;
  `)}
`;
export const NovelInfoTablet = styled.div`
  // ????????? ??? ??????
  ${theme.media.mobile(`
    display: none;
  `)}
`;
export const NovelUpDescBox = styled.div`
  ${theme.media.tablet(`
    padding: 0px 4px 3px 2px;
  `)}
`;
