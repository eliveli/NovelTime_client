import MainBG from "components/MainBG";
import { Img, ImgSource, NotFoundContainer } from "./NotFound.styles";

export default function NotFound() {
  return (
    <MainBG>
      <NotFoundContainer>
        <Img src="https://i.imgur.com/qa1fp4n.jpg" width="100%" alt="not found" />
        <ImgSource href="http://www.freepik.com">Designed by stories / Freepik</ImgSource>
      </NotFoundContainer>
    </MainBG>
  );
}
