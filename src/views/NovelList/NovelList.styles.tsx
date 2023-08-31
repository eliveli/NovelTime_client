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
export const Space = styled.div<{ height?: number }>`
  width: 100%;

  height: ${({ height }) => height || 16}px;
`;
export const Note = styled.span`
  font-weight: 500;
  color: rgba(0, 0, 0, 0.4);
  font-size: 13px;

  display: inline-block;

  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 2px 4px;
  border-radius: 3px;
  background-color: white;

  position: absolute;
  left: 112px;
  bottom: 8px;
`;
