import Icon from "assets/Icon";
import theme, { styled } from "assets/styles/theme";
import { useWhetherItIsMobile } from "utils";

const WritingPostContainer = styled.div<{ styles?: string }>`
  height: 40px;
  border-radius: 11px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 5px 8px;
  margin-right: 8px;
  gap: 5px;

  display: flex;
  justify-content: center;
  align-items: center;

  ${({ styles }) => styles && styles}

  ${theme.media.hover(
    `cursor: pointer;
    opacity: 0.7;`,
  )}
`;
const WritingText = styled.span`
  color: #808080c4;
  font-size: 14px;
  font-weight: 500;
  margin-top: 1px;
`;

export default function WritingButton({
  clickToWrite,
  styles,
}: {
  clickToWrite: () => void;
  styles?: string;
}) {
  const isNotMobile = !useWhetherItIsMobile();

  return (
    <WritingPostContainer onClick={clickToWrite} styles={styles}>
      <Icon.IconBox hover="none">
        <Icon.Write2 />
      </Icon.IconBox>
      {isNotMobile && <WritingText>글쓰기</WritingText>}
    </WritingPostContainer>
  );
}
