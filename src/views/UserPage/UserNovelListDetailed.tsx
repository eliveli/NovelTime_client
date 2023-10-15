import Icon from "assets/Icon";
import Spinner from "assets/Spinner";
import { CategoryMark } from "components/CategoryMark";
import MainBG from "components/MainBG";
import { NovelRow } from "components/Novel";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { handleAlert, openModal, setMetaTags } from "store/clientSlices/modalSlice";

import {
  useGetListDetailedQuery,
  useGetAllListTitlesQuery,
  useRemoveNovelFromListMutation,
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
  NoContentInListDetailed,
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

export default function UserNovelListDetailed({ isCreated }: { isCreated: boolean }) {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const { userName, listId } = useParams();
  const loginUser = useAppSelector((state) => state.loginUser.user);

  const [orderNumber, setOrderNumber] = useState(1);

  // when user refreshes page and logins automatically and gets new accessToken
  // request will be automatically done again
  // it is required because LIKE info depending on user login would be always false
  //               with no token and no login info right after refreshing page
  // but when navigating to this page request won't be done again because token won't be changed

  const accessToken = useAppSelector((state) => state.loginUser.accessToken);
  // divide these two results
  // don't destructure like this : const { data, isFetching, ... }
  // just get it as variables to avoid getting same name
  const listDetailedResult = useGetListDetailedQuery({
    accessToken,
    userName: userName as string,
    listId: listId as string,
    order: orderNumber,
    isCreated, // isCreated or isLiked
  });
  const { data: allTitles } = useGetAllListTitlesQuery({
    userName: userName as string,
    isCreated: isCreated.toString(),
  });

  const novelsAsCurrentOrder = listDetailedResult.data?.novelList.novel;
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
    if (toggleLikeResult.isLoading) return; // prevent click event as loading

    const isTheListCanceledInLoginUserPage = !isCreated && userName === loginUser.userName;

    await toggleLike({
      contentType: "novelList",
      contentId: listId as string,
      isTheListCanceledInLoginUserPage,
      userName: userName as string,
      loginUserName: loginUser.userName,
    }).unwrap();

    // don't display current list after login user canceled LIKE in his/her other's list
    // just request next list and display it
    if (isTheListCanceledInLoginUserPage) {
      navigate(
        `/user-page/${userName}/${isCreated ? `novel-list/created` : `novel-list/liked`}/${
          novelListTitlesExceptSelectedOne[0].listId
        }`,
        { replace: true },
      );
    }
  };

  const handleLike = async () => {
    if (!listDetailedResult.data) return;

    const { isLike, userName: userNameAtTitle } = listDetailedResult.data.novelList;

    if (!loginUser.userId) {
      // when user didn't login
      dispatch(openModal("alert"));
      dispatch(handleAlert("좋아요를 누르려면 로그인을 해 주세요."));
    } else if (loginUser.userName === userNameAtTitle) {
      // prevent login user from setting LIKE of list that he/she created
      dispatch(openModal("alert"));
      dispatch(handleAlert("내가 만든 리스트에는 좋아요를 누를 수 없어요."));
    } else if (!isLike) {
      // set isLike to true by request without alert when it was false
      await toggleLikeRequest();
      dispatch(openModal("alert"));
      dispatch(handleAlert("내 좋아요 리스트에 추가되었습니다."));
      //
      // change this to modal that disappears later
      //
    } else if (userNameAtTitle !== loginUser.userName) {
      // when login user who isn't the owner of user page tries to cancel LIKE
      if (confirm("좋아요를 취소하면 내 유저페이지의 리스트에서 지워집니다. 취소하시겠어요?")) {
        await toggleLikeRequest();
      }
    } else if (userNameAtTitle === loginUser.userName) {
      // when login user who is the owner of user page tries to cancel LIKE
      if (confirm("좋아요를 취소하면 리스트에서 지워집니다. 취소하시겠어요?")) {
        await toggleLikeRequest();
      }
    }
  };

  // get the content page mark
  const contentPageMark = contentMark(userName as string, loginUser.userName, isCreated, false);

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
  const metaTags = () => {
    let description = "";
    if (isCreated && userName) {
      description = `${userName}님이 만든 리스트 - ${contentPageMark}`;
    } else {
      description = `${
        listDetailedResult.data?.novelList.userName || ""
      }님이 만든 리스트 - ${contentPageMark}`;
    }

    return {
      title: `${listDetailedResult.data?.novelList.listTitle || ""}`,
      description,
      image: listDetailedResult.data?.novelList.userImg?.src || loginUser.userImg.src,
      url: window.location.href,
    };
  };
  //
  useEffect(() => {
    if (!listDetailedResult.data) return;

    // when list id is undefined or there is no list that matches list id
    if (!listId || !listDetailedResult.data?.novelList?.novel) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("리스트가 존재하지 않습니다."));
      navigate(`/user-page/${userName as string}`, { replace: true });
    }
    //
    if (listDetailedResult.data) {
      dispatch(setMetaTags(metaTags()));
    }
  }, [listDetailedResult.data]);

  // edit the user's novel list _ remove selected novels from it //

  const [removeNovels, removeNovelsResult] = useRemoveNovelFromListMutation();

  const [isEditing, handleEditing] = useState(false);

  const isLoginUsersList = loginUser.userName && loginUser.userName === userName && isCreated;

  // novels to be removed
  const [novelsSelected, setNovelsSelected] = useState<string[]>([]);

  const finishRemoving = () => {
    handleEditing(false);
    setNovelsSelected([]);
  };

  const handleToRemoveNovelFromList = async () => {
    if (removeNovelsResult.isLoading) return;

    await removeNovels({
      listId: listId as string,
      novelIDs: novelsSelected,
      userName: userName as string,
    });

    if (removeNovelsResult.isError) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("리스트를 삭제할 수 없습니다. 새로고침 후 다시 시도해 보세요"));
    }

    finishRemoving();
  };

  if (isEditing) {
    return (
      <MainBG>
        {listDetailedResult.data && <MetaTag tags={metaTags()} />}
        {listDetailedResult.isFetching && <Spinner styles="fixed" />}

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
            <ListTitle>{listDetailedResult.data?.novelList.listTitle}</ListTitle>
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

        {listDetailedResult.data?.isNextOrder && (
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

  if (isCreated) {
    return (
      <MainBG>
        {listDetailedResult.data && <MetaTag tags={metaTags()} />}
        {(listDetailedResult.isFetching || toggleLikeResult.isLoading) && (
          <Spinner styles="fixed" />
        )}

        <CategoryMark categoryText={contentPageMark}>
          {!!novels?.length && (
            <ShareIconBox>
              <Icon.ShareWithArrow />
            </ShareIconBox>
          )}
          {!!novels?.length && isLoginUsersList && (
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
        {allTitles && (
          <ListTitleLimitHeightContnr limitContnrWidth={limitContnrWidth} isListMore={isListMore}>
            <ListTitleContnr
              limitContnrWidth={limitContnrWidth}
              isListMore={isListMore}
              ref={titleListRef}
            >
              {/* isLike */}
              {/* except when login user sees his/her my list in user page */}
              {userName !== loginUser.userName && !!listDetailedResult.data && (
                <HearIconBox
                  isLike={listDetailedResult.data.novelList.isLike}
                  size={28}
                  onClick={handleLike}
                >
                  <Icon.TogglingBigHeartIcon isLike={listDetailedResult.data.novelList.isLike} />
                </HearIconBox>
              )}

              {/* title of selected novel list */}
              {listDetailedResult.data && (
                <ListTitle key={listId} listId={listId} selectedListId={listId}>
                  {listDetailedResult.data.novelList.listTitle}
                </ListTitle>
              )}

              {/* titles of novel lists except selected one */}
              {listId &&
                userName &&
                novelListTitlesExceptSelectedOne?.map((_) => (
                  <ListTitle
                    key={_.listId}
                    listId={_.listId}
                    selectedListId={listId}
                    onClick={() => {
                      navigate(`/user-page/${userName}/novel-list/created/${_.listId}`);
                      setOrderNumber(1); // reset order as 1
                      novelsAsPreviousOrder.current = []; // reset previous novels
                    }}
                  >
                    {_.listTitle}
                  </ListTitle>
                ))}
            </ListTitleContnr>
          </ListTitleLimitHeightContnr>
        )}

        {!listDetailedResult.data && allTitles && (
          <NoContentInListDetailed>존재하지 않는 리스트입니다</NoContentInListDetailed>
        )}

        {!allTitles && <NoContentInListDetailed>작성한 리스트가 없습니다</NoContentInListDetailed>}

        {novels && !novels.length && (
          <NoContentInListDetailed>리스트에 담은 소설이 없습니다</NoContentInListDetailed>
        )}

        <NovelListContnr>
          {allTitles &&
            novels?.map((_) => <NovelRow key={_.novelId} novel={_} isWidth100 isNotSubInfo />)}
        </NovelListContnr>

        {listDetailedResult.data?.isNextOrder && (
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
      {listDetailedResult.data && <MetaTag tags={metaTags()} />}
      {(listDetailedResult.isFetching || toggleLikeResult.isLoading) && <Spinner styles="fixed" />}

      <CategoryMark categoryText={contentPageMark}>
        {novels && (
          <ShareIconBox>
            <Icon.ShareWithArrow />
          </ShareIconBox>
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
      {allTitles && (
        <ListTitleLimitHeightContnr limitContnrWidth={limitContnrWidth} isListMore={isListMore}>
          <ListTitleContnr
            limitContnrWidth={limitContnrWidth}
            isListMore={isListMore}
            ref={titleListRef}
          >
            {/* isLike */}
            {!!listDetailedResult.data && (
              <HearIconBox
                isLike={listDetailedResult.data.novelList.isLike}
                size={28}
                onClick={handleLike}
              >
                <Icon.TogglingBigHeartIcon isLike={listDetailedResult.data.novelList.isLike} />
              </HearIconBox>
            )}

            {/* title of selected novel list */}
            {listDetailedResult.data && (
              <ListTitle key={listId} listId={listId} selectedListId={listId}>
                <OthersTitleContnr>
                  <UserImg
                    userImg={listDetailedResult.data.novelList.userImg as ProfileImg}
                    isTitle
                  />
                  {listDetailedResult.data.novelList.userName}
                  <ListTitleNormalStyle>의 리스트 : </ListTitleNormalStyle>
                  &nbsp;
                  {listDetailedResult.data.novelList.listTitle}
                </OthersTitleContnr>
              </ListTitle>
            )}

            {/* titles of novel lists except selected one */}
            {listId &&
              userName &&
              novelListTitlesExceptSelectedOne?.map((_) => (
                <ListTitle
                  key={_.listId}
                  listId={_.listId}
                  selectedListId={listId}
                  onClick={() => {
                    navigate(`/user-page/${userName}/novel-list/liked/${_.listId}`);
                    setOrderNumber(1); // reset order as 1
                    novelsAsPreviousOrder.current = []; // reset previous novels
                  }}
                >
                  <OthersTitleContnr>
                    <UserImg userImg={_.userImg as ProfileImg} isTitle />
                    {_.userName}
                    <ListTitleNormalStyle>의 리스트 : </ListTitleNormalStyle>
                    &nbsp;
                    {_.listTitle}
                  </OthersTitleContnr>
                </ListTitle>
              ))}
          </ListTitleContnr>
        </ListTitleLimitHeightContnr>
      )}

      {!listDetailedResult.data && allTitles && (
        <NoContentInListDetailed>존재하지 않는 리스트입니다</NoContentInListDetailed>
      )}

      {!allTitles && (
        <NoContentInListDetailed>좋아요를 누른 리스트가 없습니다</NoContentInListDetailed>
      )}

      {novels && !novels.length && (
        <NoContentInListDetailed>리스트에 담은 소설이 없습니다</NoContentInListDetailed>
      )}

      <NovelListContnr>
        {allTitles &&
          novels?.map((_) => <NovelRow key={_.novelId} novel={_} isWidth100 isNotSubInfo />)}
      </NovelListContnr>

      {listDetailedResult.data?.isNextOrder && (
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
