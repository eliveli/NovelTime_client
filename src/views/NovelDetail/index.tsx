import React, { useState, useEffect, useLayoutEffect } from "react";
import { useParams, useOutletContext } from "react-router-dom";
import MainBG from "components/MainBG";
import { useAppDispatch } from "../../store/hooks";
import { getNovelTitle } from "../../store/clientSlices/modalSlice";
import { RowSlide } from "../../components/NovelListFrame";
import { WritingListFrame, WritingTitle } from "../../components/Writing";
import { NovelRow } from "../../components/Novel";
import NovelDetailInfo from "./NovelDetail.components";

// 컴포넌트에서 api 요청 : novelId 이용 (see under the two lines)

export default function NovelDetail() {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { novelId } = useParams(); // for server request
  // interface GetTitleType {
  //   // title: string | undefined;
  //   getTitle: React.Dispatch<React.SetStateAction<string>>;
  // }
  // // const { getTitle } = useOutletContext<GetTitleType>();
  // const { getTitle } = useOutletContext<GetTitleType>();
  // useEffect(() => {
  //   // console.log(title, "in Child Detail");
  //   getTitle(novelTitle as string);
  // }, []);
  const detailNovel = {
    novelId: "20220225082010201",
    novelImg:
      // "//dn-img-page.kakao.com/download/resource?kid=1Opki/hzmU0W8saq/pEkrur7BcK1FgYESJqDyXK", // 카카페
      "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
    // "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
    novelTitle: "헌터와 매드 사이언티스트",
    novelAuthor: "델마르",
    novelGenre: "로판",
    novelIsEnd: "완결",
    novelAge: "전체연령가",
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
    novelPlatform: "카카오페이지",
    novelPlatform2: "리디북스",
    novelPlatform3: "조아라", // 없을 경우 백엔드에서 제외
    novelUrl: "https://page.kakao.com/main",
    novelUrl2: "https://page.kakao.com/main",
    novelUrl3: "https://page.kakao.com/main", // 없을 경우 백엔드에서 제외

    writingNO: 9, // 백엔드 - talk, recommend 테이블에서 가져오기
    likeNO: 7, // 백엔드 - talk, recommend 테이블에서 가져오기

    isLike: true, // 유저의 좋아요 여부 //비로그인 시 false
  };
  const anotherNovel = {
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

  const anotherNovels = [
    anotherNovel,
    anotherNovel,
    // anotherNovel,
    // anotherNovel,
    // anotherNovel,
    // anotherNovel,
    // anotherNovel,
    // anotherNovel,
    // anotherNovel,
  ];

  const infoTalk = {
    talkId: "20220225082010201", // 필요성: 클릭 시 상세페이지 정보 요청
    userId: "20220225082010201", // 필요성: 클릭 시 유저페이지 정보 요청

    userName: "Nana",
    userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
    createDate: "22.01.01",
    talkTitle: "자유롭게 말해요",
    likeNO: 5,
    commentNO: 7,

    // 사진 가져오기
    talkPhoto:
      "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260",
  };
  const arrayInfoTalk = [infoTalk, infoTalk, infoTalk, infoTalk, infoTalk]; // 5개 씩?

  const infoRecommend = {
    recommendId: "20220225082010201", // 필요성: 클릭 시 상세페이지 정보 요청
    userId: "20220225082010201", // 필요성: 클릭 시 유저페이지 정보 요청

    userName: "Nana",
    userImg: "", // 없을 때 컴포넌트에서 디폴트 이미지 적용
    createDate: "22.01.01",
    recommendTitle: "추천추천추천",
    likeNO: 5,

    // 사진 가져오기
    recommendPhoto: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  };
  const arrayInfoRecommend = [
    infoRecommend,
    infoRecommend,
    infoRecommend,
    infoRecommend,
    infoRecommend,
  ];

  const dispatch = useAppDispatch();
  useLayoutEffect(() => {
    dispatch(getNovelTitle(detailNovel.novelTitle));
  });

  const [isTalk, handleTalk] = useState(true);

  return (
    <MainBG>
      <p>
        여기는 소설 공간!(작은 컴포넌트로 분리해 사용하자)
        {detailNovel.novelTitle}
      </p>
      <NovelDetailInfo novel={detailNovel} />

      <WritingListFrame
        fontSize={20}
        categoryText="Let's talk and play!"
        isTalk={isTalk}
        handleTalk={handleTalk}
        novelId={novelId as string}
        novelTitle={detailNovel.novelTitle}
        writing
      >
        {isTalk && arrayInfoTalk.map((talk) => <WritingTitle key={talk.talkId} writing={talk} />)}
        {!isTalk &&
          arrayInfoRecommend.map((recommend) => (
            <WritingTitle key={recommend.recommendId} writing={recommend} />
          ))}
      </WritingListFrame>

      <RowSlide
        novelId={novelId as string}
        categoryId="anotherNovels"
        categoryText="추천 작품"
        novelNO={anotherNovels.length}
      >
        {anotherNovels.map((novel) => (
          <NovelRow key={novel.novelId} novel={novel} />
        ))}
      </RowSlide>
    </MainBG>
  );
}
