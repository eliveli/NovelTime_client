import Icon from "assets/Icon";
import Spinner from "assets/Spinner";
import { CategoryMark } from "components/CategoryMark";
import MainBG from "components/MainBG";
import { NovelRow } from "components/Novel";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { setMetaTags } from "store/clientSlices/modalSlice";

import {
  useGetListDetailedUserCreatedQuery,
  useGetListDetailedUserLikedQuery,
  useGetListTitlesAndOtherInListDetailedQuery,
  useToggleLikeMutation,
} from "store/serverAPIs/novelTime";
import { SimpleNovel } from "store/serverAPIs/types";
import { useComponentScrollWidth, useComponentHeight } from "utils";
import MetaTag from "utils/MetaTag";
import useCallbackComponentWidth from "utils/useCallbackComponentWidth";
import ShowMoreContent from "assets/ShowMoreContent";
import {
  ContainerWidth,
  ListTitleLimitHeightContnr,
  ListTitleContnr,
  ListTitle,
  ListTitleNormalStyle,
  NovelListContnr,
  MoreBtnBox,
  MoreBtnBoxBG,
  MoreBtnParent,
  HearIconBox,
  ShareIconBox,
  UserImg,
  OthersTitleContnr,
  ButtonToEdit,
  ButtonToEditContainer,
  NovelContainer,
  IconContainer,
} from "./UserPage.styles";
import contentMark from "./utils/contentMark";

interface ProfileImg {
  src: string;
  position: string;
}

interface NovelListTitle {
  listId: string;
  listTitle: string;
  userName?: string;
  userImg?: { src: string; position: string };
}

export default function UserNovelListDetailed({ isMyList }: { isMyList: boolean }) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { userName, listId } = useParams();
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);

  const [orderNumber, setOrderNumber] = useState(1);

  // when user refreshes page and logins automatically and gets new accessToken
  // request will be automatically done again
  // it is required because LIKE info depending on user login would be always false
  //               with no token and no login info right after refreshing page
  // but when navigating to this page request won't be done again because token won't be changed

  const accessToken = useAppSelector((state) => state.user.accessToken);
  // divide these two results
  // don't destructure like this : const { data, isFetching, ... }
  // just get it as variables to avoid getting same name
  const myListResult = useGetListDetailedUserCreatedQuery(
    {
      accessToken,
      userName: userName as string,
      listId: listId as string,
      order: orderNumber,
    },
    {
      skip: !isMyList,
    },
  );
  const othersListResult = useGetListDetailedUserLikedQuery(
    {
      accessToken,
      userName: userName as string,
      listId: listId as string,
      order: orderNumber,
    },
    {
      skip: isMyList,
    },
  );

  const { data: allTitles } = useGetListTitlesAndOtherInListDetailedQuery({
    userName: userName as string,
    isMyList: isMyList.toString(),
  });

  const currentNovelListInfo = isMyList ? myListResult?.data : othersListResult?.data;

  const novelsAsCurrentOrder = currentNovelListInfo?.novelList.novel;
  const novelsAsPreviousOrder = useRef<SimpleNovel[]>();
  const novels =
    orderNumber > 1 && novelsAsPreviousOrder.current && novelsAsCurrentOrder
      ? [...novelsAsPreviousOrder.current, ...novelsAsCurrentOrder]
      : novelsAsCurrentOrder;

  // for setting novel list titles with simple infos //
  const novelListTitlesExceptSelectedOne = allTitles?.filter(
    (_) => _.listId !== listId,
  ) as NovelListTitle[];

  // toggle like //
  const [toggleLike, toggleLikeResult] = useToggleLikeMutation();

  const toggleLikeRequest = async () => {
    try {
      if (toggleLikeResult.isLoading) return; // prevent click event as loading

      const isOthersListOfLoginUser = !isMyList && userName === loginUserInfo?.userName;

      await toggleLike({
        contentType: "novelList",
        contentId: listId as string,
        isOthersListOfLoginUser,
      }).unwrap();

      // don't display current list after login user canceled LIKE in his/her other's list
      // just request next list and display it
      if (isOthersListOfLoginUser) {
        navigate(
          `/user-page/${userName}/${isMyList ? `my-list` : `others-list`}/${
            novelListTitlesExceptSelectedOne[0].listId
          }`,
          { replace: true },
        );
      }
    } catch (error) {
      console.log("Failed to toggle LIKE:", error);
    }
  };

  const handleLike = async () => {
    if (!currentNovelListInfo) return;

    const { isLike, userName: userNameAtTitle } = currentNovelListInfo.novelList;

    if (!loginUserInfo.userId) {
      // when user didn't login
      alert("좋아요를 누르려면 로그인을 해 주세요.");
    } else if (loginUserInfo.userName === userNameAtTitle) {
      // prevent login user from setting LIKE of list that he/she created
      alert("내가 만든 리스트에는 좋아요를 누를 수 없어요.");
    } else if (!isLike) {
      // set isLike to true by request without alert when it was false
      await toggleLikeRequest();
      alert("내 좋아요 리스트에 추가되었습니다.");
      //
      // change this to modal that disappears later
      //
    } else if (userNameAtTitle !== loginUserInfo.userName) {
      // when login user who isn't the owner of user page tries to cancel LIKE
      if (confirm("좋아요를 취소하면 내 유저페이지의 리스트에서 지워집니다. 취소하시겠어요?")) {
        await toggleLikeRequest();
      }
    } else if (userNameAtTitle === loginUserInfo.userName) {
      // when login user who is the owner of user page tries to cancel LIKE
      if (confirm("좋아요를 취소하면 리스트에서 지워집니다. 취소하시겠어요?")) {
        await toggleLikeRequest();
      }
    }
  };

  // get the content page mark
  const contentPageMark = contentMark(userName as string, loginUserInfo.userName, isMyList, false);

  // - list more button : show or not all the list title
  const [isListMore, setListMore] = useState(false);

  // - calculate the size of the title list container -------------------------   //
  // if the list title container is over than title list width, show the MoreBtn. //
  // - get shown width of title container
  const { width: containerWidth, refCallback: containerWidthRef } =
    useCallbackComponentWidth(isListMore);
  const limitContnrWidth = containerWidth - 35; // shown width
  // - get scrollable width including overflowed hidden space
  const titleListRef = useRef<HTMLDivElement>(null);
  const titleListWidthScrollable = useComponentScrollWidth(
    titleListRef,
    containerWidth,
    isListMore,
  );

  // ---------------------------------------------------------------------------------- //
  // - get title list height to show or no more button when isListMore is true ----------  //
  // - if titleListHeight is not longer than the height 32px that is 1 line of ListTitleContnr,
  // - then don't show the button even if isListMore is true
  const titleListHeight = useComponentHeight(titleListRef, containerWidth, isListMore);
  //
  const metaTags = {
    title: `${currentNovelListInfo?.novelList.listTitle}`,
    description: `${
      isMyList ? userName : currentNovelListInfo?.novelList.userName
    }의 리스트 - ${contentPageMark}`,
    image: `https://photos.google.com/album/AF1QipOy4A30VtN2Afb5ynQYejvDxN_5CVBjYRa_DYX4/photo/AF1QipM-TuRzTrhw9-AH4fdhB9EwS1vxjwdOfdX2svVp`,
    url: window.location.href,
  };
  //
  useEffect(() => {
    if (!currentNovelListInfo) return;

    // when list id is undefined or there is no list that matches list id
    if (!listId || !currentNovelListInfo?.novelList?.novel) {
      alert("리스트가 존재하지 않습니다.");
      navigate(`/user-page/${userName as string}`, { replace: true });
    }
    //
    if (currentNovelListInfo) {
      dispatch(
        setMetaTags({
          title: metaTags.title,
          description: metaTags.description,
          image: metaTags.image,
          url: metaTags.url,
        }),
      );
    }
  }, [currentNovelListInfo]);

  // edit the user's novel list _ remove selected novels from it //
  const [isEditing, handleEditing] = useState(false);

  const loginUserName = useAppSelector((state) => state.user.loginUserInfo.userName);
  const isLoginUsersList = loginUserName && loginUserName === userName && isMyList;

  // novels to be removed
  const [novelsSelected, setNovelsSelected] = useState<string[]>([]);

  const finishRemoving = () => {
    handleEditing(false);
    setNovelsSelected([]);
  };

  const handleToRemoveNovelFromList = () => {
    // * server request

    finishRemoving();
  };

  // case 1. fetching data at first
  // case 2. fetching next novel list right after canceling LIKE in login user's other's list page
  if (!currentNovelListInfo || listId !== currentNovelListInfo.novelList.listId) {
    return <Spinner styles="fixed" />;
  }

  if (isEditing) {
    return (
      <MainBG>
        {currentNovelListInfo && <MetaTag tags={metaTags} />}
        {(myListResult.isFetching || othersListResult.isFetching) && <Spinner styles="fixed" />}

        <CategoryMark categoryText={contentPageMark}>
          <ShareIconBox>
            <Icon.ShareWithArrow />
          </ShareIconBox>

          <ButtonToEditContainer>
            <ButtonToEdit onClick={handleToRemoveNovelFromList}>선택 소설 삭제</ButtonToEdit>
            <ButtonToEdit onClick={finishRemoving}>취소</ButtonToEdit>
          </ButtonToEditContainer>
        </CategoryMark>

        {/* title list container */}
        <ListTitleLimitHeightContnr limitContnrWidth={limitContnrWidth} isListMore={isListMore}>
          <ListTitleContnr
            limitContnrWidth={limitContnrWidth}
            isListMore={isListMore}
            ref={titleListRef}
          >
            <ListTitle>{currentNovelListInfo.novelList.listTitle}</ListTitle>
          </ListTitleContnr>
        </ListTitleLimitHeightContnr>

        <NovelListContnr>
          {novels?.map((_) => (
            <NovelContainer
              onClick={() => {
                // unselect the novel if it was selected already
                if (novelsSelected.includes(_.novelId)) {
                  const nextLists = novelsSelected.filter((__) => __ !== _.novelId);
                  setNovelsSelected(nextLists);
                  return;
                }

                // select one
                setNovelsSelected((prev) => [...prev, _.novelId]);
              }}
            >
              <IconContainer>
                {novelsSelected.includes(_.novelId) ? (
                  <Icon.CheckBoxSelected />
                ) : (
                  <Icon.CheckBoxOutline />
                )}
              </IconContainer>

              <NovelRow key={_.novelId} novel={_} isWidth100 isNotSubInfo isNotNavigation />
            </NovelContainer>
          ))}
        </NovelListContnr>

        {currentNovelListInfo.isNextOrder && (
          <ShowMoreContent
            _onClick={() => {
              setOrderNumber((currentOrder) => currentOrder + 1);
              novelsAsPreviousOrder.current = novels;
            }}
          />
        )}
      </MainBG>
    );
  }

  return (
    <MainBG>
      {currentNovelListInfo && <MetaTag tags={metaTags} />}
      {(myListResult.isFetching || othersListResult.isFetching || toggleLikeResult.isLoading) && (
        <Spinner styles="fixed" />
      )}

      <CategoryMark categoryText={contentPageMark}>
        <ShareIconBox>
          <Icon.ShareWithArrow />
        </ShareIconBox>
        {isLoginUsersList && (
          <ButtonToEditContainer>
            <ButtonToEdit isNoBorder onClick={() => handleEditing(true)}>
              편집
            </ButtonToEdit>
          </ButtonToEditContainer>
        )}
      </CategoryMark>
      {/* more button to show or not all the title list */}
      {/* when isListMore is true, always : limitContnrWidth === titleListWidthScrollable
          so the following should be divided two, not put together in one expression.
        */}

      <ContainerWidth ref={containerWidthRef} />
      {isListMore && titleListHeight > 32 && (
        <MoreBtnParent>
          <MoreBtnBoxBG isListMore={isListMore}>
            <MoreBtnBox
              size={28}
              onClick={() => {
                setListMore(!isListMore);
              }}
            >
              <Icon.SmallUp />
            </MoreBtnBox>
          </MoreBtnBoxBG>
        </MoreBtnParent>
      )}
      {!isListMore && limitContnrWidth < titleListWidthScrollable && (
        <MoreBtnParent>
          <MoreBtnBoxBG isListMore={isListMore}>
            <MoreBtnBox
              size={28}
              onClick={() => {
                setListMore(!isListMore);
              }}
            >
              <Icon.SmallDown />
            </MoreBtnBox>
          </MoreBtnBoxBG>
        </MoreBtnParent>
      )}
      {/* title list container */}
      <ListTitleLimitHeightContnr limitContnrWidth={limitContnrWidth} isListMore={isListMore}>
        <ListTitleContnr
          limitContnrWidth={limitContnrWidth}
          isListMore={isListMore}
          ref={titleListRef}
        >
          {/* isLike */}
          {/* except when login user sees his/her my list in user page */}
          {!(isMyList && userName === loginUserInfo.userName) && (
            <HearIconBox
              isLike={currentNovelListInfo.novelList.isLike}
              size={28}
              onClick={handleLike}
            >
              <Icon.TogglingBigHeartIcon isLike={currentNovelListInfo.novelList.isLike} />
            </HearIconBox>
          )}

          {/* title of selected novel list */}
          <ListTitle key={listId} listId={listId} selectedListId={listId}>
            {/* in my list page */}
            {isMyList && currentNovelListInfo.novelList.listTitle}
            {/* in other's list page */}
            {!isMyList && currentNovelListInfo && (
              <OthersTitleContnr>
                <UserImg userImg={currentNovelListInfo.novelList.userImg as ProfileImg} isTitle />
                {currentNovelListInfo.novelList.userName}
                <ListTitleNormalStyle>의 리스트 : </ListTitleNormalStyle>
                &nbsp;
                {currentNovelListInfo.novelList.listTitle}
              </OthersTitleContnr>
            )}
          </ListTitle>

          {/* titles of novel lists except selected one */}
          {listId &&
            novelListTitlesExceptSelectedOne?.map((_) => (
              <ListTitle
                key={_.listId}
                listId={_.listId}
                selectedListId={listId}
                onClick={() => {
                  navigate(
                    `/user-page/${userName as string}/${isMyList ? `my-list` : `others-list`}/${
                      _.listId
                    }`,
                  );
                  setOrderNumber(1); // reset order as 1
                  novelsAsPreviousOrder.current = []; // reset previous novels
                }}
              >
                {isMyList ? (
                  // in my list page
                  _.listTitle
                ) : (
                  // in other's list page
                  <OthersTitleContnr>
                    <UserImg userImg={_.userImg as ProfileImg} isTitle />
                    {_.userName}
                    <ListTitleNormalStyle>의 리스트 : </ListTitleNormalStyle>
                    &nbsp;
                    {_.listTitle}
                  </OthersTitleContnr>
                )}
              </ListTitle>
            ))}
        </ListTitleContnr>
      </ListTitleLimitHeightContnr>

      <NovelListContnr>
        {novels?.map((_) => (
          <NovelRow key={_.novelId} novel={_} isWidth100 isNotSubInfo />
        ))}
      </NovelListContnr>

      {currentNovelListInfo.isNextOrder && (
        <ShowMoreContent
          _onClick={() => {
            setOrderNumber((currentOrder) => currentOrder + 1);
            novelsAsPreviousOrder.current = novels;
          }}
        />
      )}
    </MainBG>
  );
}
