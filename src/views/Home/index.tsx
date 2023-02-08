/* eslint-disable react/jsx-wrap-multilines */
import Icon from "assets/Icon";
import Spinner from "assets/Spinner";
import { CategoryMark } from "components/CategoryMark";
import MainBG from "components/MainBG";
import { NovelColumn, NovelColumnDetail, NovelRow } from "components/Novel";
import { ColumnDetailList, ColumnList, RowSlide } from "components/NovelListFrame";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetHomeDataQuery,
  useGetUserNovelListAtRandomQuery,
  useGetWeeklyNovelsFromPlatformQuery,
  useLazyGetUserNovelListAtRandomQuery,
} from "store/serverAPIs/novelTime";
import { Img } from "store/serverAPIs/types";
import { matchPlatformName, useComponentWidth } from "utils";
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
  SectionMark,
  RankSectionContnr,
  IconContainer,
  IconNO,
  AllArrowContnr,
  ArrowContnr,
  TitleNormalStyle,
  TitleEmphasis,
  LoadNovelListBtn,
  AddSpace,
} from "./Home.styles";

const dataFromServer = {
  talkList: [
    {
      talkId: "abcd", // 좋아요 누르거나 코멘트 작성 시 talkId로 서버 요청

      userName: "나나나",
      userImg: "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
      // need to change like this
      // userImg : { src : "", positon : "" }
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
  // 각 10순위 씩
  talkUserRank: {
    // 바꾸기. 작성글순 & 작성댓글순 & 받은좋아요순
    // talkUserRank //
    // talk: [{ userImg, userName, count }],
    // comment: [{ userImg, userName, count }],
    // likeReceived: [{ userImg, userName, count }],

    // recommendUserRank //
    // recommend: [{ userImg, userName, count }],
    // likeReceived: [{ userImg, userName, count }],

    // novel list //
    // list: [{ userImg, userName, count }],
    // likeReceived: [{ userImg, userName, count }],
    content: [
      { userImg: { src: "", position: "" }, userName: "lala", userAct: { writing: 6, comment: 6 } },
      {
        userImg: { src: "", position: "" },
        userName: "lalaa",
        userAct: { writing: 6, comment: 6 },
      },
      {
        userImg: { src: "", position: "" },
        userName: "laaala",
        userAct: { writing: 6, comment: 6 },
      },
      {
        userImg: { src: "", position: "" },
        userName: "lalas",
        userAct: { writing: 6, comment: 6 },
      },
      {
        userImg: { src: "", position: "" },
        userName: "lalda",
        userAct: { writing: 6, comment: 6 },
      },
      {
        userImg: { src: "", position: "" },
        userName: "lalfa",
        userAct: { writing: 6, comment: 6 },
      },
      {
        userImg: { src: "", position: "" },
        userName: "lalae",
        userAct: { writing: 6, comment: 6 },
      },
      {
        userImg: { src: "", position: "" },
        userName: "lalwa",
        userAct: { writing: 6, comment: 6 },
      },
      {
        userImg: { src: "", position: "" },
        userName: "lalwa",
        userAct: { writing: 6, comment: 6 },
      },
      {
        userImg: { src: "", position: "" },
        userName: "lalwa",
        userAct: { writing: 6, comment: 6 },
      },
    ],
    like: [
      { userImg: { src: "", position: "" }, userName: "lala", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalaa", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "laaala", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalas", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalda", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalfa", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalae", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalwa", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalwa", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalwa", likeReceived: 7 },
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
      { userImg: { src: "", position: "" }, userName: "lala", userAct: { writing: 7 } },
      { userImg: { src: "", position: "" }, userName: "lalaa", userAct: { writing: 7 } },
      { userImg: { src: "", position: "" }, userName: "laaala", userAct: { writing: 7 } },
      { userImg: { src: "", position: "" }, userName: "lalas", userAct: { writing: 7 } },
      { userImg: { src: "", position: "" }, userName: "lalda", userAct: { writing: 7 } },
      { userImg: { src: "", position: "" }, userName: "lalfa", userAct: { writing: 7 } },
      { userImg: { src: "", position: "" }, userName: "lalae", userAct: { writing: 7 } },
      { userImg: { src: "", position: "" }, userName: "lalwa", userAct: { writing: 7 } },
      { userImg: { src: "", position: "" }, userName: "lalwa", userAct: { writing: 7 } },
      { userImg: { src: "", position: "" }, userName: "lalwa", userAct: { writing: 7 } },
    ],
    like: [
      { userImg: { src: "", position: "" }, userName: "lala", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalaa", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "laaala", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalas", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalda", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalfa", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalae", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalwa", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalwa", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalwa", likeReceived: 7 },
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
      novelIsEnd: true,
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
      novelIsEnd: true,
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
      novelIsEnd: true,
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
      novelIsEnd: true,
    },
  ],

  // 2개씩 받아오기
  userNovelLists: [
    {
      listId: "ssseefss",
      listTitle: "list where is romance",
      userName: "바바바",
      userImg: { src: "", position: "" },
      novel: [
        {
          novelId: "20220225082010201",
          novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
          novelTitle: "헌터와 매드 사이언티스트",
          novelAuthor: "델마르",
          novelGenre: "로판",
          novelIsEnd: true,
        },
        {
          novelId: "20220225082010201",
          novelImg:
            "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
          novelTitle: "헌터와 매드 사이언티스트",
          novelAuthor: "델마르",
          novelGenre: "로판",
          novelIsEnd: true,
        },
        {
          novelId: "20220225082010201",
          novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
          novelTitle: "헌터와 매드 사이언티스트",
          novelAuthor: "델마르",
          novelGenre: "로판",
          novelIsEnd: true,
        },
        {
          novelId: "20220225082010201",
          novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
          novelTitle: "헌터와 매드 사이언티스트",
          novelAuthor: "델마르",
          novelGenre: "로판",
          novelIsEnd: true,
        },
        {
          novelId: "20220225082010201",
          novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
          novelTitle: "헌터와 매드 사이언티스트",
          novelAuthor: "델마르",
          novelGenre: "로판",
          novelIsEnd: true,
        },
      ],
    },
    {
      listId: "ssseess",
      listTitle: "list where is romance",
      userName: "나나나",
      userImg: { src: "", position: "" },
      novel: [
        {
          novelId: "20220225082010201",
          novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
          novelTitle: "헌터와 매드 사이언티스트",
          novelAuthor: "델마르",
          novelGenre: "로판",
          novelIsEnd: true,
        },
        {
          novelId: "20220225082010201",
          novelImg:
            "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
          novelTitle: "헌터와 매드 사이언티스트",
          novelAuthor: "델마르",
          novelGenre: "로판",
          novelIsEnd: true,
        },
        {
          novelId: "20220225082010201",
          novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
          novelTitle: "헌터와 매드 사이언티스트",
          novelAuthor: "델마르",
          novelGenre: "로판",
          novelIsEnd: true,
        },
        {
          novelId: "20220225082010201",
          novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
          novelTitle: "헌터와 매드 사이언티스트",
          novelAuthor: "델마르",
          novelGenre: "로판",
          novelIsEnd: true,
        },
        {
          novelId: "20220225082010201",
          novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
          novelTitle: "헌터와 매드 사이언티스트",
          novelAuthor: "델마르",
          novelGenre: "로판",
          novelIsEnd: true,
        },
      ],
    },
  ],

  novelListUserRank: {
    content: [
      { userImg: { src: "", position: "" }, userName: "lala", userAct: { list: 6 } },
      { userImg: { src: "", position: "" }, userName: "lalaa", userAct: { list: 6 } },
      { userImg: { src: "", position: "" }, userName: "laaala", userAct: { list: 6 } },
      { userImg: { src: "", position: "" }, userName: "lalas", userAct: { list: 6 } },
      { userImg: { src: "", position: "" }, userName: "lalda", userAct: { list: 6 } },
      { userImg: { src: "", position: "" }, userName: "lalfa", userAct: { list: 6 } },
      { userImg: { src: "", position: "" }, userName: "lalae", userAct: { list: 6 } },
      { userImg: { src: "", position: "" }, userName: "lalwa", userAct: { list: 6 } },
      { userImg: { src: "", position: "" }, userName: "lalwa", userAct: { list: 6 } },
      { userImg: { src: "", position: "" }, userName: "lalwa", userAct: { list: 6 } },
    ],
    like: [
      { userImg: { src: "", position: "" }, userName: "lala", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalaa", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "laaala", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalas", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalda", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalfa", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalae", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalwa", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalwa", likeReceived: 7 },
      { userImg: { src: "", position: "" }, userName: "lalwa", likeReceived: 7 },
    ],
  },
};

// request with category id, platform, isDetailInfo(boolean) to receive platform novel list
// - categoryId : "weeklyNovelsFromPlatform", platform : "카카페", isDetailInfo : false

// request will be executed after entering this page and clicking the platform filter
// following is just an example
// const { platformNovelList } = api.useGetPostsQuery(undefined, {
//   selectFromResult: ({ data }) => ({
//     posts: data ?? emptyArray,
//   }),
// })
// platformNovelList is composed like this
const platformNovelList = [
  {
    novelId: "20220225082010201",
    novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
    novelTitle: "카카페헌터와 매드 사이언티스트",
    novelAuthor: "델마르",
    novelGenre: "로판",
    novelIsEnd: true,
  },
  {
    novelId: "20220225082010201",
    novelImg:
      "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
    novelTitle: "헌터와 매드 사이언티스트",
    novelAuthor: "델마르",
    novelGenre: "로판",
    novelIsEnd: true,
  },
  {
    novelId: "20220225082010201",
    novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
    novelTitle: "헌터와 매드 사이언티스트",
    novelAuthor: "델마르",
    novelGenre: "로판",
    novelIsEnd: true,
  },
  {
    novelId: "20220225082010201",
    novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
    novelTitle: "헌터와 매드 사이언티스트",
    novelAuthor: "델마르",
    novelGenre: "로판",
    novelIsEnd: true,
  },
  {
    novelId: "20220225082010201",
    novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
    novelTitle: "헌터와 매드 사이언티스트",
    novelAuthor: "델마르",
    novelGenre: "로판",
    novelIsEnd: true,
  },
];

export function FilterForWeeklyNovelsFromPlatform({
  platformFilter,
  setPlatformFilter,
}: {
  platformFilter: string;
  setPlatformFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  // category for platform novel list
  const categoryArray = ["카카페", "시리즈", "리디북스", "조아라"];

  return (
    <FilterContnr isPlatformNovel>
      {categoryArray.map((_) => (
        <Filter
          category={_}
          selectedCtgr={platformFilter}
          onClick={() => {
            setPlatformFilter(_);
          }}
        >
          &nbsp;&nbsp;
          {_}
          &nbsp;&nbsp;
        </Filter>
      ))}
    </FilterContnr>
  );
}
interface RankUserProps {
  category: {
    main: Category;
    sub: string;
  };
  info: {
    userImg: Img;
    userName: string;
    count: number;
  };
  idx: number;
}

function CategoryIcon({ mainCtgr, subCtgr }: { mainCtgr: Category; subCtgr: string }) {
  if (subCtgr === "좋아요") return <Icon.SmallHeart />;

  if (mainCtgr === "소설 리스트") return <Icon.NovelList />;

  if (subCtgr === "작성글") return <Icon.Write />;

  if (subCtgr === "작성댓글") return <Icon.Comment />;

  throw Error("정해진 카테고리가 아니에요");
}

function RankUser({ category, info, idx }: RankUserProps) {
  const { userImg, userName, count } = info;

  const navigate = useNavigate();

  return (
    <UserContnr onClick={() => navigate(`/user-page/${userName}`)}>
      <UserImg userImg={userImg} />
      <UserInfo>
        <UserAct>
          <IconContainer>
            <Icon.IconBox noPointer size={17}>
              <CategoryIcon mainCtgr={category.main} subCtgr={category.sub} />
            </Icon.IconBox>
            <IconNO>{count}</IconNO>
          </IconContainer>
        </UserAct>

        <UserName>{userName}</UserName>
      </UserInfo>

      <UserRankNO>{idx + 1}</UserRankNO>
    </UserContnr>
  );
}
type UserRanks = {
  userImg: Img;
  userName: string;
  count: number;
}[];

type Category = "소설 한담" | "소설 추천" | "소설 리스트";

type RankList = {
  talk?: UserRanks;
  comment?: UserRanks;
  recommend?: UserRanks;
  novelList?: UserRanks;
  likeReceived?: UserRanks;
};
interface UserRankSectionProps {
  category: Category;
  rankList: RankList;
}

function setSubCategories(category: Category) {
  if (category === "소설 한담") return ["작성글", "작성댓글", "좋아요"];
  if (category === "소설 추천") return ["작성글", "좋아요"];
  if (category === "소설 리스트") return ["작성리스트", "좋아요"];
  throw Error("정해진 카테고리가 아니에요");
}

function setUserRanks(category: Category, rankFilter: string, rankList: RankList) {
  if (rankFilter === "좋아요") return rankList.likeReceived;

  if (category === "소설 리스트") return rankList.novelList;

  if (category === "소설 추천") return rankList.recommend;

  if (category === "소설 한담" && rankFilter === "작성글") return rankList.talk;

  if (category === "소설 한담" && rankFilter === "작성댓글") return rankList.comment;

  throw Error("정해진 카테고리가 아니에요");
}

function UserRankSection({ category, rankList }: UserRankSectionProps) {
  const subCategories = setSubCategories(category);

  const [rankFilter, setRankFilter] = useState(subCategories[0]);

  const userRanks = setUserRanks(category, rankFilter, rankList);

  const contnrRef = useRef<HTMLDivElement>(null);
  const contnrWidth = useComponentWidth(contnrRef);
  const rankContnrWidth = contnrWidth - 32;

  const rankContnrRef = useRef<HTMLDivElement>(null);

  // when clicking arrow, scroll user ranks
  const scrollRank = (isLeft: boolean) => {
    if (rankContnrRef.current && isLeft) {
      rankContnrRef.current.scrollTo({
        top: 0,
        left: rankContnrRef.current.scrollLeft - rankContnrWidth,
        behavior: "smooth",
      });
    }
    if (rankContnrRef.current && !isLeft) {
      rankContnrRef.current.scrollTo({
        top: 0,
        left: rankContnrRef.current.scrollLeft + rankContnrWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <RankSectionContnr ref={contnrRef}>
      <SectionMark>
        <SectionTitle>
          <TitleNormalStyle> {category} - </TitleNormalStyle>
          <TitleEmphasis>유저 활동</TitleEmphasis>
        </SectionTitle>
        <FilterContnr>
          {subCategories.map((_) => (
            <Filter
              category={_}
              selectedCtgr={rankFilter}
              onClick={() => {
                setRankFilter(_);
                rankContnrRef.current?.scrollTo(0, 0); // reset scroll value
              }}
            >
              &nbsp;&nbsp;
              {_}
              &nbsp;&nbsp;
            </Filter>
          ))}
          <AllArrowContnr>
            <ArrowContnr size={24} onClick={() => scrollRank(true)}>
              <Icon.SmallLeft />
            </ArrowContnr>
            <ArrowContnr size={24} onClick={() => scrollRank(false)}>
              <Icon.SmallRight />
            </ArrowContnr>
          </AllArrowContnr>
        </FilterContnr>
      </SectionMark>
      <UserRankCntnr rankContnrWidth={rankContnrWidth} ref={rankContnrRef}>
        {userRanks?.map((_, idx) => (
          <RankUser
            category={{ main: category, sub: rankFilter }}
            info={_}
            idx={idx}
            key={_.userName}
          />
        ))}
      </UserRankCntnr>
    </RankSectionContnr>
  );
}
export default function Home() {
  const homeResult = useGetHomeDataQuery(undefined);

  // userNovelListResult //
  // 1. default value
  const userNovelListResult = useGetUserNovelListAtRandomQuery(undefined);
  // 2. when clicking the button "다른 유저의 리스트 보기" below
  const [userNovelListTrigger, lazyUserNovelListResult] =
    useLazyGetUserNovelListAtRandomQuery(undefined);
  // => 2 or 1
  const userNovelListSelected = lazyUserNovelListResult?.data || userNovelListResult?.data;

  // weekly novels from each platforms //
  const [platformFilter, setPlatformFilter] = useState("카카페"); // for clicking the platform tab

  const platformSelected = matchPlatformName(platformFilter); // for matching the name to request

  const weeklyNovelsResult = useGetWeeklyNovelsFromPlatformQuery(platformSelected);
  // use cached data when requesting novels for each platforms
  // 10 novels displayed in home page. 20 in its list page

  const weeklyNovelsFromPlatform =
    weeklyNovelsResult.data && weeklyNovelsResult.data[platformSelected];

  // for popular novels in novel time and weekly novels from each platforms //
  // display 10 novels in home page
  // and 20 in each novel list page after clicking show-all button

  // "전체보기" 클릭 in popular novels and weekly novels //
  // - 특정 카테고리 아이디를 url param에 넣어 리스트 페이지로 이동
  //  : i.e. categoryId ("weeklyNovelsFromPlatform"),
  // - 이동한 리스트 페이지에서는 desc 포함 여러 정보를 요청해야 함

  return (
    <MainBG>
      {homeResult.isLoading && <Spinner styles="fixed" />}

      <CategoryMark categoryText="소설 한담 new" linkPath="talk-list" />
      {homeResult.data?.talkList?.map((talk, idx) => (
        <FreeTalk talk={talk} isLast={idx + 1 === homeResult.data?.talkList.length} />
      ))}

      {homeResult.data?.talkUserRank && (
        <UserRankSection category="소설 한담" rankList={homeResult.data.talkUserRank} />
      )}

      <CategoryMark categoryText="소설 추천 new" linkPath="recommend-list" />
      {homeResult.data?.recommendList?.map((recommendInfo, idx) => (
        <Recommend
          recommendInfo={recommendInfo}
          isLast={idx + 1 === dataFromServer.recommendList.length}
        />
      ))}

      {homeResult.data?.recommendUserRank && (
        <UserRankSection category="소설 추천" rankList={homeResult.data.recommendUserRank} />
      )}

      <CategoryMark categoryText="유저들의 소설 리스트">
        <LoadNovelListBtn onClick={() => userNovelListTrigger(undefined)}>
          다른 유저의 리스트 보기
        </LoadNovelListBtn>
      </CategoryMark>

      {userNovelListSelected?.map((list) => (
        <RowSlide
          categoryId={list.listId}
          categoryText={list.listTitle}
          novelNO={list.novel.length}
          infoFromUserPage={{
            userName: list.userName,
            path: "my-list",
            list: { isMainCategory: false, listId: list.listId },
          }}
          userMark={{ userImg: list.userImg, userName: list.userName }}
          isShowAllMark
        >
          {list.novel.map((_) => (
            <NovelRow key={_.novelId} novel={_} isNotSubInfo />
          ))}
        </RowSlide>
      ))}

      {homeResult.data?.novelListUserRank && (
        <UserRankSection category="소설 리스트" rankList={homeResult.data.novelListUserRank} />
      )}

      {homeResult.data?.popularNovelsInNovelTime && (
        <RowSlide
          categoryText="노블타임 인기 소설"
          novelNO={homeResult.data.popularNovelsInNovelTime.length}
          categoryId="popularNovelTime"
          isShowAllMark
        >
          {homeResult.data.popularNovelsInNovelTime.map((novel) => (
            <NovelRow key={novel.novelId} novel={novel} />
          ))}
        </RowSlide>
      )}
      <AddSpace height={16} />

      {weeklyNovelsFromPlatform && (
        <RowSlide
          categoryText="플랫폼 별 인기 소설"
          novelNO={weeklyNovelsFromPlatform.length}
          categoryId="weeklyNovelsFromPlatform" // it can be changed later
          categoryFilter={
            <FilterForWeeklyNovelsFromPlatform
              platformFilter={platformFilter}
              setPlatformFilter={setPlatformFilter}
            />
          }
          isShowAllMark
        >
          {weeklyNovelsFromPlatform.map((novel) => (
            <NovelRow key={novel.novelId} novel={novel} />
          ))}
        </RowSlide>
      )}
    </MainBG>
  );
}
