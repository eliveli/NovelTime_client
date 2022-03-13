/* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import { useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import useComponentWidth from "utils/useComponentWidth";

import {
  NovelsBG,
  ColumnBG,
  RowSlideContainer,
  SlideLeft,
  SlideRight,
  LeftIcon,
  RightIcon,
  RowAlbumContainer,
  RowAlbum,
} from "./NovelList.styles";

type MyComponentProps = React.PropsWithChildren<{ imgHeight?: number }>;

interface TextProps {
  novelImg: string;
  userImg: string;
}
export default function Novels({ children }: MyComponentProps) {
  return <NovelsBG>{children}</NovelsBG>;
}

Novels.RowSlide = function ({ imgHeight = 168.22, children }: MyComponentProps) {
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
    <RowSlideContainer>
      <RowAlbumContainer ref={albumContainerRef}>
        <RowAlbum moveX={albumX} ref={albumRef}>
          {children}
        </RowAlbum>
      </RowAlbumContainer>
      {/* 이전 이미지 화살표(맨 처음 이미지일 때 제외) */}
      {albumX !== 0 && (
        <LeftIcon onClick={() => slideAlbum(albumX + showAlbumWidth)} imgHeight={imgHeight}>
          <SlideLeft />
        </LeftIcon>
      )}
      {/* 다음 이미지 화살표(맨 끝 이미지일 때 제외) */}
      {albumX - showAlbumWidth >= -albumWidth && (
        <RightIcon onClick={() => slideAlbum(albumX - showAlbumWidth)} imgHeight={imgHeight}>
          <SlideRight />
        </RightIcon>
      )}
    </RowSlideContainer>
  );
};
Novels.ColumnSlide = function ({ children }: MyComponentProps) {
  return <ColumnBG>{children}</ColumnBG>;
};
