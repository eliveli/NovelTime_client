// /* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import { useEffect, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useComponentWidth } from "utils";
import { useNavigate } from "react-router-dom";

import {
  NovelImg,
  NovelTitle,
  NovelLink,
  NovelInfoBox,
  NovelInfo,
  NovelSubInfoBox,
  NovelInfoLineHeight,
} from "./NovelColumn.styles";

type MyComponentProps = React.PropsWithChildren<{
  novel: {
    novelId: string;
    novelImg: string;
    novelTitle: string;
    novelAuthor: string;
    novelGenre: string;
    novelIsEnd: boolean;
  };
}>;

export default function NovelColumn({ novel }: MyComponentProps) {
  // props or default props
  const {
    novelId = "asdf",
    novelImg = "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
    // "//dn-img-page.kakao.com/download/resource?kid=1Opki/hzmU0W8saq/pEkrur7BcK1FgYESJqDyXK", // 카카페
    // "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
    novelTitle = "제목",
    novelAuthor = "작가",
    novelGenre = "장르",
    novelIsEnd,
  } = novel;
  const theme = {};
  const infoRef = useRef<HTMLDivElement>(null);
  const infoWidth = useComponentWidth(infoRef); // 인포컨테이너 width 받아와 제목 엘립시스에 적용

  const navigate = useNavigate();

  // when this is iframe
  const isIframe = window.location.pathname.includes("iframe");
  //  pass novel info to parent
  const sendNovel = () => {
    window.parent.postMessage({ novelId, novelTitle }, "*");
  };

  if (isIframe) {
    return (
      <ThemeProvider theme={theme}>
        <NovelLink
          onClick={() => {
            sendNovel();
          }}
        >
          <NovelImg novelImg={novelImg} />
          <NovelInfoBox ref={infoRef}>
            <NovelTitle infoWidth={infoWidth}>{novelTitle}</NovelTitle>
            <NovelSubInfoBox>
              <NovelInfoLineHeight>{novelAuthor}</NovelInfoLineHeight>
              <NovelInfo>{`${novelGenre} | ${novelIsEnd ? "완결" : "미완"}`}</NovelInfo>
            </NovelSubInfoBox>
          </NovelInfoBox>
        </NovelLink>
      </ThemeProvider>
    );
  }
  return (
    <ThemeProvider theme={theme}>
      <NovelLink
        onClick={() => {
          navigate(`/novel_detail/${novelId}`);
        }}
      >
        <NovelImg novelImg={novelImg} />
        <NovelInfoBox ref={infoRef}>
          <NovelTitle infoWidth={infoWidth}>{novelTitle}</NovelTitle>
          <NovelSubInfoBox>
            <NovelInfoLineHeight>{novelAuthor}</NovelInfoLineHeight>
            <NovelInfo>{`${novelGenre} | ${novelIsEnd ? "완결" : "미완"}`}</NovelInfo>
          </NovelSubInfoBox>
        </NovelInfoBox>
      </NovelLink>
    </ThemeProvider>
  );
}
