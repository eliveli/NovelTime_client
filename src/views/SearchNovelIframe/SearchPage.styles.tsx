import theme, { styled } from "assets/styles/theme";

export const ContainerToGoTo = styled.div<{ isInAddWriting?: true }>`
  margin-top: 50px;
  display: flex;
  flex-direction: ${({ isInAddWriting }) => (isInAddWriting ? "row" : "column")};
  justify-content: center;
  align-items: center;
`;

export const TextToGoTo = styled.span<{ isMainText?: true }>`
  font-size: 13px;
  font-weight: 500;

  color: ${({ isMainText }) => (isMainText ? "rgba(0, 0, 0, 0.6)" : "rgba(70, 70, 70, 0.6)")};

  margin-top: ${({ isMainText }) => (isMainText ? 0 : 10)}px;
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
