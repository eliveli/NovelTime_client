import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

export const UserRankCntnr = styled.div`
  /* display: flex;
  flex-direction: column; */
  display: grid;
  justify-content: space-between;
  column-gap: 10px;
  grid-template-columns: repeat(2, 1fr);

  @media screen and (min-width: 500px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media screen and (min-width: 700px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
export const UserContnr = styled.div`
  display: flex;
  align-items: center;
`;
export const UserImg = styled.div<{ userImg: string }>`
  border-radius: 50%;
  min-width: 50px;
  height: 50px;
  background-image: url(${({ userImg }) =>
    userImg || "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png"});

  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;

  white-space: nowrap;
`;
export const UserName = styled.span``;
export const UserAct = styled.span``;
export const FilterContnr = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 25px;

  margin: 16px 0 12px 4px;
`;
export const Filter = styled.p<{ category: string; selectedCtgr: string }>`
  margin: 0;
  font-weight: 500;
  color: rgba(100, 100, 100, 0.6);
  ${({ category, selectedCtgr }) =>
    category === selectedCtgr &&
    `color:${theme.color.main}; border-bottom: 3px solid ${theme.color.mainLight};`}
`;
