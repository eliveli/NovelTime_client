import Icon from "assets/Icon";
import { CategoryMark } from "components/CategoryMark";
import MainBG from "components/MainBG";
import { NovelColumn, NovelColumnDetail, NovelRow } from "components/Novel";
import { ColumnDetailList, ColumnList, RowSlide } from "components/NovelListFrame";
import React, { useRef, useState } from "react";
import { useComponentWidth } from "utils";
import FreeTalk from "views/FreeTalkList/FreeTalkList.components";
import Recommend from "views/RecommendList/RecommendList.components";
import {
  UserAct,
  UserContnr,
  UserImg,
  UserInfo,
  UserName,
  UserRankCntnr,
  Filter,
  FilterContnr,
  UserRankNO,
  SectionTitle,
  SectionTitleContnr,
  RankSectionContnr,
  IconContainer,
  IconNO,
} from "./Home.styles";

const dataFromServer = {
  talkList: [
    {
      talkId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

      userName: "나나나",
      userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
      createDate: "22.03.03",

      likeNO: 5,
      commentNO: 7,

      talkTitle: "이 소설 강추",
      talkImg: "", // it can be empty string

      novelTitle: "헌터와 매드 사이언티스트",
    },
    {
      talkId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

      userName: "나나나",
      userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
      createDate: "22.03.03",

      likeNO: 5,
      commentNO: 7,

      talkTitle: "이 소설 강추",
      talkImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",

      novelTitle: "헌터와 매드 사이언티스트",
    },
    {
      talkId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

      userName: "나나나",
      userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
      createDate: "22.03.03",

      likeNO: 5,
      commentNO: 7,

      talkTitle: "이 소설 강추",
      talkImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",

      novelTitle: "헌터와 매드 사이언티스트",
    },
  ],
  talkUserRank: {
    content: [
      { userImg: "", userName: "lala", userAct: { writing: 6, comment: 6 } },
      { userImg: "", userName: "lalaa", userAct: { writing: 6, comment: 6 } },
      { userImg: "", userName: "laaala", userAct: { writing: 6, comment: 6 } },
      { userImg: "", userName: "lalas", userAct: { writing: 6, comment: 6 } },
      { userImg: "", userName: "lalda", userAct: { writing: 6, comment: 6 } },
      { userImg: "", userName: "lalfa", userAct: { writing: 6, comment: 6 } },
      { userImg: "", userName: "lalae", userAct: { writing: 6, comment: 6 } },
      { userImg: "", userName: "lalwa", userAct: { writing: 6, comment: 6 } },
    ],
    like: [
      { userImg: "", userName: "lala", likeReceived: 7 },
      { userImg: "", userName: "lalaa", likeReceived: 7 },
      { userImg: "", userName: "laaala", likeReceived: 7 },
      { userImg: "", userName: "lalas", likeReceived: 7 },
      { userImg: "", userName: "lalda", likeReceived: 7 },
      { userImg: "", userName: "lalfa", likeReceived: 7 },
      { userImg: "", userName: "lalae", likeReceived: 7 },
      { userImg: "", userName: "lalwa", likeReceived: 7 },
    ],
  },
  recommendList: [
    {
      recommend: {
        recommendId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

        userName: "나나나",
        userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
        createDate: "22.03.03",

        likeNO: 5,

        recommendTitle: "이 소설 강추",
      },
      novel: {
        novelImg:
          "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
        novelTitle: "헌터와 매드 사이언티스트",
        novelAuthor: "델마르",
        novelGenre: "로판",
        isEnd: false,
      },
    },
    {
      recommend: {
        recommendId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

        userName: "나나나",
        userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
        createDate: "22.03.03",

        likeNO: 5,

        recommendTitle: "이 소설 강추",
      },
      novel: {
        novelImg:
          "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
        novelTitle: "헌터와 매드 사이언티스트",
        novelAuthor: "델마르",
        novelGenre: "로판",
        isEnd: false,
      },
    },
    {
      recommend: {
        recommendId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

        userName: "나나나",
        userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
        createDate: "22.03.03",

        likeNO: 5,

        recommendTitle: "이 소설 강추",
      },
      novel: {
        novelImg:
          "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
        novelTitle: "헌터와 매드 사이언티스트",
        novelAuthor: "델마르",
        novelGenre: "로판",
        isEnd: false,
      },
    },
  ],
  recommendUserRank: {
    content: [
      { userImg: "", userName: "lala", userAct: { writing: 7 } },
      { userImg: "", userName: "lalaa", userAct: { writing: 7 } },
      { userImg: "", userName: "laaala", userAct: { writing: 7 } },
      { userImg: "", userName: "lalas", userAct: { writing: 7 } },
      { userImg: "", userName: "lalda", userAct: { writing: 7 } },
      { userImg: "", userName: "lalfa", userAct: { writing: 7 } },
      { userImg: "", userName: "lalae", userAct: { writing: 7 } },
      { userImg: "", userName: "lalwa", userAct: { writing: 7 } },
    ],
    like: [
      { userImg: "", userName: "lala", likeReceived: 7 },
      { userImg: "", userName: "lalaa", likeReceived: 7 },
      { userImg: "", userName: "laaala", likeReceived: 7 },
      { userImg: "", userName: "lalas", likeReceived: 7 },
      { userImg: "", userName: "lalda", likeReceived: 7 },
      { userImg: "", userName: "lalfa", likeReceived: 7 },
      { userImg: "", userName: "lalae", likeReceived: 7 },
      { userImg: "", userName: "lalwa", likeReceived: 7 },
    ],
  },
  simpleNovelInfo: [
    {
      novelId: "20220225082010201",
      novelImg:
        // "//dn-img-page.kakao.com/download/resource?kid=1Opki/hzmU0W8saq/pEkrur7BcK1FgYESJqDyXK", // 카카페
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
      // "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
      novelTitle: "헌터와 매드 사이언티스트",
      novelAuthor: "델마르",
      novelGenre: "로판",
      novelIsEnd: "완결",
    },
    {
      novelId: "20220225082010201",
      novelImg:
        // "//dn-img-page.kakao.com/download/resource?kid=1Opki/hzmU0W8saq/pEkrur7BcK1FgYESJqDyXK", // 카카페
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
      // "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
      novelTitle: "헌터와 매드 사이언티스트",
      novelAuthor: "델마르",
      novelGenre: "로판",
      novelIsEnd: "완결",
    },
    {
      novelId: "20220225082010201",
      novelImg:
        // "//dn-img-page.kakao.com/download/resource?kid=1Opki/hzmU0W8saq/pEkrur7BcK1FgYESJqDyXK", // 카카페
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
      // "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
      novelTitle: "헌터와 매드 사이언티스트",
      novelAuthor: "델마르",
      novelGenre: "로판",
      novelIsEnd: "완결",
    },
    {
      novelId: "20220225082010201",
      novelImg:
        // "//dn-img-page.kakao.com/download/resource?kid=1Opki/hzmU0W8saq/pEkrur7BcK1FgYESJqDyXK", // 카카페
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
      // "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
      novelTitle: "헌터와 매드 사이언티스트",
      novelAuthor: "델마르",
      novelGenre: "로판",
      novelIsEnd: "완결",
    },
  ],

  userNovelList: {
    userName: "나나나",

    novelList: [
      {
        listId: "sssss",
        listTitle: "list where is romance",
        userName: "asda",
        userImg: "",
        novel: [
          {
            novelId: "20220225082010201",
            novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
            novelTitle: "헌터와 매드 사이언티스트",
            novelAuthor: "델마르",
            novelGenre: "로판",
            novelIsEnd: "완결",
          },
          {
            novelId: "20220225082010201",
            novelImg:
              "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
            novelTitle: "헌터와 매드 사이언티스트",
            novelAuthor: "델마르",
            novelGenre: "로판",
            novelIsEnd: "완결",
          },
          {
            novelId: "20220225082010201",
            novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
            novelTitle: "헌터와 매드 사이언티스트",
            novelAuthor: "델마르",
            novelGenre: "로판",
            novelIsEnd: "완결",
          },
          {
            novelId: "20220225082010201",
            novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
            novelTitle: "헌터와 매드 사이언티스트",
            novelAuthor: "델마르",
            novelGenre: "로판",
            novelIsEnd: "완결",
          },
          {
            novelId: "20220225082010201",
            novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
            novelTitle: "헌터와 매드 사이언티스트",
            novelAuthor: "델마르",
            novelGenre: "로판",
            novelIsEnd: "완결",
          },
        ],
      },
      {
        listId: "sddssss",
        listTitle: "list where is romance",
        userName: "asda",
        userImg: "",
        novel: [
          {
            novelId: "20220225082010201",
            novelImg:
              "//dn-img-page.kakao.com/download/resource?kid=1Opki/hzmU0W8saq/pEkrur7BcK1FgYESJqDyXK", // 카카페
            novelTitle: "헌터와 매드 사이언티스트",
            novelAuthor: "델마르",
            novelGenre: "로판",
            novelIsEnd: "완결",
          },
          {
            novelId: "20220225082010201",
            novelImg:
              "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
            novelTitle: "헌터와 매드 사이언티스트",
            novelAuthor: "델마르",
            novelGenre: "로판",
            novelIsEnd: "완결",
          },
          {
            novelId: "20220225082010201",
            novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
            novelTitle: "헌터와 매드 사이언티스트",
            novelAuthor: "델마르",
            novelGenre: "로판",
            novelIsEnd: "완결",
          },
          {
            novelId: "20220225082010201",
            novelImg:
              "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
            novelTitle: "헌터와 매드 사이언티스트",
            novelAuthor: "델마르",
            novelGenre: "로판",
            novelIsEnd: "완결",
          },
          {
            novelId: "20220225082010201",
            novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
            novelTitle: "헌터와 매드 사이언티스트",
            novelAuthor: "델마르",
            novelGenre: "로판",
            novelIsEnd: "완결",
          },
          {
            novelId: "20220225082010201",
            novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
            novelTitle: "헌터와 매드 사이언티스트",
            novelAuthor: "델마르",
            novelGenre: "로판",
            novelIsEnd: "완결",
          },
          {
            novelId: "20220225082010201",
            novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
            novelTitle: "헌터와 매드 사이언티스트",
            novelAuthor: "델마르",
            novelGenre: "로판",
            novelIsEnd: "완결",
          },
        ],
      },
    ],
  },
  novelListUserRank: {
    content: [
      { userImg: "", userName: "lala", userAct: { list: 6 } },
      { userImg: "", userName: "lalaa", userAct: { list: 6 } },
      { userImg: "", userName: "laaala", userAct: { list: 6 } },
      { userImg: "", userName: "lalas", userAct: { list: 6 } },
      { userImg: "", userName: "lalda", userAct: { list: 6 } },
      { userImg: "", userName: "lalfa", userAct: { list: 6 } },
      { userImg: "", userName: "lalae", userAct: { list: 6 } },
      { userImg: "", userName: "lalwa", userAct: { list: 6 } },
    ],
    like: [
      { userImg: "", userName: "lala", likeReceived: 7 },
      { userImg: "", userName: "lalaa", likeReceived: 7 },
      { userImg: "", userName: "laaala", likeReceived: 7 },
      { userImg: "", userName: "lalas", likeReceived: 7 },
      { userImg: "", userName: "lalda", likeReceived: 7 },
      { userImg: "", userName: "lalfa", likeReceived: 7 },
      { userImg: "", userName: "lalae", likeReceived: 7 },
      { userImg: "", userName: "lalwa", likeReceived: 7 },
    ],
  },
};

interface RankUserProps {
  info: {
    userImg: string;
    userName: string;
    userAct?: {
      writing?: number;
      comment?: number;
      list?: number;
    };
    likeReceived?: number;
  };
  idx: number;
}
function RankUser({ info, idx }: RankUserProps) {
  const { userImg, userName, userAct, likeReceived } = info;
  return (
    <UserContnr>
      <UserImg userImg={userImg} />
      <UserInfo>
        {userAct?.writing && (
          <UserAct>
            <IconContainer>
              <Icon.IconBox noPointer size={17}>
                <Icon.Write />
              </Icon.IconBox>
              <IconNO>{userAct.writing}</IconNO>
            </IconContainer>
          </UserAct>
        )}
        {userAct?.comment && (
          <UserAct>
            <IconContainer>
              <Icon.IconBox noPointer size={17}>
                <Icon.Comment />
              </Icon.IconBox>
              <IconNO>{userAct.comment}</IconNO>
            </IconContainer>
          </UserAct>
        )}
        {userAct?.list && (
          <UserAct>
            <IconContainer>
              <Icon.IconBox noPointer size={17}>
                <Icon.NovelList />
              </Icon.IconBox>
              <IconNO>{userAct.list}</IconNO>
            </IconContainer>
          </UserAct>
        )}

        {likeReceived !== undefined && (
          <UserAct>
            <IconContainer>
              <Icon.IconBox noPointer size={17}>
                <Icon.SmallHeart />
              </Icon.IconBox>
              <IconNO>{likeReceived}</IconNO>
            </IconContainer>
          </UserAct>
        )}

        <UserName>{userName}</UserName>
      </UserInfo>

      <UserRankNO>{idx + 1}</UserRankNO>
    </UserContnr>
  );
}

interface UserRankSectionProps {
  category: "프리톡" | "추천" | "리스트";
  rankList: {
    content: {
      userImg: string;
      userName: string;
      userAct: {
        writing?: number;
        comment?: number;
        list?: number;
      };
    }[];
    like: { userImg: string; userName: string; likeReceived: number }[];
  };
}
function UserRankSection({ category, rankList }: UserRankSectionProps) {
  const categoryArray = ["프리톡", "추천"].includes(category)
    ? ["작성글 수", "받은 좋아요"]
    : ["작성리스트 수", "받은 좋아요"];
  const [rankFilter, setRankFilter] = useState(categoryArray[0]);

  const contnrRef = useRef<HTMLDivElement>(null);
  const contnrWidth = useComponentWidth(contnrRef);

  return (
    <RankSectionContnr ref={contnrRef}>
      <SectionTitleContnr>
        <SectionTitle>유저 활동</SectionTitle>
        <FilterContnr>
          {categoryArray.map((_) => (
            <Filter category={_} selectedCtgr={rankFilter} onClick={() => setRankFilter(_)}>
              &nbsp;&nbsp;
              {_}
              &nbsp;&nbsp;
            </Filter>
          ))}
        </FilterContnr>
      </SectionTitleContnr>
      <UserRankCntnr contnrWidth={contnrWidth}>
        {rankFilter.includes("작성") &&
          rankList.content.map((_, idx) => <RankUser info={_} idx={idx} key={_.userName} />)}
        {rankFilter === "받은 좋아요" &&
          rankList.like.map((_, idx) => <RankUser info={_} idx={idx} key={_.userName} />)}
      </UserRankCntnr>
    </RankSectionContnr>
  );
}
export default function Home() {
  return (
    <MainBG>
      <CategoryMark categoryText="소설 한담 new" linkPath="talk_list" />
      {dataFromServer.talkList.map((talk, idx) => (
        <FreeTalk talk={talk} isLast={idx + 1 === dataFromServer.talkList.length} />
      ))}

      <UserRankSection category="프리톡" rankList={dataFromServer.talkUserRank} />

      <CategoryMark categoryText="소설 추천 new" linkPath="recommend_list" />
      {dataFromServer.recommendList.map((recommendInfo, idx) => (
        <Recommend
          recommendInfo={recommendInfo}
          isLast={idx + 1 === dataFromServer.recommendList.length}
        />
      ))}

      <UserRankSection category="추천" rankList={dataFromServer.recommendUserRank} />

      <CategoryMark
        infoFromUserPage={{
          userName: dataFromServer.userNovelList.userName,
          path: "myList",
          list: {
            isMainCategory: true,
            listId: dataFromServer.userNovelList.novelList[0].listId,
          },
        }}
        categoryText={`${dataFromServer.userNovelList.userName}'s Novel List`}
      />
      {dataFromServer.userNovelList.novelList.map((list) => (
        <RowSlide
          categoryId={list.listId}
          categoryText={list.listTitle}
          novelNO={list.novel.length}
          infoFromUserPage={{
            userName: dataFromServer.userNovelList.userName,
            path: "myList",
            list: { isMainCategory: false, listId: list.listId },
          }}
        >
          {list.novel.map((_) => (
            <NovelRow key={_.novelId} novel={_} isNotSubInfo />
          ))}
        </RowSlide>
      ))}

      <UserRankSection category="리스트" rankList={dataFromServer.novelListUserRank} />

      <RowSlide
        categoryText="요즘 인기 있는1"
        novelNO={dataFromServer.simpleNovelInfo.length}
        categoryId="popular"
      >
        {dataFromServer.simpleNovelInfo.map((novel) => (
          <NovelRow key={novel.novelId} novel={novel} />
        ))}
      </RowSlide>
      <RowSlide
        categoryText="요즘 인기 있는2"
        novelNO={dataFromServer.simpleNovelInfo.length}
        categoryId="popular"
      >
        {dataFromServer.simpleNovelInfo.map((novel) => (
          <NovelRow key={novel.novelId} novel={novel} />
        ))}
      </RowSlide>
    </MainBG>
  );
}
