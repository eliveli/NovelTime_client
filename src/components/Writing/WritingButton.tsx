import Icon from "assets/Icon";
import { styled } from "assets/styles/theme";

const WritingPostContainer = styled.div`
  height: 40px;
  border-radius: 11px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 5px 8px;
  margin-right: 8px;
  gap: 5px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const WritingText = styled.span`
  color: #808080c4;
  font-size: 14px;
  font-weight: 500;
  margin-top: 1px;
`;

export default function WritingButton() {
  return (
    <WritingPostContainer>
      <Icon.IconBox>
        <Icon.Write2 />
      </Icon.IconBox>
      <WritingText>글쓰기</WritingText>
    </WritingPostContainer>
  );
}
