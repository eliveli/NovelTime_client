import React, { useEffect } from "react";
import MainBG from "components/MainBG";
import { NovelColumn, NovelColumnDetail, NovelRow } from "../../components/Novel";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { GoToBtn, GoToText } from "./SearchPage.styles";

import SearchForNovel from "../../components/Search/SearchForNovel";

export default function SearchPage() {
  const novelInfo = {
    novelId: "20220225082010201",
    novelImg:
      // "//dn-img-page.kakao.com/download/resource?kid=1Opki/hzmU0W8saq/pEkrur7BcK1FgYESJqDyXK", // 카카페
      "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
    // "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
    novelTitle: "헌터와 매드 사이언티스트",
    novelAuthor: "델마르",
    novelGenre: "로판",
    novelIsEnd: true,
  };
  const novelInfo2 = {
    novelId: "2022000000201",
    novelImg:
      // "//dn-img-page.kakao.com/download/resource?kid=1Opki/hzmU0W8saq/pEkrur7BcK1FgYESJqDyXK", // 카카페
      "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
    // "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
    novelTitle: "헌터와 매드 사이언티스트",
    novelAuthor: "델마르",
    novelGenre: "로판",
    novelIsEnd: true,
  };
  const novels = [novelInfo, novelInfo2];

  //  pass novel info to parent
  const goToPlatform = () => {
    window.parent.postMessage({ sign: "goToPlatform" }, "*");
  };
  return (
    <MainBG>
      <SearchForNovel />
      {/* if there is no novel for search-keyword */}
      <GoToText>찾으시는 소설이 없나요? 소설 플랫폼에서 찾아보세요!</GoToText>
      <GoToBtn onClick={goToPlatform}>찾으러가기</GoToBtn>
      {/* before search, show some examples for novel */}
      {novels.map((novel) => (
        <NovelColumn key={novel.novelId} novel={novel} />
      ))}
    </MainBG>
  );
}
