import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

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

  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;
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

  ${theme.media.mobile(`
    color: rgba(0, 0, 0, 0.4);
    min-width: 25px;
    max-width: 25px;
    min-height: 25px;
    max-height: 25px;
  `)}

  ${theme.media.tablet(`
    color: rgba(0, 0, 0, 0.4);
    min-width: 27px;
    max-width: 27px;
    min-height: 27px;
    max-height: 27px;
  `)}
`;

export const PlatformIconBox = styled.div`
  display: flex;
  align-items: center;

  background-color: rgba(255, 255, 255, 0.6);
  border-radius: 50%;

  ${theme.media.mobile(`
    color: rgba(0, 0, 0, 0.4);
    min-width: 25px;
    max-width: 25px;
    min-height: 25px;
    max-height: 25px;
  `)}

  ${theme.media.tablet(`
    color: rgba(0, 0, 0, 0.4);
    min-width: 27px;
    max-width: 27px;
    min-height: 27px;
    max-height: 27px;
  `)}
`;

export const InfoIconBox = styled.div`
  display: flex;
  align-items: center;
  gap: 0px;

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

  ${theme.media.mobile(`
    border-bottom: 1px dotted rgba(100, 100, 100, 0.2);
  `)}

  ${theme.media.tablet(`
    border-bottom: 0;
  `)}
`;

export const NovelDescMobile = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  padding: 8px 0;
  gap: 3px;
  border-bottom: 1px solid rgba(100, 100, 100, 0.2);
`;

export const NovelDescPreview = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;

  white-space: normal;
  text-align: left;
  word-wrap: break-word;
`;

export const NovelDescTablet = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 5px;
  padding: 3px 5px;

  overflow: scroll;

  white-space: pre-wrap; // for line break

  ${theme.media.tablet(`
    border: 1px solid rgba(100, 100, 100, 0.2);
    border-radius: 5px;
  `)}

  ${theme.hideScrollBar}
`;

export const NovelDescFull = styled.div`
  width: 100%;
  height: 120px;

  overflow: scroll;
  ${theme.hideScrollBar}

  @media screen and (max-width: 767px) {
    white-space: pre-line; // line break
  }
  @media screen and (min-width: 768px) {
    white-space: pre-wrap; // line break including tab
  }
`;
export const ArrowIconBox = styled.div`
  z-index: 1;

  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  min-width: 20px;
  max-width: 20px;
  min-height: 20px;
  max-height: 20px;

  cursor: pointer;
  color: rgba(0, 0, 0, 0.3);

  @media screen and (min-width: 768px) {
    margin-left: 3px;
  }

  @media (hover: hover) {
    &:hover {
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

  font-weight: 500;

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

  border: 1px solid rgba(100, 100, 100, 0.2);
  border-radius: 10px;

  margin-left: 10px;

  // width : 100% - (width in NovelImgBox) - (margin-left in this component)
  ${theme.media.mobile(`
    width: calc(100% - 27% - 10px);
    padding: 10px;
    justify-content: space-evenly;
  `)}

  ${theme.media.tablet(`
    width: calc(100% - 24% - 10px);
    padding: 8px 10px 10px 10px;
    justify-content: space-between;
  `)}
`;

export const NovelImgBox = styled.div`
  position: relative;
  cursor: pointer;

  min-width: 100px;

  ${theme.media.mobile(`
    width: 27%;
  `)}
  ${theme.media.tablet(`
    width: 24%;
  `)}

  ${theme.media.hover(`
    opacity: 0.7;
  `)}
`;

/* 가로세로 비율 맞추기 in div */
// padding-top: 135%; // 카카오페이지
// padding-top: 146%; // 시리즈, 리디북스
/* padding-top: ${({ novelImg }) =>
    novelImg.includes("dn-img-page.kakao.com") ? "135%" : "146%"};
*/
export const NovelImgSmall = styled.div<{ novelImg: string }>`
  padding-top: 135%; // 카카오 페이지 이미지 비율

  border-radius: 5%;

  ${({ novelImg }) => {
    if (novelImg) return `background-image: url(${novelImg});`;

    return `border: 1px solid #e5e5e5;`;
  }}

  background-position: center; // 다른 컴포넌트의 작품 이미지도 center로 맞출까
  background-repeat: no-repeat;
  background-size: cover;

  ${theme.media.tablet(`
    height: 100%;
  `)}
`;

export const NovelTitle = styled.div`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;

  font-weight: 500;

  ${theme.media.mobile(`
    font-size: 17px;
  `)}
  ${theme.media.tablet(`
    font-size: 21px;
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
`;
export const NovelInfoAgeMobile = styled.div`
  font-size: 12px;
  line-height: 1.9;
`;
export const NovelInfoTablet = styled.div``;
export const NovelAboveDescTablet = styled.div`
  width: 100%;

  ${theme.media.tablet(`
    padding: 0px 2px 3px 2px;
  `)}
`;

export const NoContent = styled.div<{ isForOtherNovels?: true }>`
  border: 1px solid rgba(50, 50, 50, 0.1);
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ isForOtherNovels }) => isForOtherNovels && `margin-top: 12px;`}

  ${theme.media.mobile(`
    padding: 10px;
  `)}

  ${theme.media.tablet(`
    padding: 17px;
  `)}
`;
