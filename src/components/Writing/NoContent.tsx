import { styled } from "assets/styles/theme";

const NoContentComponent = styled.div`
  display: flex;
  justify-content: center;
  color: #57555591;
  font-weight: 400;
  font-size: 17px;

  @media (max-width: 1023px) {
    padding: 60px;
  }
  @media (min-width: 1024px) {
    padding: 120px;
  }
`;

export default function NoContent() {
  return <NoContentComponent>아직 작성된 글이 없어요</NoContentComponent>;
}
