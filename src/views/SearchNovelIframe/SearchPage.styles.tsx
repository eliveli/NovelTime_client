import theme, { styled } from "assets/styles/theme";

export const ContainerToGoTo = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
export const TextToGoTo = styled.span`
  font-size: 13px;
  font-weight: 500;
  color: rgba(0, 0, 0, 0.6);
`;
export const BtnToGoTo = styled.button`
  border-radius: 15px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background-color: white;
  color: rgba(0, 0, 0, 0.6);
  padding: 4px 6px;
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
  margin-left: 10px;

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;
