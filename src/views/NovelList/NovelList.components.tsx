/* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import { useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
import useComponentWidth from "utils/useComponentWidth";

import {
  CreateDate,
  LastLineContainer,
  NovelImg,
  UserName,
  NovelsBG,
  Text,
  UserNameBox,
  IconBox,
  TalkTitle,
  NovelTitle,
  IconNO,
  TalkPreview,
  UserContainer,
  NovelContainer,
  NovelInfoBox,
  UserImg,
  NovelInfo,
  NovelSubInfoBox,
  NovelInfoLineHeight,
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

Novels.RowSlide = function ({ imgHeight = 133, children }: MyComponentProps) {
  const albumContainerRef = useRef<HTMLDivElement>(null);
  const albumRef = useRef<HTMLDivElement>(null);

  const showAlbumWidth = useComponentWidth(albumContainerRef); // 보이는 앨범 width
  const albumWidth = useComponentWidth(albumRef); // 전체 앨범 width

  // 현재 이미지앨범 X좌표 : 최초 0
  const [albumX, changeAlbumX] = useState(0);

  // 좌우 화살표 클릭 시 앨범 x 좌표 변경 ----//
  const slideAlbum = (x: number) => {
    changeAlbumX(x);
    // setTimeout(()=>imgContainer.current.scrollTo({top:0,left:0,behavior:'smooth'}),100); //스크롤 맨 처음으로 이동. smooth : 이미지앨범의 transition에 의해 이미지 좌우로 이동하면서 화면 최상단 이동도 부드럽게.
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

//--------------------아래는 참고용-------------------------------------------------------------

Novels.Text = function ({ novel }: { novel: TextProps }) {
  // props or default props
  const {
    novelImg = "https://dn-img-page.kakao.com/download/resource?kid=xsaRM/hzhOfrO85M/k1jHoCWYGpQkLzI11JXbA0&filename=th1",
    userImg = "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  } = novel;
  const theme = {
    novelImg,
    userImg,
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Text>
        <NovelContainer>
          <NovelImg />
          <NovelInfoBox>
            <NovelTitle>[해리포터]지독한 후플푸프</NovelTitle>
            <NovelSubInfoBox>
              <NovelInfoLineHeight>곽정언</NovelInfoLineHeight>
              <NovelInfo>패러디 | 미완</NovelInfo>
            </NovelSubInfoBox>
          </NovelInfoBox>
        </NovelContainer>

        <UserContainer>
          <TalkPreview>
            <TalkTitle>꾸준히 인기 많은 해포 패러디 계의 탑 작품이야 한 번 봐 봐</TalkTitle>
            <Icon.Right />
          </TalkPreview>

          <LastLineContainer>
            <UserNameBox>
              <UserImg />
              <UserName>Nana</UserName>
              <CreateDate>22.01.01</CreateDate>
            </UserNameBox>
            <IconBox>
              <Icon.Heart />
              <IconNO>7</IconNO>
            </IconBox>
          </LastLineContainer>
        </UserContainer>
      </Text> */}
    </ThemeProvider>
  );
};
