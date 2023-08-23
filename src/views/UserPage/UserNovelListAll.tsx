import Icon from "assets/Icon";
import Spinner from "assets/Spinner";
import { CategoryMark } from "components/CategoryMark";
import MainBG from "components/MainBG";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { closeModal, setMetaTags } from "store/clientSlices/modalSlice";

import MetaTag from "utils/MetaTag";
import { ShareIconBox, WritingSection } from "./UserPage.styles";
import UserNovelList from "./UserNovelListAll.components";
import { NoContent } from "./UserWriting.components";

export default function UserNovelListAll({ isMyList }: { isMyList: boolean }) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { userName } = useParams();
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);
  const metaTags = {
    title: userName + !isMyList ? "님의 리스트" : "님이 좋아하는 리스트",
    description: userName + !isMyList ? "님의 리스트" : "님이 좋아하는 리스트",
    image: `https://photos.google.com/album/AF1QipOy4A30VtN2Afb5ynQYejvDxN_5CVBjYRa_DYX4/photo/AF1QipM-TuRzTrhw9-AH4fdhB9EwS1vxjwdOfdX2svVp`,
    url: window.location.href,
  };
  const setCategoryText = () => {
    // this is login user's page
    if (loginUserInfo.userName === userName) {
      if (isMyList) return "My List";
      return "Other's List I Like";
    }
    // this is other user's page

    if (isMyList) return `${userName}'s List`;
    return `Other's List ${userName} Like`;
  };

  const novelListAll = [
    {
      listId: "123",
      listTitle: "title",

      novelNo: 3,
      novelImgs: [
        "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png",
        "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png",
      ],
      likeNo: 3,

      userName: "lala",
      userImg: {
        src: "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png",
        position: "center",
      },
    },
    {
      listId: "1234",
      listTitle: "title",

      novelNo: 3,
      novelImgs: [
        "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png",
        "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png",
        "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png",
      ],
      likeNo: 3,

      userName: "lala",
      userImg: {
        src: "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png",
        position: "center",
      },
    },
    {
      listId: "1234",
      listTitle: "title",

      novelNo: 3,
      novelImgs: [
        "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png",
        "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png",
        "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png",
      ],
      likeNo: 3,

      userName: "라라라301",
      userImg: {
        src: "https://cdn.pixabay.com/photo/2017/02/01/09/52/animal-2029245_960_720.png",
        position: "center",
      },
    },
  ];
  return (
    <MainBG>
      <CategoryMark categoryText={setCategoryText()}>
        <ShareIconBox>
          <Icon.ShareWithArrow />
        </ShareIconBox>
      </CategoryMark>

      {novelListAll.length ? (
        <WritingSection isNoContent={false} isForListAll>
          {novelListAll.map((_) => (
            <UserNovelList key={_.listId} novelList={_} isMyList={isMyList} />
          ))}
        </WritingSection>
      ) : (
        <NoContent contentType="L" isCreatedBy={isMyList} />
      )}
    </MainBG>
  );
}
