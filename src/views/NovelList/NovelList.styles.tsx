import Icon from "assets/Icon";
import { styled } from "assets/styles/theme";

export const SearchIconBox = styled(Icon.IconBox)`
  border-radius: 11px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 5px;
  min-width: 38px;
  max-width: 38px;
  min-height: 38px;
  max-height: 38px;
`;
export const IconContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
`;
