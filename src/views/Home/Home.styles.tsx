import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

export const UserRankCntnr = styled.div<{ contnrWidth: number }>`
  /* display: flex;
  flex-direction: column; */

  gap: 10px;
  display: inline-flex;

  width: ${({ contnrWidth }) => contnrWidth - 32}px;
  overflow-x: scroll;
  ${theme.hideScrollBar}

  padding: 2px;

  /* 
  display: grid;
  justify-content: space-between;
  gap: 10px;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (min-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 640px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media screen and (min-width: 790px) {
    grid-template-columns: repeat(5, 1fr);
  } */
`;
export const UserContnr = styled.div`
  min-width: 135px;

  display: flex;
  align-items: center;
  position: relative;

  /* border: 1px solid lightgray; */
  box-shadow: 0 0 3px rgb(200 200 200 / 90%);
  border-radius: 10px;
  padding: 10px;
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
  width: 24px;
  text-align: center;
  font-size: 22px;
  line-height: 22px;
  /* border: 3px double lightgray; */

  border: 3px double rgba(200, 200, 200, 0.4);
  color: rgba(100, 100, 100, 0.8);
  padding: 0 4px 2px;
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

  @media screen and (min-width: 600px) {
    gap: 6px;
  }
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

export const SectionTitleContnr = styled.div``;

export const SectionTitle = styled.p`
  margin: 0;
  margin-top: 16px;
  color: rgba(0, 0, 0, 0.5);
  line-height: 16px; // font-size === line-height
`;
export const FilterContnr = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 25px;

  margin: 4px 0 12px 4px;
`;
export const Filter = styled.p<{ category: string; selectedCtgr: string }>`
  margin: 0;
  font-weight: 500;
  color: rgba(100, 100, 100, 0.6);
  ${({ category, selectedCtgr }) =>
    category === selectedCtgr &&
    `color:${theme.color.main}; border-bottom: 3px solid ${theme.color.mainLight};`}
`;
