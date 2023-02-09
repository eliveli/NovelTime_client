/* eslint-disable react/jsx-wrap-multilines */
import { useParams } from "react-router-dom";
import MainBG from "components/MainBG";
import { useState } from "react";
import { FilterForWeeklyNovelsFromPlatform } from "views/Home";
import { matchPlatformName } from "utils";
import { useGetNovelListByCategoryQuery } from "store/serverAPIs/novelTime";
import { ColumnDetailList } from "../../components/NovelListFrame";
import { NovelColumnDetail } from "../../components/Novel";

// api 호출, 서버 스테이트 받아오기
// api가 카테고리별 나누어져야 함 : required params for categoryId
//  아래에서 사용자별 구분 여부는 좀더 생각 (because of 현재 프로젝트 예상 기간 경과)
// from NovelList : 모든 사용자용 - 종류별 카테고리
//                : 로그인 사용자 - userId 이용, 종류별 카테고리
//                : 비로그인 사용자 - 랜덤. 로그인 사용자와 같은 종류별 카테고리
// from NovelDetail : 소설 상세페이지 추천작품 - novelId도 이용

// platform novel list from Home : request with categoryId, platform

// + 번외. writing list page for novel - novelId 이용
//       . writing list page for user - userId 이용(다른 사용자의 페이지 열람 가능)
//         => in this case, another page required?

// 네비게이션 바 - 상단 - 뒤로가기 버튼(모바일용) + ...

export default function NovelListByCategory() {
  const { categoryText, categoryId, novelId } = useParams(); // server request required

  const detailNovelInfo = {
    novelId: "20220225082010201",
    novelImg:
      // "//dn-img-page.kakao.com/download/resource?kid=1Opki/hzmU0W8saq/pEkrur7BcK1FgYESJqDyXK", // 카카페
      "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
    // "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
    novelTitle: "헌터와 매드 사이언티스트",
    novelAuthor: "델마르",
    novelGenre: "로판",
    novelDesc: `[에이번데일 백작의 저택]

    “누구세요……?”
    “그건 내가 할 말인 것 같은데.”
    
    히든 에피소드를 열고 들어간 폐가에서 만난 금발의 미남자.
    알고 보니 그는 이미 죽었어야 할 천재 마도 공학자였다.
    
    가상 현실 게임 ‘황금 발톱’의 배경으로부터 13년 전에 떨어진 에스페란사.
    졸지에 몬스터도 없는 세상에서 세계 최강이 되고 말았다.
    원래 세상으로 돌아가기 위해선 '황금 발톱'을 찾아 퀘스트를 클리어해야 하는데…!
    
    “당신을 왜 해부하겠어요? 살아 있는 채로 연구할 수 있는 게 훨씬 많은데.”
    
    유일한 조력자는 이런 소름 돋는 소리를 아무렇지 않게 하질 않나,
    
    “그럼 피 한 방울만 주지 않을래요? 딱 한 방울만.”
    
    피까지 뽑아 가려고 한다.
    
    이 퀘스트… 성공할 수 있을까?`,
  };
  const detailNovels = [
    detailNovelInfo,
    detailNovelInfo,
    detailNovelInfo,
    detailNovelInfo,
    detailNovelInfo,
  ];

  // request with category id, platform to receive platform novel list
  // - categoryId : "weeklyNovelsFromPlatform", platform : "카카페"

  // request will be executed after entering this page and clicking the platform filter

  // following is just an example
  // const { platformNovelList } = api.useGetPostsQuery(undefined, {
  //   selectFromResult: ({ data }) => ({
  //     posts: data ?? emptyArray,
  //   }),
  // })

  // platformNovelList is composed like this
  //  [ {novelId, novelImg, novelTitle, novelAuthor, novelGenre, novelDesc }]
  const platformNovelList = [
    detailNovelInfo,
    detailNovelInfo,
    detailNovelInfo,
    detailNovelInfo,
    detailNovelInfo,
  ];

  // weekly novels from each platform //
  const [platformFilter, setPlatformFilter] = useState("카카페"); // for clicking the platform tab

  const platformSelected = matchPlatformName(platformFilter); // for matching the name to request

  const { isLoading, data, isError } = useGetNovelListByCategoryQuery(
    {
      category: String(categoryId),
      platform: categoryId === "weeklyNovelsFromPlatform" ? platformSelected : undefined,
      novelId,
    },
    { skip: !categoryId },
  );

  // categoryId can be changed later
  if (categoryId === "weeklyNovelsFromPlatform") {
    return (
      <MainBG>
        <ColumnDetailList
          categoryText={categoryText as string}
          categoryFilter={
            <FilterForWeeklyNovelsFromPlatform
              platformFilter={platformFilter}
              setPlatformFilter={setPlatformFilter}
            />
          }
        >
          {data?.map((novel) => (
            <NovelColumnDetail key={novel.novelId} novel={novel} />
          ))}
        </ColumnDetailList>
      </MainBG>
    );
  }

  return (
    <MainBG>
      <ColumnDetailList categoryText={categoryText as string}>
        {data?.map((novel) => (
          <NovelColumnDetail key={novel.novelId} novel={novel} />
        ))}
      </ColumnDetailList>
    </MainBG>
  );
}
