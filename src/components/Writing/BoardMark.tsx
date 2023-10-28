import theme, { styled } from "assets/styles/theme";

const BoardTitleContainer = styled.div`
  ${theme.media.mobile(`
    padding: 0 12px;
  `)}

  ${theme.media.tablet(`
    padding-left: 20px;
    padding-right: 20px;
  `)}
`;
const BoardTitle = styled.p`
  border-radius: 6px;
  padding: 2px 7px 0;
  border: 1px dotted rgba(0, 0, 0, 0.1);
  display: inline-block;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  font-size: 15px;

  ${theme.media.mobile(`
    margin: 0 0 12px;
  `)}
  ${theme.media.tablet(`
    margin: 6px 0 16px;
  `)}
`;

export default function BoardMark({ children }: { children: React.ReactNode }) {
  return (
    <BoardTitleContainer>
      <BoardTitle>{children}</BoardTitle>
    </BoardTitleContainer>
  );
}
