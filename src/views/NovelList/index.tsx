import React from "react";
import { ColumnList, ColumnDetailList, RowSlide } from "../../components/ListFrame";
import { NovelColumn, NovelColumnDetail, NovelRow } from "../../components/Novel";
import Novels from "./NovelList.components";

export default function NovelList() {
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

  return (
    <Novels>
      <ColumnList category="소설계의 박스오피스">
        {novels.map((novel) => (
          <NovelColumn novel={novel} />
        ))}
      </ColumnList>

      <ColumnDetailList category="맞춤 추천은 여기에(상세)">
        {detailNovels.map((novel) => (
          <NovelColumnDetail novel={novel} />
        ))}
      </ColumnDetailList>

      <RowSlide category="요즘 인기 있는" novelNO={novels.length}>
        {novels.map((novel) => (
          <NovelRow novel={novel} />
        ))}
      </RowSlide>
    </Novels>
  );
}
