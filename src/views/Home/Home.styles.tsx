import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";
import { Img } from "store/serverAPIs/types";

export const UserRankCntnr = styled.div<{ rankContnrWidth: number }>`
  gap: 10px;
  padding: 2px;
  display: inline-flex;

  width: ${({ rankContnrWidth }) => rankContnrWidth}px;

  overflow-x: scroll;
  ${theme.hideScrollBar}
`;
export const UserContnr = styled.div`
  min-width: 135px;
  display: flex;
  align-items: center;
  position: relative;
  box-shadow: 0 0 3px rgb(200 200 200 / 90%);
  border-radius: 10px;
  padding: 10px;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;
export const UserImg = styled.div<{ userImg: Img }>`
  border-radius: 50%;
  min-width: 45px;
  height: 45px;

  ${({ userImg }) => !userImg.src && `border: 1px solid #e5e5e5;`};

  background-image: url(${({ userImg }) => userImg.src});
  background-position: ${({ userImg }) => userImg.position || "center"};
  background-repeat: no-repeat;
  background-size: cover;

  margin-right: 5px;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  white-space: nowrap;
`;
export const UserRankNO = styled.span`
  margin-bottom: auto;
  margin-left: auto;
  text-align: center;

  white-space: nowrap;

  width: 24px;
  padding: 0 4px 2px;
  font-size: 20px;
  line-height: 20px;

  &:last-child {
    width: 26px;
    padding-left: 3px;
    font-size: 19px;
    line-height: 19px;
  }

  border: 3px double rgba(200, 200, 200, 0.4);
  color: rgba(100, 100, 100, 0.8);
  border-radius: 5px;
  position: absolute;
  top: 0px;
  right: 0px;
  border-right: 1px solid rgba(200, 200, 200, 0.4);
  border-top: 1px solid rgba(200, 200, 200, 0.4);
`;
export const UserName = styled.span`
  font-size: 15px;
  white-space: normal;
`;
export const UserAct = styled.span``;

export const IconContainer = styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
`;
export const IconNO = styled.span`
  font-size: 17px;
`;

export const RankSectionContnr = styled.section`
  margin-bottom: 16px;
  border: 3px double rgba(200, 200, 200, 0.4);
  border-radius: 10px;
  padding: 0 16px 16px;
`;

export const SectionMark = styled.div``;

export const SectionTitle = styled.p`
  margin: 0;
  margin-top: 16px;
  font-size: 15px;
  line-height: 15px; // font-size === line-height
`;
export const TitleNormalStyle = styled.span`
  font-weight: 300;
  color: rgba(0, 0, 0, 0.5);
`;
export const TitleEmphasis = styled.span`
  font-weight: 300;
  color: rgba(0, 0, 0, 0.7);
`;

export const ArrowContnr = styled(Icon.IconBox)`
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);
  color: rgba(100, 100, 100, 0.4);

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  }
`;
export const AllArrowContnr = styled.div`
  margin-left: auto;
  display: flex;
  gap: 10px;
`;

export const BtnToLoadContent = styled.button`
  white-space: nowrap;

  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  background-color: white;
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

export const AddSpace = styled.div<{ height: number }>`
  height: ${({ height }) => height}px;
`;
