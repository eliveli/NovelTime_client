import theme, { styled } from "assets/styles/theme";
import Icon from "assets/Icon";

export const NovelImgBG = styled.div`
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 100%;
  /* overflow: scroll; */
  display: flex;
  /* flex-direction: column; */
  justify-content: center;
  align-items: center;
  background-color: black;
`;
export const NovelImgContainer = styled.div`
  width: 100%;
  /* height: 100%; */

  display: flex;
  flex-direction: column-reverse;
  justify-content: center;

  position: relative;
`;

export const NovelImgBig = styled.div<{ src: string }>`
  padding-top: 135%;

  background-image: url(${({ src }) => src});
  /* background-position: center; */
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  ${theme.media.tablet(`
    width: auto;
    height: 100%;
 `)}
`;

// export const NovelImgBox = styled.div`
//   width: 20%;
//   min-width: 100px;
// `;
// export const NovelImgSmall = styled.div<{src:string}>`
//   padding-top: 135%;

//   background-image: url(${(props) => props.theme.novelImg});
//   /* background-position: center; */
//   background-repeat: no-repeat;
//   background-size: cover;
// `;
export const ClosingBox = styled.div`
  z-index: 1;

  align-self: flex-end;
  /* border-radius: 50%; */
  background-color: white;
  border: 3px double rgba(150, 150, 150, 0.3);
  border-radius: 7px;
  padding: 6px;

  position: absolute;
  top: 0;
  right: 0;

  min-width: 40px;
  max-width: 40px;
  min-height: 40px;
  max-height: 40px;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  }
`;
export const ClosingIcon = styled(Icon.Close)`
  width: 100%;
  height: 100%;
  opacity: 0.4;
  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;
