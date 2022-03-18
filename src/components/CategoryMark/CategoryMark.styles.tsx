import { styled } from "assets/styles/theme";
import { Link } from "react-router-dom";
import Icon from "../../assets/Icon";

export const CategoryContainer = styled.div`
  padding: 0 6px;
  margin-bottom: -2px;
  display: flex;
  align-items: flex-end;
`;

export const LinkCategory = styled(Link)`
  display: flex;
  align-items: center;
  margin: auto 0 0 auto;

  text-decoration: none;
  color: black;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.7;
      font-weight: 600;
      color: rgba(100, 100, 100, 0.8);
    }
  }
`;

export const CategoryDesc = styled.p`
  margin-bottom: 0;
`;

export const ShowAllText = styled.span`
  /* margin: auto 0 0 auto; */
`;
export const ShowAllIcon = styled(Icon.BigRight)`
  /* margin: auto 0 0 6px; */
  margin-left: 6px;
`;
