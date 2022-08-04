/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable react/jsx-indent */
import Icon from "assets/Icon";
import Spinner from "assets/Spinner";
import { CategoryMark } from "components/CategoryMark";
import MainBG from "components/MainBG";
import { NovelRow } from "components/Novel";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import {
  useGetContentsForUserPageMyListQuery,
  useGetContentsForUserPageOthersListQuery,
  useToggleLikeMutation,
} from "store/serverAPIs/novelTime";
import { NovelListSetForMyOrOthersList } from "store/serverAPIs/types";
import { useComponentWidth, useComponentScrollWidth, useComponentHeight } from "utils";
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
  NextContentsBtn,
} from "./UserPage.styles";
import contentMark from "./utils/contentMark";

interface ProfileImg {
  src: string;
  position: string;
}
interface NovelList {
  novelList: NovelListSetForMyOrOthersList;
  isNextOrder: boolean;
  currentOrder: number;
}
interface NovelListTitle {
  listId: string;
  listTitle: string;
  userName?: string;
  userImg?: { src: string; position: string };
}
const UserPageNovelList = React.memo(({ isMyList }: { isMyList: boolean }) => {
  const accessToken = useAppSelector((state) => state.user.accessToken);

  const navigate = useNavigate();

  const { userName, listId } = useParams();
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);

  const [paramsForRequest, setParamsForRequest] = useState({
    accessToken,
    userName: userName as string,
    listId: listId as string,
    order: 1,
  });

  // Refetch when token is added as page refresh //
  // isLike는 로그인 유저에 의존하는 값인데 새로고침 직후에는 항상 false.
  // 새로고침 직후에는 토큰 및 로그인 유저 정보가 없기 때문. 자동로그인 요청을 할 뿐.
  // 그 때 로그인 성공 시 토큰을 받아 오면 재요청해 페이지에 필요한 데이터를 받아오기.
  // 새로고침을 하지 않고 로그인 상태에서 단순히 페이지 이동만 했을 때에는 값을 처음부터 잘 받아옴.
  if (!!accessToken && !paramsForRequest.accessToken) {
    setParamsForRequest({ ...paramsForRequest, accessToken });
  }

  const currentListInfoRef = useRef({
    listId: listId as string,
    isNextOrder: false,
    currentOrder: 1,
  });

  // divide these two results
  // don't destructure like this : const { data, isFetching, ... }
  // just get it as variables to avoid getting same name
  const myListResult = useGetContentsForUserPageMyListQuery(paramsForRequest, {
    skip: !isMyList,
  });
  const othersListResult = useGetContentsForUserPageOthersListQuery(paramsForRequest, {
    skip: isMyList,
  });

  // it is used to update novel list right after toggling LIKE
  const isLikeUpdatedRef = useRef(false);
  //

  // toggle like //
  const [toggleLike, toggleLikeResult] = useToggleLikeMutation();

  const toggleLikeRequest = async () => {
    try {
      if (toggleLikeResult.isLoading) return; // prevent click event as loading
      isLikeUpdatedRef.current = true;

      await toggleLike({ contentType: "novelList", contentId: listId as string }).unwrap();
    } catch (error) {
      console.log("Failed to toggle LIKE:", error);
    }
  };

  // if it is true delete list by list id after saving other list
  // when login user canceled LIKE in other's list that he/she liked in his/her user page
  const isNeedToDeleteListRef = useRef(false);
  //

  // state for saving novel lists from server
  // {
  //   [ listId1 ]: { novelList : ... , isNextOrder : ... , currentOrder : ... },
  //   [ listId2 ]: { novelList : ... , isNextOrder : ... , currentOrder : ... }
  // }

  // for both in my novel list page and in other's novel list page
  const [novelListsOfUser, setNovelListsOfUser] = useState<{ [x: string]: NovelList }>();

  // for saving all novel list titles with simple info //
  const novelListTitlesRef = useRef<NovelListTitle[]>([]);

  // get and save the novel lists in my novel list page
  useEffect(() => {
    // don't save cached data for other's list
    // it may remain because of rtk query trait
    if (!isMyList) return;

    if (!myListResult.data) return;

    // if list id is undefined or there isn't selected list in DB
    //     or both user and selected novel list don't match
    if (
      !listId ||
      (myListResult.data && Object.keys(myListResult.data?.novelList).length === 0) ||
      (novelListsOfUser && !novelListsOfUser[listId]?.novelList.listId)
    ) {
      alert("리스트가 존재하지 않습니다.");
      navigate(`/user-page/${userName as string}`, { replace: true });
      return;
    }

    const { novelList, isNextOrder } = myListResult.data;
    const newListId = novelList.listId;

    // save novel list //
    if (!novelListsOfUser || (novelListsOfUser && !novelListsOfUser[newListId])) {
      // saving at first || adding new novel list

      const currentOrder = 1;

      setNovelListsOfUser({
        ...novelListsOfUser,
        [newListId]: {
          novelList,
          isNextOrder,
          currentOrder,
        },
      });

      // set current novel list info
      currentListInfoRef.current = {
        listId: newListId,
        isNextOrder,
        currentOrder,
      };

      // set all the novel list titles as new whenever getting new novel list
      novelListTitlesRef.current = [
        {
          listId: newListId,
          listTitle: novelList.listTitle,
          userName: novelList.userName,
          userImg: novelList.userImg,
        },
        ...novelList.otherList.map((_) => ({ ..._ })),
      ];

      // change url to show changed-list-id in it
      // after doing this component is rendered but state in it remains.
      // but request is not occurred. so I requested before changing url.
      if (novelListsOfUser) {
        // if condition is required to prevent user from navigating once more to this url
        //                                                   as entering this page at fist
        navigate(`/user-page/${userName as string}/my-list/${newListId}`);
      }
      //
    } else if (isLikeUpdatedRef.current) {
      // after toggling LIKE and refetching data
      // just reset LIKE not all because if novel order is 2 and I reset all
      //   then the list that contains both order 1 and 2 would be replaced as order 2 not all
      // this request is required because if it is used as cached data
      //   when navigating other page and coming back here,
      //   LIKE info should be as updated from the cached data

      setNovelListsOfUser({
        ...novelListsOfUser,
        [listId]: {
          ...novelListsOfUser[listId],
          novelList: {
            ...novelListsOfUser[listId].novelList,
            isLike: novelList.isLike,
          },
        },
      });

      isLikeUpdatedRef.current = false;

      // set all the novel list titles as new whenever getting new novel list
      novelListTitlesRef.current = [
        {
          listId,
          listTitle: novelList.listTitle,
          userName: novelList.userName,
          userImg: novelList.userImg,
        },
        ...novelList.otherList.map((_) => ({ ..._ })),
      ];
    } else if (novelListsOfUser && novelListsOfUser[newListId]) {
      // adding novels in the existing list as clicking show-more button
      const currentOrder = novelListsOfUser[newListId].currentOrder + 1;

      // in this case variable "new list id" is the same as previous one.

      setNovelListsOfUser({
        ...novelListsOfUser,
        [newListId]: {
          novelList: {
            ...novelList,
            novel: [...novelListsOfUser[newListId].novelList.novel, ...novelList.novel],
          },
          isNextOrder,
          currentOrder,
        },
      });
      // set current novel list info
      currentListInfoRef.current = {
        listId,
        isNextOrder,
        currentOrder,
      };
    }
  }, [myListResult.data]);
  // get and save the novel lists in other's novel list page
  useEffect(() => {
    // don't save cached data for my list
    // it may remain because of rtk query trait
    if (isMyList) return;

    if (!othersListResult.data) return;

    // if list id is undefined or there isn't selected list in DB
    //    or both user and selected novel list don't match
    if (
      !listId ||
      (othersListResult.data && Object.keys(othersListResult.data?.novelList).length === 0) ||
      (novelListsOfUser && !novelListsOfUser[listId]?.novelList.listId)
    ) {
      alert("리스트가 존재하지 않습니다.");
      navigate(`/user-page/${userName as string}`, { replace: true });
      return;
    }

    const { novelList, isNextOrder } = othersListResult.data;
    const newListId = novelList.listId;
    // save novel list //
    if (!novelListsOfUser || (novelListsOfUser && !novelListsOfUser[newListId])) {
      // saving at first || adding new novel list

      const currentOrder = 1;

      setNovelListsOfUser({
        ...novelListsOfUser,
        [newListId]: {
          novelList,
          isNextOrder,
          currentOrder,
        },
      });
      // set current novel list info
      currentListInfoRef.current = {
        listId: newListId,
        isNextOrder,
        currentOrder,
      };

      // set all the novel list titles as new whenever getting new novel list
      novelListTitlesRef.current = [
        {
          listId: newListId,
          listTitle: novelList.listTitle,
          userName: novelList.userName,
          userImg: novelList.userImg,
        },
        ...novelList.otherList.map((_) => ({ ..._ })),
      ];

      // when login user canceled LIKE in other's list he/she liked in his/her user page
      // delete the list where isLike variable was set to false
      if (novelListsOfUser && isNeedToDeleteListRef.current) {
        setNovelListsOfUser((prevNovelListsOfUser) => {
          const copyOfNovelListsOfUser = {
            ...prevNovelListsOfUser,
            // add next list
            [newListId]: {
              novelList,
              isNextOrder,
              currentOrder,
            },
          };
          // delete current list
          delete copyOfNovelListsOfUser[listId];

          return copyOfNovelListsOfUser;
        });

        isNeedToDeleteListRef.current = false;
      }

      // change url to show changed-list-id in it
      // after doing this component is rendered but state in it remains.
      // but request is not occurred. so I requested before changing url.
      if (novelListsOfUser) {
        // if condition is required to prevent user from navigating once more to this url
        //                                                   as entering this page at fist
        navigate(`/user-page/${userName as string}/others-list/${newListId}`);
      }
    } else if (isLikeUpdatedRef.current) {
      // after toggling LIKE and refetching data
      // just reset LIKE not all because if novel order is 2 and I reset all
      //   then the list that contains both order 1 and 2 would be replaced as order 2 not all
      // this request is required because if it is used as cached data
      //   when navigating other page and coming back here,
      //   LIKE info should be as updated from the cached data

      setNovelListsOfUser({
        ...novelListsOfUser,
        [listId]: {
          ...novelListsOfUser[listId],
          novelList: {
            ...novelListsOfUser[listId].novelList,
            isLike: novelList.isLike,
          },
        },
      });

      isLikeUpdatedRef.current = false;

      // set all the novel list titles as new whenever getting new novel list
      novelListTitlesRef.current = [
        {
          listId,
          listTitle: novelList.listTitle,
          userName: novelList.userName,
          userImg: novelList.userImg,
        },
        ...novelList.otherList.map((_) => ({ ..._ })),
      ];
    } else if (novelListsOfUser && novelListsOfUser[newListId]) {
      // adding novels in the existing list as clicking show-more button
      const currentOrder = novelListsOfUser[newListId].currentOrder + 1;

      // in this case variable "new list id" is the same as previous one.

      setNovelListsOfUser({
        ...novelListsOfUser,
        [newListId]: {
          novelList: {
            ...novelList,
            novel: [...novelListsOfUser[newListId].novelList.novel, ...novelList.novel],
          },
          isNextOrder,
          currentOrder,
        },
      });
      // set current novel list info
      currentListInfoRef.current = {
        listId,
        isNextOrder,
        currentOrder,
      };
    }
  }, [othersListResult.data]);
  //
  // I will remove this later //
  // save "isLike" after toggling like
  useEffect(() => {
    if (toggleLikeResult.isLoading) return;

    if (!toggleLikeResult.data) return;

    if (!novelListsOfUser) return;

    if (!listId) return;

    const { isLike } = toggleLikeResult.data;

    // don't display novel list again where LIKE was canceled                          //
    // when login user canceled LIKE in other's list page of his/her user page         //
    //                                          that displays novel list he/she likes  //
    if (!isLike && !isMyList && userName === loginUserInfo.userName) {
      const listIDsSaved = Object.keys(novelListsOfUser);
      const allListsInDB = novelListTitlesRef.current;

      // if there is other saved list in "novelListsOfUser"
      if (listIDsSaved.length > 1) {
        let nextListId = "";
        for (const listIdSaved of listIDsSaved) {
          if (listIdSaved !== listId) {
            nextListId = listIdSaved;
            break;
          }
        }
        // delete the list where isLike variable was set to false
        setNovelListsOfUser((prevNovelListsOfUser) => {
          const copyOfNovelListsOfUser = {
            ...prevNovelListsOfUser,
          };
          // delete current list
          delete copyOfNovelListsOfUser[listId];

          return copyOfNovelListsOfUser;
        });

        // delete current list from titles
        novelListTitlesRef.current = novelListTitlesRef.current.filter((_) => _.listId !== listId);

        navigate(`/user-page/${userName}/others-list/${nextListId}`, { replace: true });
      }

      // if there is no other saved list in "novelListsOfUser" but is in DB
      if (listIDsSaved.length === 1 && allListsInDB.length > 1) {
        // to get next list from server
        let nextListId;
        for (const list of allListsInDB) {
          if (list.listId !== listId) {
            nextListId = list.listId;
            break;
          }
        }
        if (!nextListId) {
          alert("리스트가 더이상 존재하지 않습니다.");
          navigate(`/user-page/${userName}`, { replace: true });
          return;
        }

        // delete the list where isLike variable was set to false after saving next list
        isNeedToDeleteListRef.current = true;

        // request new novel list
        setParamsForRequest({
          ...paramsForRequest,
          listId: nextListId,
          order: 1,
        });
      }

      // if there is no other saved list in "novelListsOfUser" and also not in DB
      // go to the user's home page
      if (listIDsSaved.length === 1 && allListsInDB.length === 1) {
        alert("리스트가 더이상 존재하지 않습니다.");
        navigate(`/user-page/${userName}`, { replace: true });
      }
    }
    //
    //  set LIKE as being changed ----------------------------------------------------- //
    else {
    }
  }, [toggleLikeResult.data, toggleLikeResult.isLoading]);
  // get the content page mark
  const contentPageMark = contentMark(userName as string, loginUserInfo.userName, isMyList, false);

  // - list more button : show or not all the list title
  const [isListMore, setListMore] = useState(false);

  // - calculate the size of the title list container -------------------------   //
  // if the list title container is over than title list width, show the MoreBtn. //
  // - get shown width of title container
  const containerWidthRef = useRef<HTMLDivElement>(null);
  const containerWidth = useComponentWidth(containerWidthRef, isListMore);
  const limitContnrWidth = containerWidth - 35; // shown width
  // - get scrollable width including overflowed hidden space
  const titleListRef = useRef<HTMLDivElement>(null);
  const titleListWidthScrollable = useComponentScrollWidth(titleListRef, isListMore);
  // ---------------------------------------------------------------------------------- //

  // - get title list height to show or not more button when isListMore is true ----------  //
  // - if titleListHeight is not longer than the height 32px that is 1 line of ListTitleContnr,
  // - then don't show the button even if isListMore is true
  const titleListHeight = useComponentHeight(titleListRef, isListMore);
  // when list id is undefined the page will be navigated in useEffect
  if (!listId || !novelListsOfUser) return <></>;
  return (
    <MainBG>
      {(myListResult.isFetching || othersListResult.isFetching || toggleLikeResult.isLoading) && (
        <Spinner styles="fixed" />
      )}
      <CategoryMark categoryText={contentPageMark}>
        <ShareIconBox>
          <Icon.SharePC />
        </ShareIconBox>
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
              isLike={novelListsOfUser[listId].novelList.isLike}
              size={28}
              onClick={async () => {
                const { isLike, userName: userNameAtTitle } = novelListsOfUser[listId].novelList;

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
                  // when login user who isn't the owner of user page tries to set isLike to false
                  if (
                    confirm(
                      "좋아요를 취소하면 내 유저페이지의 리스트에서 지워집니다. 취소하시겠어요?",
                    )
                  ) {
                    await toggleLikeRequest();
                  }
                } else if (userNameAtTitle === loginUserInfo.userName) {
                  // when login user who is the owner of user page tries to set isLike to false
                  if (confirm("좋아요를 취소하면 리스트에서 지워집니다. 취소하시겠어요?")) {
                    await toggleLikeRequest();
                    isLikeUpdatedRef.current = true;
                    // to refetch though list is the same as current one
                    // it can be done because of "invalidatesTags" in api slice
                    setParamsForRequest({
                      ...paramsForRequest,
                      listId,
                      order: currentListInfoRef.current.currentOrder,
                    });
                  }
                }
              }}
            >
              <Icon.TogglingBigHeartIcon isLike={novelListsOfUser[listId].novelList.isLike} />
            </HearIconBox>
          )}

          {/* title of selected novel list */}
          <ListTitle key={listId} listId={listId} selectedListId={listId}>
            {/* in my list page */}
            {isMyList && novelListsOfUser[listId].novelList.listTitle}
            {/* in other's list page */}
            {!isMyList && (
              <OthersTitleContnr>
                <UserImg
                  userImg={novelListsOfUser[listId].novelList.userImg as ProfileImg}
                  isTitle
                />
                {novelListsOfUser[listId].novelList.userName}
                <ListTitleNormalStyle>의 리스트 : </ListTitleNormalStyle>
                &nbsp;
                {novelListsOfUser[listId].novelList.listTitle}
              </OthersTitleContnr>
            )}
          </ListTitle>

          {/* titles of novel lists except selected one */}
          {novelListTitlesRef.current.map((_) => {
            if (_.listId === listId) return <></>; // except selected list
            return (
              <ListTitle
                key={_.listId}
                listId={_.listId}
                selectedListId={listId}
                onClick={() => {
                  // get new list from server
                  if (!novelListsOfUser[_.listId]) {
                    setParamsForRequest({
                      ...paramsForRequest,
                      listId: _.listId,
                      order: 1,
                    });
                  }
                  // show other list that is not displayed in this time but already exists
                  if (novelListsOfUser[_.listId]) {
                    const { isNextOrder, currentOrder } = novelListsOfUser[_.listId];
                    // set current novel list info
                    currentListInfoRef.current = {
                      listId: _.listId,
                      isNextOrder,
                      currentOrder,
                    };

                    navigate(
                      `/user-page/${userName as string}/${isMyList ? `my-list` : `others-list`}/${
                        _.listId
                      }`,
                    );
                  }
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
            );
          })}
        </ListTitleContnr>
      </ListTitleLimitHeightContnr>

      <NovelListContnr>
        {novelListsOfUser &&
          novelListsOfUser[listId].novelList.novel.map((_) => (
            <NovelRow key={_.novelId} novel={_} isWidth100 isNotSubInfo />
          ))}
      </NovelListContnr>

      {currentListInfoRef.current.isNextOrder && (
        <NextContentsBtn
          onClick={() => {
            setParamsForRequest({
              ...paramsForRequest,
              listId: currentListInfoRef.current.listId,
              order: currentListInfoRef.current.currentOrder + 1,
            });
          }}
        >
          <Icon.IconBox noPointer>
            <Icon.SmallDown />
          </Icon.IconBox>
          더보기
        </NextContentsBtn>
      )}
    </MainBG>
  );
});
export default UserPageNovelList;
