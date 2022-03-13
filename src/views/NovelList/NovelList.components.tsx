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
  CategoryContainer,
  CategoryDesc,
  ShowAllContainer,
  RowBG,
  ShowAllText,
  ShowAllIcon,
  ColumnListContainer,
} from "./NovelList.styles";

type MyComponentProps = React.PropsWithChildren<{}>;

interface TextProps {
  novelImg: string;
  userImg: string;
}
export default function Novels({ children }: MyComponentProps) {
  return <NovelsBG>{children}</NovelsBG>;
}

function CategoryMark({ desc }: { desc: string }) {
  return (
    <CategoryContainer>
      <CategoryDesc>{desc}</CategoryDesc>
      <ShowAllContainer>
        <ShowAllText>전체보기</ShowAllText>
        <ShowAllIcon />
      </ShowAllContainer>
    </CategoryContainer>
  );
}
Novels.RowSlide = function ({ children }: MyComponentProps) {
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
      <CategoryMark desc="요즘 인기있는" />
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
};
Novels.ColumnShow = function ({ children }: MyComponentProps) {
  return (
    <ColumnBG>
      <CategoryMark desc="소설계의 박스오피스?" />
      <ColumnListContainer>{children}</ColumnListContainer>
    </ColumnBG>
  );
};
