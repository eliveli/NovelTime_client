import React, { useState } from "react";
import MainBG from "components/MainBG";

import { CategoryMark } from "components/CategoryMark";
import { useAppSelector } from "store/hooks";
import { useParams } from "react-router-dom";
import { useGetContentsForUserPageHomeByUserNameQuery } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { RowSlide } from "../../components/NovelListFrame";
import { NovelRow } from "../../components/Novel";

import { WritingSection } from "./UserPage.styles";
import { Writing, Comment, WritingFilter } from "./UserPage.components";
import contentMark from "./utils/contentMark";

export default function UserPageHome() {
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);
  const { userName } = useParams();

  // server request with userName
  const { data, isLoading } = useGetContentsForUserPageHomeByUserNameQuery(userName as string, {
    skip: !userName,
  });
  // I think this error object from the api doesn't required to be handled.
  // because if the user doesn't exist in DB the error is handled in UserPageParent component.
  // and if the user's contents don't exist it is not an error.

  console.log("userPageHome data:", data);

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
      {isLoading && <Spinner styles="fixed" />}
      <CategoryMark
        infoFromUserPage={{
          userName: userName as string,
          path: "myWriting",
        }}
        isShowAllButton="모두 보기"
        categoryText={myWritingMark}
      />
      <WritingFilter
        writingCategory={["프리톡", "추천", "댓글"]}
        writingFilter={myFilter}
        selectWritingFilter={setMyFilter}
      />
      <WritingSection>
        {myFilter === "프리톡" &&
          data?.talksUserCreated.map((_) => <Writing key={_.talkId} writingInfo={_} />)}
        {myFilter === "추천" &&
          data?.recommendsUserCreated.map((_) => <Writing key={_.recommendId} writingInfo={_} />)}
        {myFilter === "댓글" &&
          data?.commentsUserCreated.map((_) => <Comment key={_.commentId} commentInfo={_} />)}
      </WritingSection>

      <CategoryMark
        infoFromUserPage={{
          userName: userName as string,
          path: "othersWriting",
        }}
        isShowAllButton="모두 보기"
        categoryText={othersWritingMark}
      />

      <WritingFilter
        writingCategory={["프리톡", "추천"]}
        writingFilter={otherFilter}
        selectWritingFilter={setOtherFilter}
      />
      <WritingSection>
        {otherFilter === "프리톡" &&
          data?.talksUserLikes.map((_) => <Writing key={_.talkId} writingInfo={_} />)}
        {otherFilter === "추천" &&
          data?.recommendsUserLikes.map((_) => <Writing key={_.recommendId} writingInfo={_} />)}
      </WritingSection>

      <CategoryMark
        infoFromUserPage={{
          userName: userName as string,
          path: "myList",
          list: {
            isMainCategory: true,
            listId: data?.novelLists.listsUserCreated[0].listId as string,
          },
        }}
        categoryText={myListMark}
        isShowAllButton="모두 보기"
      />
      {data?.novelLists.listsUserCreated.map((list) => (
        <RowSlide
          categoryId={list.listId}
          categoryText={list.listTitle}
          novelNO={list.novel.length}
          infoFromUserPage={{
            userName: userName as string,
            path: "myList",
            list: { isMainCategory: false, listId: list.listId },
          }}
          isShowAllMark
        >
          {list.novel.map((_) => (
            <NovelRow key={_.novelId} novel={_} isNotSubInfo />
          ))}
        </RowSlide>
      ))}
      <CategoryMark
        infoFromUserPage={{
          userName: userName as string,
          path: "othersList",
          list: {
            isMainCategory: true,
            listId: data?.novelLists.listsUserLikes[0].listId as string,
          },
        }}
        categoryText={othersListMark}
        isShowAllButton="모두 보기"
      />
      {data?.novelLists.listsUserLikes.map((list) => (
        <RowSlide
          categoryId={list.listId}
          categoryText={list.listTitle}
          novelNO={list.novel.length}
          infoFromUserPage={{
            userName: userName as string,
            path: "othersList",
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
    </MainBG>
  );
}
