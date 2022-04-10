import React, { useRef, useState } from "react";
import SectionBG from "components/SectionBG";
import { messageUserPage } from "assets/images";
import { useParams } from "react-router-dom";
import { useAppDispatch } from "store/hooks";
import { setUserInfo } from "store/clientSlices/userInfoSlice";

import { CategoryMark } from "components/CategoryMark";
import Icon from "assets/Icon";
import { useComponentHeight } from "utils";
import { RowSlide } from "../../components/NovelListFrame";
import { NovelRow } from "../../components/Novel";

import {
  ProfileContnr,
  UserImg,
  MessageIcon,
  UserName,
  ProfileUserCntnr,
  CommntIcon,
  ContnrNearImg,
  CreateDate,
  HeartIcon,
  IconInfoContnr,
  IconNoInfo,
  IconsContnr,
  NovelImg,
  NovelTitle,
  UserContnr,
  WiringContnr,
  WritingSection,
  WritingTitle,
  WritingUserName,
  Filter,
  FilterContnr,
  CommentContent,
  CommentNovelTitle,
  CommentTalkTitle,
  CommentContentContnr,
  WritingMark,
} from "./UserPage.styles";

// server request with userName

interface CommentInfo {
  commentInfo: {
    commentId: string;
    commentContent: string;
    createDate: string;
    talkTitle: string;
    novelTitle: string;
  };
}

function Comment({ commentInfo }: CommentInfo) {
  const { commentId, commentContent, createDate, talkTitle, novelTitle } = commentInfo;
  return (
    <WiringContnr isComment>
      <CommentContentContnr>
        <CommentContent>{commentContent}</CommentContent>
        <CreateDate>{createDate}</CreateDate>
      </CommentContentContnr>
      <CommentTalkTitle>
        <WritingMark>&nbsp;[글]&nbsp;&nbsp;&nbsp;</WritingMark>
        {talkTitle}
      </CommentTalkTitle>
      <CommentNovelTitle>{novelTitle}</CommentNovelTitle>
    </WiringContnr>
  );
}
interface WritingInfo {
  writingInfo: {
    talkId?: string;
    recommendId?: string;
    novelImg: string;
    talkTitle?: string;
    recommendTitle?: string;
    userName?: string;
    createDate: string;
    likeNO: number;
    commentNO?: number;
    novelTitle: string;
  };
}
function Writing({ writingInfo }: WritingInfo) {
  const {
    talkId,
    recommendId,
    novelImg,
    talkTitle,
    recommendTitle,
    userName,
    createDate,
    likeNO,
    commentNO,
    novelTitle,
  } = writingInfo;
  const imgRef = useRef<HTMLDivElement>(null);
  const imgHeight = useComponentHeight(imgRef);

  // talk
  if (talkId) {
    return (
      <WiringContnr>
        <ContnrNearImg isTalk>
          <WritingTitle talkId={talkId}>{talkTitle}</WritingTitle>
          <UserContnr talkId={talkId}>
            {userName && <WritingUserName talkId={talkId}>{` : ${userName}`}</WritingUserName>}
            <CreateDate>
              {!userName && ` : `}
              {createDate}
            </CreateDate>
            <IconsContnr>
              <IconInfoContnr>
                <Icon.IconBox size={15}>
                  <HeartIcon />
                </Icon.IconBox>
                <IconNoInfo>{likeNO}</IconNoInfo>
              </IconInfoContnr>
              <IconInfoContnr>
                <Icon.IconBox size={15}>
                  <CommntIcon />
                </Icon.IconBox>
                <IconNoInfo>{commentNO}</IconNoInfo>
              </IconInfoContnr>
            </IconsContnr>
          </UserContnr>
          <NovelTitle talkId={talkId}>{novelTitle}</NovelTitle>
        </ContnrNearImg>
        <NovelImg ref={imgRef} novelImg={novelImg} imgHeight={imgHeight} />
      </WiringContnr>
    );
  }
  // recommend
  return (
    <WiringContnr>
      <NovelImg ref={imgRef} novelImg={novelImg} imgHeight={imgHeight} />
      <ContnrNearImg>
        <NovelTitle>{novelTitle}</NovelTitle>
        <WritingTitle>{recommendTitle}</WritingTitle>
        <UserContnr>
          {userName && <WritingUserName>{` : ${userName}`}</WritingUserName>}
          <CreateDate>
            {!userName && ` : `}
            {createDate}
          </CreateDate>
          <IconsContnr>
            <IconInfoContnr>
              <Icon.IconBox size={15}>
                <HeartIcon />
              </Icon.IconBox>
              <IconNoInfo>{likeNO}</IconNoInfo>
            </IconInfoContnr>
          </IconsContnr>
        </UserContnr>
      </ContnrNearImg>
    </WiringContnr>
  );
}

const dataFromServer = {
  userInfo: { userName: "나나나", userImg: "" },
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
      commentId: "abcd",
      commentContent: "코멘트 작성 중",
      createDate: "22.01.05",
      talkTitle: "it is the best novel I've ever read",
      novelTitle: "헌터와 매드 사이언티스트",
    },
  ],
  otherTalk: [
    {
      talkId: "assss",

      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈

      talkTitle: "이 소설 강추",

      userName: "나나나",
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

      userName: "나나나",
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

      userName: "나나나",
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

      userName: "나나나",
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
  novelListArray: [
    {
      listInfo: {
        listId: "sssss",
        listTitle: "list where is romance",
        userName: "asda",
        userImg: "",
      },
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
    {
      listInfo: {
        listId: "sssss",
        listTitle: "list where is romance",
        userName: "asda",
        userImg: "",
      },
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
};

type FilterType = "프리톡" | "추천" | "댓글";
export default function UserPage() {
  const { userName } = useParams();
  // server request with userName

  // set user info to show in nav
  const dispatch = useAppDispatch();
  dispatch(setUserInfo(dataFromServer.userInfo));

  // set filter category
  const [myFilter, setMyFilter] = useState("프리톡");
  const [otherFilter, setOtherFilter] = useState("프리톡");
  return (
    <SectionBG>
      <ProfileContnr>
        <ProfileUserCntnr>
          <UserImg userImg={dataFromServer.userInfo.userImg} />
          <UserName>{dataFromServer.userInfo.userName}</UserName>
          <MessageIcon src={messageUserPage} alt="message" />
        </ProfileUserCntnr>
      </ProfileContnr>

      <CategoryMark writing categoryText="My Writing" />
      <FilterContnr>
        {["프리톡", "추천", "댓글"].map((_) => (
          <Filter
            category={_ as FilterType}
            selectedCtgr={myFilter as FilterType}
            onClick={() => setMyFilter(_)}
          >
            &nbsp;&nbsp;
            {_}
            &nbsp;&nbsp;
          </Filter>
        ))}
      </FilterContnr>
      <WritingSection>
        {myFilter === "프리톡" &&
          dataFromServer.myTalk.map((_) => <Writing key={_.talkId} writingInfo={_} />)}
        {myFilter === "추천" &&
          dataFromServer.myRecommend.map((_) => <Writing key={_.recommendId} writingInfo={_} />)}
        {myFilter === "댓글" &&
          dataFromServer.myComment.map((_) => <Comment key={_.commentId} commentInfo={_} />)}
      </WritingSection>

      <CategoryMark writing categoryText="Other's Writing I like" />
      <FilterContnr>
        {["프리톡", "추천"].map((_) => (
          <Filter
            category={_ as FilterType}
            selectedCtgr={otherFilter as FilterType}
            onClick={() => setOtherFilter(_)}
          >
            &nbsp;&nbsp;
            {_}
            &nbsp;&nbsp;
          </Filter>
        ))}
      </FilterContnr>
      <WritingSection>
        {otherFilter === "프리톡" &&
          dataFromServer.otherTalk.map((_) => <Writing key={_.talkId} writingInfo={_} />)}
      </WritingSection>
      <WritingSection>
        {otherFilter === "추천" &&
          dataFromServer.otherRecommend.map((_) => <Writing key={_.recommendId} writingInfo={_} />)}
      </WritingSection>

      <CategoryMark writing categoryText="My Novel List" />
      {dataFromServer.novelListArray.map((list) => (
        <RowSlide
          categoryId={list.listInfo.listId}
          categoryText={list.listInfo.listTitle}
          novelNO={list.novel.length}
          isUserList
        >
          {list.novel.map((_) => (
            <NovelRow key={_.novelId} novel={_} isUserList />
          ))}
        </RowSlide>
      ))}
      <CategoryMark writing categoryText="Other's Novel List I Like" />
      {dataFromServer.novelListArray.map((list) => (
        <RowSlide
          categoryId={list.listInfo.listId}
          userInfo={{ userImg: list.listInfo.userImg, userName: list.listInfo.userName }}
          categoryText={list.listInfo.listTitle}
          novelNO={list.novel.length}
          isUserList
        >
          {list.novel.map((_) => (
            <NovelRow key={_.novelId} novel={_} isUserList />
          ))}
        </RowSlide>
      ))}
    </SectionBG>
  );
}
