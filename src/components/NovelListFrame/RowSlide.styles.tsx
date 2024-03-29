import { styled } from "assets/styles/theme";
import Icon from "../../assets/Icon";

export const RowBG = styled.article``;

export const LeftIcon = styled.div`
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  position: absolute;
  width: 30px;
  height: 30px;
  left: -${30 / 2 - 6}px;
  top: ${168.22 / 2 - 30 / 2 + 12}px; // + 12px 은 이미지 위쪽 패딩임

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  }
`;
export const RightIcon = styled.div`
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 2px rgb(0 0 0 / 60%);

  position: absolute;
  width: 30px;
  height: 30px;
  right: -${30 / 2 - 6}px;
  top: ${168.22 / 2 - 30 / 2 + 12}px;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
      opacity: 0.8;
      background-color: rgba(150, 150, 150, 0.3);
    }
  }
`;
export const SlideLeft = styled(Icon.SmallLeft)`
  color: rgba(100, 100, 100, 0.4);

  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;
export const SlideRight = styled(Icon.SmallRight)`
  color: rgba(100, 100, 100, 0.4);

  @media (hover: hover) {
    &:hover {
      color: rgba(0, 0, 0, 0.3);
    }
  }
`;

export const RowAlbumContainer = styled.div`
  @media screen and (max-width: 1023px) {
    overflow-x: scroll;
  }
  @media screen and (min-width: 1024px) {
    overflow: hidden;
  }

  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

// 1.앨범 컨테이너는 자식인 앨범의 위치값이 (0,0) 일 때 (디폴트값) 앨범 전체 스크롤 가능.
// 2.컨테이너 안에 있는 앨범의 위치를 이동할 경우(translate)
//   앨범 컨테이너는 앨범의 이동 위치를 최소값으로 오른쪽으로만 앨범 스크롤 가능
//   - 이동한 위치의 왼쪽은 스크롤 불가
export const RowAlbum = styled.div<{ moveX: number }>`
  display: flex; // children 요소인 작품을 가로 방향으로 나열

  margin-left: -6px;
  margin-right: -6px;

  @media screen and (min-width: 1024px) {
    position: relative;

    transition-duration: 0.9s;
    transform: translate(${({ moveX }) => moveX}px, 0);
  }
`;
export const RowSlideContainer = styled.div`
  @media screen and (min-width: 768px) {
    position: relative;
  }
`;
