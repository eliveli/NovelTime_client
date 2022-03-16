import { useRef, useState } from "react";
// import { ThemeProvider } from "styled-components";
import { useComponentWidth } from "utils";
import { CategoryMark } from "components/NovelCategoryMark";
import {
  RowSlideContainer,
  SlideLeft,
  SlideRight,
  LeftIcon,
  RightIcon,
  RowAlbumContainer,
  RowAlbum,
  RowBG,
} from "./RowSlide.styles";

type Props = React.PropsWithChildren<{ isShowAll?: boolean; category: string }>;

export default function RowSlide({ category, children }: Props) {
  const albumContainerRef = useRef<HTMLDivElement>(null);
  const albumRef = useRef<HTMLDivElement>(null);

  const showAlbumWidth = useComponentWidth(albumContainerRef); // 보이는 앨범 width
  const albumWidth = useComponentWidth(albumRef); // 전체 앨범 width

  // 현재 이미지앨범 X좌표 : 최초 0
  const [albumX, changeAlbumX] = useState(0);

  // 좌우 화살표 클릭 시 앨범 x 좌표 변경 ----//
  const slideAlbum = (x: number) => {
    changeAlbumX(x);
  };

  return (
    <RowBG>
      <CategoryMark category={category} />
      <RowSlideContainer>
        <RowAlbumContainer ref={albumContainerRef}>
          <RowAlbum moveX={albumX} ref={albumRef}>
            {children}
          </RowAlbum>
        </RowAlbumContainer>
        {/* 이전 이미지 화살표(맨 처음 페이지 제외) */}
        {albumX !== 0 && (
          <LeftIcon onClick={() => slideAlbum(albumX + showAlbumWidth)}>
            <SlideLeft />
          </LeftIcon>
        )}
        {/* 다음 이미지 화살표(맨 끝 페이지 제외) */}
        {albumX - showAlbumWidth >= -albumWidth && (
          <RightIcon onClick={() => slideAlbum(albumX - showAlbumWidth)}>
            <SlideRight />
          </RightIcon>
        )}
      </RowSlideContainer>
    </RowBG>
  );
}
