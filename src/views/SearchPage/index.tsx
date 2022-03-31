import React, { useEffect } from "react";
import SectionBG from "components/SectionBG";
import { NovelColumn, NovelColumnDetail, NovelRow } from "../../components/Novel";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import Search from "../../components/Search";

export default function SearchPage() {
  const { searchWord, searchTextCtgr, searchContentCtgr } = useAppSelector((state) => state.filter);

  // is it right to use useEffect for RTK query...?

  // when changed client state, request api
  useEffect(() => {
    // search word
    // like this, server request
    // const { data, error, isLoading } = useGetNovelByIdQuery("20220227200633023");
  }, [searchWord]);
  useEffect(() => {
    // search word
    // like this, server request
    // const { data, error, isLoading } = useGetNovelByIdQuery("20220227200633023");
  }, [searchTextCtgr]);
  useEffect(() => {
    // search word
    // like this, server request
    // const { data, error, isLoading } = useGetNovelByIdQuery("20220227200633023");
  }, [searchContentCtgr]);

  const novelInfo = {
    novelId: "20220225082010201",
    novelImg:
      // "//dn-img-page.kakao.com/download/resource?kid=1Opki/hzmU0W8saq/pEkrur7BcK1FgYESJqDyXK", // 카카페
      "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
    // "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
    novelTitle: "헌터와 매드 사이언티스트",
    novelAuthor: "델마르",
    novelGenre: "로판",
    novelIsEnd: "완결",
  };
  const novels = [novelInfo, novelInfo, novelInfo, novelInfo, novelInfo];
  return (
    <SectionBG>
      <Search />
      {/* at all-search page: novel, writing */}

      {/* at novel-search page: novel */}
      {/* before search, show some examples for novel */}
      {novels.map((novel) => (
        <NovelColumn key={novel.novelId} novel={novel} />
      ))}
    </SectionBG>
  );
}
