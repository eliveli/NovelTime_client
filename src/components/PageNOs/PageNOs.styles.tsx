import theme, { styled } from "assets/styles/theme";

import Icon from "../../assets/Icon";

export const PageNOsAndArrowBtn = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 7px 0;
  gap: 12px;
`;

export const PageNOsBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  font-size: 19px;
`;

export const PageNo = styled.span<{ currentNo: number; selectedNo: number }>`
  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }
  }

  ${({ currentNo, selectedNo }) =>
    currentNo === selectedNo
      ? `color: ${theme.color.mainLight}; font-weight: 600;`
      : "color: rgba(0, 0, 0, 0.6)"};
`;

export const IconBox = styled.div`
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  width: 22px;
  height: 22px;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.1);
    }
  }
`;

export const LeftBtn = styled(Icon.SmallLeft)`
  color: rgba(100, 100, 100, 0.4);

  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;
export const RightBtn = styled(Icon.SmallRight)`
  color: rgba(100, 100, 100, 0.4);

  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;
