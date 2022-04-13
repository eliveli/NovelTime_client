import MainBG from "components/MainBG";
import { CategoryMark } from "components/CategoryMark";
import { useState } from "react";
import { Writing, Comment, WritingFilter } from "./UserPage.components";
import { WritingSection } from "./UserPage.styles";

// server request with userName and writing mark (my writing or other's writing)
const dataFromServer = {
  talk: [
    {
      talkId: "12",

      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈

      talkTitle: "이 소설 강추",

      userName: "나나a",
      // how to set userName from server : exist or not
      // 1. exist or not : myWriting -> userName exists, othersWriting -> don't exist
      createDate: "22.03.03",
      likeNO: 5,
      commentNO: 7,

      novelTitle: "헌터와 매드 사이언티스트",
    },
  ],
  recommend: [
    {
      recommendId: "34",

      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈

      recommendTitle: "이 소설 강추",

      userName: "나나나",
      // how to set userName from server
      // 1. exist or not : myWriting -> userName exists, othersWriting -> don't exist
      //  //  2. always exist, but if it is the same in the userName of useParams(), set myWriting,
      //  //                       if not othersWriting

      createDate: "22.03.03",
      likeNO: 5,

      novelTitle: "헌터와 매드 사이언티스트",
    },
  ],
  comment: [
    {
      commentId: "abdfdfcdef",
      commentContent: "코멘트 작성 중",
      createDate: "22.01.05",
      talkId: "as",
      talkTitle: "it is the best novel I've ever read",
      novelTitle: "헌터와 매드 사이언티스트",
    },
  ],
};

export default function UserPageWriting({ isMyWriting }: { isMyWriting: boolean }) {
  // server request with userName //

  //   const { userName } = useParams();
  const userName = "나나나" as string; // later remove this and cancel the comment mark above
  const loginUserName = "나나" as string; // later change it to real login user name

  // - divide writing page: my writing or other's writing ------------------- //
  // - divide writing page owner : login user or not //
  // if this is my writing page and login user is the owner, set "my", if not set "name's"
  const myWritingUserMark = userName === loginUserName ? `My` : `${userName}'s`;
  const myWritingMarkText = `${myWritingUserMark} Writing`;
  // if this is other's writing page and login user is the owner, ...
  const othersWritingUserMark = userName === loginUserName ? `I` : `${userName}`;
  const othersWritingMarkText = `Other's Writing ${othersWritingUserMark} Like`;
  // mark the page name
  const writingPageMark = isMyWriting ? myWritingMarkText : othersWritingMarkText;
  // ----------------------------------------------------------------------- //

  // writing category array : my writing or other's writing
  const writingCategory = isMyWriting ? ["프리톡", "추천", "댓글"] : ["프리톡", "추천"];
  // set filter category
  const [writingFilter, selectWritingFilter] = useState("프리톡");

  return (
    <MainBG>
      <CategoryMark isShowAll categoryText={writingPageMark} />

      <WritingFilter
        writingCategory={writingCategory}
        writingFilter={writingFilter}
        selectWritingFilter={selectWritingFilter}
      />
      <WritingSection>
        {writingFilter === "프리톡" &&
          dataFromServer.talk.map((_) => <Writing key={_.talkId} writingInfo={_} />)}
        {writingFilter === "추천" &&
          dataFromServer.recommend.map((_) => <Writing key={_.recommendId} writingInfo={_} />)}
        {writingFilter === "댓글" &&
          dataFromServer.comment.map((_) => <Comment key={_.commentId} commentInfo={_} />)}
      </WritingSection>
    </MainBG>
  );
}
