import theme, { styled } from "assets/styles/theme";

const NoContentComponent = styled.div`
  display: flex;
  justify-content: center;
  color: #57555591;
  font-weight: 400;
  font-size: 17px;
  padding: 60px;
  ${theme.media.desktop(`padding:120px;`)}
`;

export default function NoContent() {
  return <NoContentComponent>아직 작성된 글이 없어요</NoContentComponent>;
}
