import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

const BoardTitleContainer = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  ${theme.media.mobile(`
    padding: 0 12px;
  `)}
`;
const BoardTitle = styled.p`
  border-radius: 6px;
  padding: 2px 7px 0;
  /* border-bottom: 1px dotted rgba(0, 0, 0, 0.1); */
  border: 1px dotted rgba(0, 0, 0, 0.1);
  display: inline-block;
  margin: 6px 0 16px;
  /* margin: 10px 0 16px; */
  color: rgba(0, 0, 0, 0.6);
  font-weight: 600;
  font-size: 15px;
  ${theme.media.mobile(`
      margin: 0 0 12px;
  `)}
`;

export default function BoardMark({ children }: { children: React.ReactNode }) {
  return (
    <BoardTitleContainer>
      <BoardTitle>{children}</BoardTitle>
    </BoardTitleContainer>
  );
}
