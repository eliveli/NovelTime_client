import React from "react";
import { useParams } from "react-router-dom";
import MainBG from "components/MainBG";
import {
  WritingDetailContainer,
  RecommendDetail,
  NovelInWriting,
  BoardMark,
  LikeAndShare,
} from "components/Writing";
import { DotLine, DotAnimation, ContentAnimation } from "./RecommendDetail.styles";

// server request by recommendId
export default function NovelDetailRecommend() {
  const { recommendId } = useParams();

  // 서버에서 데이터 받아올 때 구성 // dataFromServer = { recommend, novel }
  const dataFromServer = {
    recommend: {
      recommendId: "", // 좋아요 누르거나 코멘트 작성 시 recommendId 서버 요청

      userName: "나나나",
      userImg: "",
      createDate: "22.03.03",

      likeNO: 5,
      isLike: true, // 유저의 좋아요 여부 //비로그인 시 false

      recommendTitle: "이 소설 강추",
      recommendDesc: `나는 이 부분이 정말 재미있었어. 주인공이 위기 상황을 모면하기 위해 이렇게 행동하는데,
    그게 오히려 개그 요소로 작용해.... 그래서.... `,
      recommendImg: "",
    },

    novel: {
      novelId: "20220225082010201",
      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
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
    },
  };

  const recommendDetail = {
    recomDtlImgWidth: "min-width: 92px;",
    recomDtlTextHeight: "height: 64px;",
  };
  return (
    <MainBG isWritingDetail>
      <NovelInWriting recommendDetail={recommendDetail} novel={dataFromServer.novel} />
      <DotAnimation>
        <DotLine />
      </DotAnimation>
      <ContentAnimation>
        <WritingDetailContainer>
          <BoardMark>Let's Recommend Novel!</BoardMark>
          <RecommendDetail detailRecommend={dataFromServer.recommend} />
          <LikeAndShare
            isLike={dataFromServer.recommend.isLike}
            likeNO={dataFromServer.recommend.likeNO}
          />
        </WritingDetailContainer>
      </ContentAnimation>
    </MainBG>
  );
}
