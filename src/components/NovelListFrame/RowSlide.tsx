import { ReactNode, useRef, useState } from "react";
import { useComponentWidth, useWhetherItIsDesktop } from "utils";
import { CategoryMark } from "components/CategoryMark";
import { Img } from "store/serverAPIs/types";
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

export function RowSlideSimple({ novelNO, children }: { novelNO: number; children: ReactNode }) {
  const albumContainerRef = useRef<HTMLDivElement>(null);
  const showAlbumWidth = useComponentWidth(albumContainerRef); // 보이는 앨범 width

  const [albumX, changeAlbumX] = useState(0); // 현재 이미지앨범 X좌표 : 최초 0
  const currentPage = useRef(1); // 현재 앨범 페이지
  const lastPageNO = novelNO % 6 === 0 ? novelNO / 6 : Math.floor(novelNO / 6) + 1; // 마지막 페이지 번호
  const isNextArrow = novelNO > 6 && currentPage.current < lastPageNO; // 다음 화살표 표시 여부

  // 좌우 화살표 클릭 시 앨범 x 좌표 변경 ----//
  const slideAlbum = (x: number) => {
    changeAlbumX(x);
  };

  return (
    <RowSlideContainer>
      <RowAlbumContainer ref={albumContainerRef}>
        <RowAlbum moveX={albumX}>{children}</RowAlbum>
      </RowAlbumContainer>
      {/* 이전 이미지 화살표(맨 처음 페이지 제외) */}
      {currentPage.current > 1 && (
        <LeftIcon
          onClick={() => {
            slideAlbum(albumX + showAlbumWidth);
            currentPage.current -= 1;
          }}
        >
          <SlideLeft />
        </LeftIcon>
      )}
      {/* 다음 이미지 화살표(맨 끝 페이지 제외) */}
      {isNextArrow && (
        <RightIcon
          onClick={() => {
            slideAlbum(albumX - showAlbumWidth);
            currentPage.current += 1;
          }}
        >
          <SlideRight />
        </RightIcon>
      )}
    </RowSlideContainer>
  );
}

type Props = React.PropsWithChildren<{
  novelNo: number;
  categoryText: string;
  novelListInSlide?: {
    user: {
      userImg: Img;
      userName: string;
    };
    path: string;
    listId: string;
  };
  categoryFilter?: ReactNode;
}>;

export default function RowSlide({
  categoryText,
  novelNo,
  novelListInSlide,
  categoryFilter,
  children,
}: Props) {
  const albumContainerRef = useRef<HTMLDivElement>(null);
  const showAlbumWidth = useComponentWidth(albumContainerRef); // 보이는 앨범 width

  const [albumX, changeAlbumX] = useState(0); // 현재 이미지앨범 X좌표 : 최초 0
  const currentPage = useRef(1); // 현재 앨범 페이지
  const lastPageNO = novelNo % 6 === 0 ? novelNo / 6 : Math.floor(novelNo / 6) + 1; // 마지막 페이지 번호
  const isNextArrow = novelNo > 6 && currentPage.current < lastPageNO; // 다음 화살표 표시 여부

  // 좌우 화살표 클릭 시 앨범 x 좌표 변경 ----//
  const slideAlbum = (x: number) => {
    changeAlbumX(x);
  };

  const isDesktop = useWhetherItIsDesktop();

  return (
    <RowBG>
      <CategoryMark
        categoryText={categoryText}
        novelNo={novelNo}
        novelListInSlide={novelListInSlide}
      />
      {categoryFilter}
      <RowSlideContainer>
        <RowAlbumContainer ref={albumContainerRef}>
          <RowAlbum moveX={albumX}>{children}</RowAlbum>
        </RowAlbumContainer>

        {/* 이전 이미지 화살표(맨 처음 페이지 제외) */}
        {isDesktop && currentPage.current > 1 && (
          <LeftIcon
            onClick={() => {
              slideAlbum(albumX + showAlbumWidth);
              currentPage.current -= 1;
            }}
          >
            <SlideLeft />
          </LeftIcon>
        )}
        {/* 다음 이미지 화살표(맨 끝 페이지 제외) */}
        {isDesktop && isNextArrow && (
          <RightIcon
            onClick={() => {
              slideAlbum(albumX - showAlbumWidth);
              currentPage.current += 1;
            }}
          >
            <SlideRight />
          </RightIcon>
        )}
      </RowSlideContainer>
    </RowBG>
  );
}
