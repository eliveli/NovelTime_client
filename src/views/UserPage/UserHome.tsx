/* eslint-disable react/jsx-indent */
import React, { useState } from "react";
import MainBG from "components/MainBG";

import { CategoryMark } from "components/CategoryMark";
import { useAppSelector } from "store/hooks";
import { useParams } from "react-router-dom";
import { useGetContentOfUserHomeQuery } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { RowSlide } from "../../components/NovelListFrame";
import { NovelRow } from "../../components/Novel";

import { WritingSection } from "./UserPage.styles";
import { Writing, Comment, WritingFilter, NoContent } from "./UserWriting.components";
import contentMark from "./utils/contentMark";
import UserNovelList from "./UserNovelListAll.components";

export default function UserHome() {
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);
  const { userName } = useParams();

  // server request with userName
  const { data, isFetching } = useGetContentOfUserHomeQuery(userName as string, {
    skip: !userName,
  });
  // I think this error object from the api doesn't required to be handled.
  // because if the user doesn't exist in DB the error is handled in UserPageParent component.
  // and if the user's content don't exist it is not an error.

  // get the content mark
  const myWritingMark = contentMark(
    userName as string,
    loginUserInfo.userName,
    true, // isMyContent
    true, // isWriting
  );
  const othersWritingMark = contentMark(
    userName as string,
    loginUserInfo.userName,
    false, // isMyContent
    true, // isWriting
  );
  const myListMark = contentMark(
    userName as string,
    loginUserInfo.userName,
    true, // isMyContent
    false, // isWriting
  );
  const othersListMark = contentMark(
    userName as string,
    loginUserInfo.userName,
    false, // isMyContent
    false, // isWriting
  );
  // set filter category
  const [myFilter, setMyFilter] = useState("프리톡");
  const [otherFilter, setOtherFilter] = useState("프리톡");

  return (
    <MainBG>
      {isFetching && <Spinner styles="fixed" />}
      <CategoryMark
        infoFromUserPage={{
          userName: userName as string,
          path: "my-writing",
        }}
        isShowAllButton="모두 보기"
        isNoContent={
          data?.talksUserCreated.length === 0 &&
          data?.recommendsUserCreated.length === 0 &&
          data?.commentsUserCreated.length === 0
        }
        categoryText={myWritingMark}
      />
      <WritingFilter
        writingCategory={["프리톡", "추천", "댓글"]}
        writingFilter={myFilter}
        selectWritingFilter={setMyFilter}
      />
      <WritingSection
        isNoContent={
          (myFilter === "프리톡" && data?.talksUserCreated.length === 0) ||
          (myFilter === "추천" && data?.recommendsUserCreated.length === 0) ||
          (myFilter === "댓글" && data?.commentsUserCreated.length === 0)
        }
      >
        {myFilter === "프리톡" &&
          (data?.talksUserCreated.length ? (
            data.talksUserCreated.map((_) => <Writing key={_.talkId} writingInfo={_} />)
          ) : (
            <NoContent contentType="T" isCreatedBy />
          ))}
        {myFilter === "추천" &&
          (data?.recommendsUserCreated.length ? (
            data.recommendsUserCreated.map((_) => <Writing key={_.recommendId} writingInfo={_} />)
          ) : (
            <NoContent contentType="R" isCreatedBy />
          ))}
        {myFilter === "댓글" &&
          (data?.commentsUserCreated.length ? (
            data.commentsUserCreated.map((_) => <Comment key={_.commentId} commentInfo={_} />)
          ) : (
            <NoContent contentType="C" isCreatedBy />
          ))}
      </WritingSection>

      <CategoryMark
        infoFromUserPage={{
          userName: userName as string,
          path: "others-writing",
        }}
        isShowAllButton="모두 보기"
        isNoContent={data?.talksUserLikes.length === 0 && data?.recommendsUserLikes.length === 0}
        categoryText={othersWritingMark}
      />

      <WritingFilter
        writingCategory={["프리톡", "추천"]}
        writingFilter={otherFilter}
        selectWritingFilter={setOtherFilter}
      />
      <WritingSection
        isNoContent={
          (otherFilter === "프리톡" && data?.talksUserLikes.length === 0) ||
          (otherFilter === "추천" && data?.recommendsUserLikes.length === 0)
        }
      >
        {otherFilter === "프리톡" &&
          (data?.talksUserLikes.length ? (
            data?.talksUserLikes.map((_) => <Writing key={_.talkId} writingInfo={_} />)
          ) : (
            <NoContent contentType="T" isCreatedBy={false} />
          ))}
        {otherFilter === "추천" &&
          (data?.recommendsUserLikes.length ? (
            data?.recommendsUserLikes.map((_) => <Writing key={_.recommendId} writingInfo={_} />)
          ) : (
            <NoContent contentType="R" isCreatedBy={false} />
          ))}
      </WritingSection>

      <CategoryMark
        infoFromUserPage={{
          userName: userName as string,
          path: "my-list",
          list: {
            isMainCategory: true,
          },
        }}
        categoryText={myListMark}
        isShowAllButton="모두 보기"
        isNoContent={data?.novelLists.listsUserCreated.length === 0}
      />
      {data?.novelLists.listsUserCreated.length ? (
        <WritingSection isNoContent={false} isForListAll>
          {data?.novelLists.listsUserCreated.map((_) => (
            <UserNovelList key={_.listId} novelList={_} isMyList />
          ))}
        </WritingSection>
      ) : (
        <NoContent contentType="L" isCreatedBy />
      )}

      <CategoryMark
        infoFromUserPage={{
          userName: userName as string,
          path: "others-list",
          list: {
            isMainCategory: true,
          },
        }}
        categoryText={othersListMark}
        isShowAllButton="모두 보기"
        isNoContent={data?.novelLists.listsUserLikes.length === 0}
      />
      {data?.novelLists.listsUserLikes.length ? (
        <WritingSection isNoContent={false} isForListAll>
          {data?.novelLists.listsUserLikes.map((_) => (
            <UserNovelList key={_.listId} novelList={_} isMyList={false} />
          ))}
        </WritingSection>
      ) : (
        <NoContent contentType="L" isCreatedBy={false} />
      )}
    </MainBG>
  );
}
