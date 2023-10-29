import theme, { styled } from "assets/styles/theme";
import { Link } from "react-router-dom";
import { Img } from "store/serverAPIs/types";
import Icon from "../../assets/Icon";

export const CategoryContainer = styled.div`
  margin-bottom: -2px;
  display: flex;
  align-items: flex-end;

  position: relative;
`;

export const LinkCategory = styled(Link)<{ novelNo?: number }>`
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    margin: auto 0 5px auto;
  }
  @media (min-width: 768px) {
    margin: auto 0 1px auto;
  }

  // Not used now
  // 슬라이드의 작품 수가 화면에 최대로 보일 수 있는 작품 수 보다 작으면 버튼 안 보여주기
  @media screen and (max-width: 559px) {
    ${({ novelNo }) => novelNo && novelNo <= 3 && `display:none;`}
  }
  @media screen and (min-width: 560px) and (max-width: 767px) {
    ${({ novelNo }) => novelNo && novelNo <= 4 && `display:none;`}
  }
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    ${({ novelNo }) => novelNo && novelNo <= 5 && `display:none;`}
  }
  @media screen and (min-width: 1024px) {
    ${({ novelNo }) => novelNo && novelNo <= 6 && `display:none;`}
  }

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.7;
      font-weight: 500;
      color: rgba(100, 100, 100, 0.8);
    }
  }
`;

export const CategoryDescContnr = styled.div`
  display: flex;

  ${theme.media.mobile(`
    flex-direction: column;
    align-items: flex-start;
  `)}

  ${theme.media.tablet(`
    align-items: flex-end;
  `)}
`;
export const CategoryDescUserImg = styled.div<{ userImg: Img }>`
  margin-right: 7px;
  border-radius: 50%;
  min-width: 25px;
  height: 25px;

  ${({ userImg }) => !userImg.src && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ userImg }) => userImg.src});
  background-position: ${({ userImg }) => userImg.position || "center"};
  background-repeat: no-repeat;
  background-size: cover;

  ${theme.media.mobile(`
    margin-bottom: -11px;
  `)}
`;
export const CategoryDescUserName = styled.p`
  margin-top: 12px;
  margin-bottom: 0;
  margin-right: 3px;
  font-size: 16px;
`;

export const CategoryDesc = styled.p<{
  fontSize?: number;
  isUserNovelList?: true;
  isEditingBG?: boolean;
}>`
  font-size: ${({ fontSize }) => fontSize || 16}px;

  border-bottom: ${({ isEditingBG, isUserNovelList }) => {
    if (isUserNovelList || isEditingBG) return 0;
    return `1px dotted lightgray`;
  }};

  @media (max-width: 767px) {
    ${({ isUserNovelList }) => {
      if (isUserNovelList) return "margin: 0 0 0 32px;";
      return "margin-bottom: 0;"; // + default margin is set too
    }}

    ${({ isUserNovelList }) =>
      isUserNovelList && "color:rgba(100, 100, 100, 0.7); font-weight: 500;"}
  }

  @media (min-width: 768px) {
    margin-bottom: 0; // + default margin is set too

    ${({ isUserNovelList }) =>
      isUserNovelList && `margin-top: 12px; color:rgba(100, 100, 100, 0.7); font-weight: 500;`}
  }
`;

export const TextToShowAll = styled.span`
  color: rgba(100, 100, 100, 0.6);
  font-weight: 500;
  font-size: 15px;
`;
export const IconToShowAll = styled(Icon.ListRight)`
  margin-left: 6px;
  color: rgba(100, 100, 100, 0.4);
`;
export const CategoryDescUserContnr = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const GoToAllContentBtn = styled.button<{ isEditingBG?: boolean }>`
  white-space: nowrap;

  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  background-color: ${({ isEditingBG }) => (isEditingBG ? "inherit" : "white")};
  padding: 2px 9px 2px 7px;
  margin-left: 12px;

  color: rgba(100, 100, 100, 0.7);
  font-size: 13px;
  font-weight: 500;

  ${theme.media.hover(
    `cursor: pointer;
     opacity: 0.7;`,
  )}
`;
