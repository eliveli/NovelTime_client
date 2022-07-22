/* eslint-disable react/jsx-indent */
import Icon from "assets/Icon";
import { CategoryMark } from "components/CategoryMark";
import MainBG from "components/MainBG";
import { NovelRow } from "components/Novel";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "store/hooks";
import {
  useGetContentsForUserPageMyListQuery,
  useGetContentsForUserPageOthersListQuery,
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
} from "./UserPage.styles";
import contentMark from "./utils/contentMark";
// - server request --------------------------------important---------------------------------------
// 1. when entering this page at first,
//    request with listId, loginUserName, userName, isMyList
//    : note :
//      - received data isLike : it is login user's info
//         - when userName(the owner of this UserPage) is the different from loginUserName,
//                 receive isLike as true or false
//         - when userName is the same as loginUserName
//                 receive isLike as false. in fact, no matter what the value is except type
//                                                        because in this case it will be not used
//      - isMyList is whether the list is userName's list (it is my list)
//                                       or other's list that userName(the page's owner)'s like
//                    send it as true in my list, false in other's list
//      - received data otherList
//         - when isMyList is true, it will be the list that the user compose
//         - when isMyList is false, it will be the list that the user like
//
//      - received two userName : one in global, the other in the element of the otherList array
//                 in my list, get the value of "". in fact no matter what it is except type
//
//
// 2. when clicking the other title,
//    request with listId, isMe, isMyList
//    receive the novel list, and set it in NovelRow component (is it necessary to modify the code?)
//
// 3. when clicking the heart,
//    request with loginUserName, listId
//               after receiving the data, execute toggleLike with isLike
//               (for more detail, go looking at the code below)

interface ProfileImg {
  src: string;
  position: string;
}
interface NovelList {
  novelList: NovelListSetForMyOrOthersList;
  isNextOrder: boolean;
  currentOrder: number;
}

export default function UserPageNovelList({ isMyList }: { isMyList: boolean }) {
  const navigate = useNavigate();

  const { userName, listId } = useParams();
  const loginUserInfo = useAppSelector((state) => state.user.loginUserInfo);

  const [paramsForRequest, setParamsForRequest] = useState({
    userName: userName as string,
    listId: listId as string,
    order: 1,
  });

  const currentListInfoRef = useRef({
    listId: "",
    isNextOrder: false,
    currentOrder: 1,
  });

  // divide these two results
  // don't destructure like this : const { data, isLoading, ... }
  // just get it as variables to avoid getting same name
  const myListResult = useGetContentsForUserPageMyListQuery(paramsForRequest, {
    skip: !userName && !isMyList,
  });
  const othersListResult = useGetContentsForUserPageOthersListQuery(paramsForRequest, {
    skip: !userName && isMyList,
  });

  // state for saving novel lists from server
  // {
  //   [ listId1 ]: { novelList : ... , isNextOrder : ... , currentOrder : ... },
  //   [ listId2 ]: { novelList : ... , isNextOrder : ... , currentOrder : ... }
  // }
  // in my novel list page
  const [listsUserCreated, setListsUserCreated] = useState<{ [x: string]: NovelList }>();
  // in other's novel list page
  const [listsUserLikes, setListsUserLikes] = useState<{ [x: string]: NovelList }>();

  // get and save the novel lists in my novel list page
  useEffect(() => {
    // don't save cached data for other's list
    // it may remain because of rtk query trait
    if (!isMyList) return;

    if (!myListResult.data) return;
    if (!listId) return;

    const { novelList, isNextOrder } = myListResult.data;
    const newListId = novelList.listId;

    // save novel list //
    if (!listsUserCreated || (listsUserCreated && !listsUserCreated[newListId])) {
      // saving at first || adding new novel list

      const currentOrder = 1;

      setListsUserCreated({
        ...listsUserCreated,
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

      // change url to show changed-list-id in it
      // after doing this component is rendered but state in it remains.
      // but request is not occurred. so I requested before changing url.
      navigate(`/user_page/${userName as string}/myList/${newListId}`);
    } else if (listsUserCreated && listsUserCreated[newListId]) {
      // adding novels in the existing list as clicking show-more button
      const currentOrder = listsUserCreated[newListId].currentOrder + 1;

      setListsUserCreated({
        ...listsUserCreated,
        [newListId]: {
          novelList: {
            ...listsUserCreated[newListId].novelList,
            novel: [...listsUserCreated[newListId].novelList.novel, ...novelList.novel],
          },
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
    }
  }, [myListResult.data]);
  // get the content page mark
  const contentPageMark = contentMark(userName as string, loginUserInfo.userName, isMyList, false);

  // maintain previous title list : do not rerender every time getting novel list from server
  // when a user click a title that doesn't exist on server,
  //      show user alarm modal,
  //      and reset the title list that is new from server
  //     --------  I will do this work later    ---------     //
  //
  //        note : I get the title list always when clicking a title,
  //               but I don't use it except for case above.
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

  // - to scroll to first title that is clicked
  const limitContainerRef = useRef<HTMLDivElement>(null);

  if (!listId) {
    alert("리스트가 존재하지 않습니다.");
    navigate(-1);
    return <></>;
  }
  return (
    <MainBG>
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
      <ListTitleLimitHeightContnr
        ref={limitContainerRef}
        limitContnrWidth={limitContnrWidth}
        isListMore={isListMore}
      >
        <ListTitleContnr
          limitContnrWidth={limitContnrWidth}
          isListMore={isListMore}
          ref={titleListRef}
        >
          {userName !== loginUserInfo.userName && (
            <HearIconBox
              isLike={listsUserCreated ? listsUserCreated[listId].novelList.isLike : false}
              size={28}
              onClick={() => {
                // to toggle like-info
                // server request with loginUserName, listId
              }}
            >
              <Icon.BigFillHeart />
            </HearIconBox>
          )}

          {/* selected list title */}
          {listsUserCreated && listsUserCreated[listId] && (
            <ListTitle key={listId} listId={listId} selectedListId={listId}>
              {isMyList ? (
                listsUserCreated[listId].novelList.listTitle
              ) : (
                <OthersTitleContnr>
                  <UserImg
                    userImg={listsUserCreated[listId].novelList.userImg as ProfileImg}
                    isTitle
                  />
                  {listsUserCreated[listId].novelList.userName}
                  <ListTitleNormalStyle>의 리스트 : </ListTitleNormalStyle>
                  &nbsp;
                  {listsUserCreated[listId].novelList.listTitle}
                </OthersTitleContnr>
              )}
            </ListTitle>
          )}
          {/* otherListInfo title list */}
          {listsUserCreated &&
            listsUserCreated[listId].novelList.otherList.map((_) => (
              <ListTitle
                key={_.listId}
                listId={_.listId}
                selectedListId={listId}
                onClick={() => {
                  // get new list from server
                  if (!listsUserCreated[_.listId]) {
                    setParamsForRequest({
                      userName: userName as string,
                      listId: _.listId,
                      order: 1,
                    });
                  }
                  // show other list that already exists
                  if (listsUserCreated[_.listId]) {
                    const { isNextOrder, currentOrder } = listsUserCreated[_.listId];
                    // set current novel list info
                    currentListInfoRef.current = {
                      listId: _.listId,
                      isNextOrder,
                      currentOrder,
                    };

                    navigate(`/user_page/${userName as string}/myList/${_.listId}`);
                  }

                  // server request with list id //

                  // selectList(_);
                  // if the list of title doesn't exist on server,
                  // put this list's info and "otherList" data in novelTitleList.current
                  // and execute "selectList" with first element of novelTitleList.current

                  limitContainerRef.current?.scroll(0, 0);
                  // scroll to (0,0) to show the selected title arranged first in the title container
                }}
              >
                {isMyList ? (
                  _.listTitle
                ) : (
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
        {listsUserCreated &&
          listsUserCreated[listId].novelList.novel.map((_) => (
            <NovelRow key={_.novelId} novel={_} isWidth100 isNotSubInfo />
          ))}
      </NovelListContnr>
    </MainBG>
  );
}
