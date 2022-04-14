import React, { useState } from "react";
import MainBG from "components/MainBG";

import { CategoryMark } from "components/CategoryMark";
import { RowSlide } from "../../components/NovelListFrame";
import { NovelRow } from "../../components/Novel";

import { WritingSection } from "./UserPage.styles";
import { Writing, Comment, WritingFilter } from "./UserPage.components";

// server request with userName
const dataFromServer = {
  myTalk: [
    {
      talkId: "12",

      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈

      talkTitle: "이 소설 강추",

      createDate: "22.03.03",
      likeNO: 5,
      commentNO: 7,

      novelTitle: "헌터와 매드 사이언티스트",
    },
  ],
  myRecommend: [
    {
      recommendId: "34",

      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈

      recommendTitle: "이 소설 강추",

      createDate: "22.03.03",
      likeNO: 5,

      novelTitle: "헌터와 매드 사이언티스트",
    },
  ],
  myComment: [
    {
      commentId: "abdfdfcdef",
      commentContent: "코멘트 작성 중",
      createDate: "22.01.05",
      talkId: "as",
      talkTitle: "it is the best novel I've ever read",
      novelTitle: "헌터와 매드 사이언티스트",
    },
  ],
  otherTalk: [
    {
      talkId: "abdfdfcd",

      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈

      talkTitle: "이 소설 강추",

      userName: "나나",
      createDate: "22.03.03",
      likeNO: 5,
      commentNO: 7,

      novelTitle: "헌터와 매드 사이언티스트",
    },
    {
      talkId: "a",

      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈

      talkTitle: "이 소설 강추",

      userName: "나나a",
      createDate: "22.03.03",
      likeNO: 5,
      commentNO: 7,

      novelTitle: "헌터와 매드 사이언티스트",
    },
    {
      talkId: "a",

      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈

      talkTitle: "이 소설 강추",

      userName: "나d나",
      createDate: "22.03.03",
      likeNO: 5,
      commentNO: 7,

      novelTitle: "헌터와 매드 사이언티스트",
    },
  ],
  otherRecommend: [
    {
      recommendId: "as",

      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈

      recommendTitle: "이 소설 강추",

      userName: "as나나나",
      createDate: "22.03.03",
      likeNO: 5,

      novelTitle: "헌터와 매드 사이언티스트",
    },
    {
      recommendId: "df",

      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈

      recommendTitle: "이 소설 강추",

      userName: "나나나",
      createDate: "22.03.03",
      likeNO: 5,

      novelTitle: "헌터와 매드 사이언티스트",
    },
  ],
  novelList: {
    isMyList: [
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
    isOthersList: [
      {
        listId: "ssaasss",
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
        ],
      },
      {
        listId: "ssssjgrs",
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
        ],
      },
    ],
  },
};

export default function UserPageHome() {
  //   const { userName } = useParams();
  const userName = "나나나" as string; // later remove this and cancel the comment mark above
  const loginUserName = "나나" as string; // later change it to real login user name

  // which is the list owner me or other
  // if it is the login user's list return "my", if not the name of user
  const myListUserMark = userName === loginUserName ? `My` : `${userName}'s`;
  const myListMarkText = `${myListUserMark} Novel List`;
  const othersListUserMark = userName === loginUserName ? `I` : `${userName}`;
  const othersListMarkText = `Other's Novel List ${othersListUserMark} Like`;

  // server request with userName

  // set filter category
  const [myFilter, setMyFilter] = useState("프리톡");
  const [otherFilter, setOtherFilter] = useState("프리톡");

  return (
    <MainBG>
      <CategoryMark
        infoFromUserPage={{
          userName,
          path: "myWriting",
        }}
        categoryText="My Writing"
      />
      <WritingFilter
        writingCategory={["프리톡", "추천", "댓글"]}
        writingFilter={myFilter}
        selectWritingFilter={setMyFilter}
      />
      <WritingSection>
        {myFilter === "프리톡" &&
          dataFromServer.myTalk.map((_) => <Writing key={_.talkId} writingInfo={_} />)}
        {myFilter === "추천" &&
          dataFromServer.myRecommend.map((_) => <Writing key={_.recommendId} writingInfo={_} />)}
        {myFilter === "댓글" &&
          dataFromServer.myComment.map((_) => <Comment key={_.commentId} commentInfo={_} />)}
      </WritingSection>

      <CategoryMark
        infoFromUserPage={{
          userName,
          path: "othersWriting",
        }}
        categoryText="Other's Writing I like"
      />
      <WritingFilter
        writingCategory={["프리톡", "추천"]}
        writingFilter={otherFilter}
        selectWritingFilter={setOtherFilter}
      />
      <WritingSection>
        {otherFilter === "프리톡" &&
          dataFromServer.otherTalk.map((_) => <Writing key={_.talkId} writingInfo={_} />)}
        {otherFilter === "추천" &&
          dataFromServer.otherRecommend.map((_) => <Writing key={_.recommendId} writingInfo={_} />)}
      </WritingSection>

      <CategoryMark
        infoFromUserPage={{
          userName,
          path: "myList",
          list: {
            isMainCategory: true,
            listId: dataFromServer.novelList.isMyList[0].listId,
          },
        }}
        categoryText={myListMarkText}
      />
      {dataFromServer.novelList.isMyList.map((list) => (
        <RowSlide
          categoryId={list.listId}
          categoryText={list.listTitle}
          novelNO={list.novel.length}
          infoFromUserPage={{
            userName,
            path: "myList",
            list: { isMainCategory: false, listId: list.listId },
          }}
        >
          {list.novel.map((_) => (
            <NovelRow key={_.novelId} novel={_} isNotSubInfo />
          ))}
        </RowSlide>
      ))}
      <CategoryMark
        infoFromUserPage={{
          userName,
          path: "othersList",
          list: {
            isMainCategory: true,
            listId: dataFromServer.novelList.isOthersList[0].listId,
          },
        }}
        categoryText={othersListMarkText}
      />
      {dataFromServer.novelList.isOthersList.map((list) => (
        <RowSlide
          categoryId={list.listId}
          categoryText={list.listTitle}
          novelNO={list.novel.length}
          infoFromUserPage={{
            userName,
            path: "othersList",
            list: { isMainCategory: false, listId: list.listId },
          }}
          otherUser={{ userImg: list.userImg, userName: list.userName }}
        >
          {list.novel.map((_) => (
            <NovelRow key={_.novelId} novel={_} isNotSubInfo />
          ))}
        </RowSlide>
      ))}
    </MainBG>
  );
}
