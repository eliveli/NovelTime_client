import { styled } from "assets/styles/theme";

export const NovelLink = styled.div<{ isWidth100?: true; isNotNavigation?: true }>`
  min-width: 32%;
  max-width: 32%;

  display: flex;
  flex-direction: column;

  padding: 12px 6px 0;
  /* 슬라이드 양끝 좌우 6px 만큼 다른 컨테이너에 적용 */

  ${({ isWidth100 }) => isWidth100 && `max-width:100%;`}

  @media (hover: hover) {
    &:hover {
      cursor: pointer;

      ${({ isNotNavigation }) =>
        !isNotNavigation &&
        `
        opacity: 0.7;
        color: rgba(100, 100, 100, 0.8);
      `}
    }
  }

  @media screen and (min-width: 560px) {
    min-width: 24%;
    max-width: ${({ isWidth100 }) => (isWidth100 ? "100%" : "24%")};
  }

  @media screen and (min-width: 768px) {
    min-width: 20%;
    max-width: ${({ isWidth100 }) => (isWidth100 ? "100%" : "20%")};
  }

  @media screen and (min-width: 1024px) {
    min-width: 16.66%;
    max-width: ${({ isWidth100 }) => (isWidth100 ? "100%" : "16.66%")};
  }
`;
export const NovelInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  line-height: 1.4;
  margin-top: 3px;
`;
export const NovelImgBox = styled.div`
  width: 100%;
`;
export const NovelImg = styled.div<{ novelImg: string }>`
  padding-top: 135%;
  border-radius: 5%;

  ${({ novelImg }) => !novelImg && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ novelImg }) => novelImg});
  background-repeat: no-repeat;
  background-size: cover;
`;
export const NovelTitleBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 50px; // fasten height regardless of text lines (for both line 1 and 2)
  margin-bottom: 7px;
`;
export const NovelTitle = styled.div`
  font-weight: 500;

  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;

  white-space: normal;
  text-align: left;
  word-wrap: break-word;
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
