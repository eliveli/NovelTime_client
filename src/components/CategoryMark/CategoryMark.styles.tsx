import theme, { styled } from "assets/styles/theme";
import { Link } from "react-router-dom";
import { Img } from "store/serverAPIs/types";
import Icon from "../../assets/Icon";

export const CategoryContainer = styled.div`
  /* padding: 0 6px; */
  margin-bottom: -2px;
  display: flex;
  align-items: flex-end;

  position: relative;
`;

export const LinkCategory = styled(Link)<{ isUserMark?: boolean; novelNO?: number }>`
  display: flex;
  align-items: center;
  margin: auto 0 0 auto;

  ${({ isUserMark }) =>
    isUserMark &&
    theme.media.mobile(`
    margin-bottom: 5px;
  `)}

  /* 슬라이드의 작품 수가 화면에 최대로 보일 수 있는 작품 수 보다 작으면 버튼 안 보여주기 */
    ${({ novelNO }) => novelNO && novelNO <= 3 && `display:none;`}
  @media screen and (min-width: 560px) {
    ${({ novelNO }) => novelNO && novelNO <= 4 && `display:none;`}
  }
  @media screen and (min-width: 768px) {
    ${({ novelNO }) => novelNO && novelNO <= 5 && `display:none;`}
  }
  @media screen and (min-width: 1024px) {
    ${({ novelNO }) => novelNO && novelNO <= 6 && `display:none;`}
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
  align-items: flex-end;

  ${theme.media.mobile(`
    flex-direction: column;
    align-items: flex-start;
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
export const CategoryDescUserName = styled.p<{ fontSize?: number }>`
  margin-top: 12px;
  margin-bottom: 0;
  /* border-bottom: 1px dotted #0000004f; */
  font-size: ${({ fontSize }) => fontSize || 16}px;
`;
export const CategoryDesc = styled.p<{
  fontSize?: number;
  isUserNovelList?: true;
  isUserMark?: boolean;
}>`
  margin-bottom: 0;
  border-bottom: 1px dotted lightgray;
  font-size: ${({ fontSize }) => fontSize || 16}px;
  ${({ isUserNovelList }) =>
    isUserNovelList &&
    `margin-top: 12px; border-bottom: 0; color: rgba(0,0,0,0.5); font-weight:600;`}

  ${({ isUserMark }) =>
    isUserMark &&
    theme.media.mobile(`
      margin: 0;
      margin-left: 32px;
  `)}
`;

export const ShowAllText = styled.span<{ isUserNovelList?: true }>`
  /* margin: auto 0 0 auto; */

  ${({ isUserNovelList }) =>
    isUserNovelList &&
    theme.media.mobile(`
    display:none;
  `)}
  ${({ isUserNovelList }) =>
    isUserNovelList &&
    `
    color: rgba(0,0,0,0.5);
    font-weight: 500;
    font-size: 15px;
    `}
`;
export const ShowAllIcon = styled(Icon.ListRight)`
  /* margin: auto 0 0 6px; */
  margin-left: 6px;
  color: rgba(100, 100, 100, 0.5);
`;
export const CategoryDescUserContnr = styled.div`
  display: flex;
  align-items: flex-end;
`;

export const GoToAllContentBtn = styled.button`
  white-space: nowrap;

  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  background-color: white;
  padding: 2px 9px 2px 7px;
  margin-left: 12px;

  color: rgba(100, 100, 100, 0.7);
  font-size: 13px;
  font-weight: 500;
`;
