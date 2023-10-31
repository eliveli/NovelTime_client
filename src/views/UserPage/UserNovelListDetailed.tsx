import Icon from "assets/Icon";
import Spinner from "assets/Spinner";
import { CategoryMark } from "components/CategoryMark";
import MainBG from "components/MainBG";
import { NovelRow } from "components/Novel";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  handleAlert,
  handleConfirm,
  logoImg,
  openFirstModal,
  setMetaTags,
} from "store/clientSlices/modalSlice";
import {
  useGetListDetailedQuery,
  useGetAllListTitlesQuery,
  useRemoveNovelFromListMutation,
  useToggleLikeMutation,
} from "store/serverAPIs/novelTime";
import { Img, SimpleNovel } from "store/serverAPIs/types";
import { useComponentScrollWidth, useCheckWindowWidth, useComponentWidth } from "utils";
import MetaTag from "utils/MetaTag";
import ShowMoreContent from "assets/ShowMoreContent";
import {
  ListTitlesContnr,
  ListTitles,
  ListTitle,
  ListTitleNormalStyle,
  NovelListContnr,
  SpreadingBtnBox,
  SpreadingBtnSpace,
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

interface NovelListTitle {
  listId: string;
  listTitle: string;
  userName?: string;
  userImg?: Img;
}

export default function UserNovelListDetailed({ isCreated }: { isCreated: boolean }) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginUser = useAppSelector((state) => state.loginUser.user);

  // Handle list detailed ---------------------------------------------------------------------

  // When the login user refreshes page, request is fired twice
  //  as the user logins automatically and gets new token and request with it again.
  // And the user gets correct LIKE that depends on login user from the second request
  const { userName, listId } = useParams();

  const [orderNumber, setOrderNumber] = useState(1);

  const accessToken = useAppSelector((state) => state.loginUser.accessToken);

  const listDetailedResult = useGetListDetailedQuery({
    accessToken, // to request again with this change when login user refreshes page
    userName: userName as string,
    listId: listId as string,
    order: orderNumber,
    isCreated, // isCreated or isLiked
  });

  const novelsAsCurrentOrder = listDetailedResult.data?.novelList.novel;
  const novelsAsPreviousOrder = useRef<SimpleNovel[]>();
  const novels =
    orderNumber > 1 && novelsAsPreviousOrder.current && novelsAsCurrentOrder
      ? [...novelsAsPreviousOrder.current, ...novelsAsCurrentOrder]
      : novelsAsCurrentOrder;

  useEffect(() => {
    if (!listDetailedResult.data) return;

    // when list id is undefined or there is no list that matches list id
    if (!listId || !listDetailedResult.data?.novelList?.novel) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "리스트가 존재하지 않습니다." }));
      navigate(`/user-page/${userName as string}`, { replace: true });
    }
  }, [listDetailedResult.data]);

  // Handle Titles ----------------------------------------------------------------------------
  const { data: allTitles } = useGetAllListTitlesQuery({
    userName: userName as string,
    isCreated: isCreated.toString(),
  });

  const novelListTitlesExceptSelectedOne = allTitles?.filter(
    (_) => _.listId !== listId,
  ) as NovelListTitle[]; // each one of titles have simple data including the title

  // Spread/Fold titles with up/down button
  const [isTitlesSpread, handleToSpreadTitles] = useState(false);

  const isInTheWindowWidth = useCheckWindowWidth(600);
  // - not to display up/down button when the window width is more than 600

  // Display the up/down button in both cases //
  //  . window width is more than 600px : false in isInTheWindowWidth
  //   &
  //  . titles overflowed in the container : true in isTitlesScrollable

  // Display or not the up/down button
  const [isTitlesScrollable, handleTitlesScrollable] = useState(false);

  const titleContnrRef = useRef<HTMLDivElement>(null);
  const titleContnrWidth = useComponentWidth(titleContnrRef, isTitlesSpread);
  const titleContnrWidthScrollable = useComponentScrollWidth(titleContnrRef, isTitlesSpread);

  useEffect(() => {
    if (!titleContnrWidthScrollable) return;

    if (isInTheWindowWidth) {
      handleTitlesScrollable(false); // Don't display the button in the window width
      handleToSpreadTitles(false); // Fold titles if user reduces window to this width
      return;
    }

    // If titles overflowed in the container,
    //  Use up/down button to spreading/folding titles
    if (titleContnrWidth < titleContnrWidthScrollable) {
      handleTitlesScrollable(true);
      // - limit width in <ListTitlesContnr> in order not to include the space for spreading button
    }
  }, [titleContnrWidthScrollable, titleContnrWidth, isInTheWindowWidth]);
  //
  // Select and Remove novels from the list ----------------------------------------------
  //  Only for login user's list that he/she created
  const [removeNovels, removeNovelsResult] = useRemoveNovelFromListMutation();

  const [isRemovingNovels, handleRemovingNovels] = useState(false);

  const isLoginUsersList = loginUser.userName && loginUser.userName === userName && isCreated;

  // novels to be removed
  const [novelsSelected, setNovelsSelected] = useState<string[]>([]);

  const finishOrCancelRemoving = () => {
    handleRemovingNovels(false);
    setNovelsSelected([]);
  };

  const handleToRemoveNovelFromList = async () => {
    if (removeNovelsResult.isLoading) return;

    if (!novelsSelected.length) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: `제외할 소설을 선택하세요` }));
      return;
    }

    await removeNovels({
      listId: listId as string,
      novelIDs: novelsSelected,
      userName: userName as string,
    });

    if (removeNovelsResult.isError) {
      dispatch(openFirstModal("alert"));
      dispatch(
        handleAlert({ text: `리스트를 삭제할 수 없습니다.\n새로고침 후 다시 시도해 보세요` }),
      );
    }

    finishOrCancelRemoving();
  };

  // Cancel removing novels from the list if user opens the modal to edit profile
  const firstModalCategory = useAppSelector((state) => state.modal.firstModalCategory);

  useEffect(() => {
    if (firstModalCategory !== "editProfile") return;

    finishOrCancelRemoving();
  }, [firstModalCategory]);

  // Handle toggling LIKE -----------------------------------------------------------------
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
      // Don't allow the non login user set LIKE
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "좋아요를 누르려면 로그인을 해 주세요." }));
      //
    } else if (loginUser.userName === userNameAtTitle) {
      // Don't allow the login user to set LIKE on the list he/she created
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "내가 만든 리스트에는 좋아요를 누를 수 없어요." }));
      //
    } else if (!isLike) {
      await toggleLikeRequest();
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "내 좋아요 리스트에 추가되었습니다." }));
      //
    } else if (userNameAtTitle !== loginUser.userName) {
      // alert when login user tries to cancel LIKE in other user's page
      dispatch(
        handleConfirm({
          question: `좋아요를 취소하면 내 유저페이지의 리스트에서 지워집니다.\n취소하시겠어요?`,
          textForYes: "예",
          textForNo: "아니오",
          functionForYes: toggleLikeRequest,
        }),
      );

      dispatch(openFirstModal("confirm"));
      //
    } else if (userNameAtTitle === loginUser.userName) {
      // alert when login user tries to cancel LIKE in his/her user page
      dispatch(
        handleConfirm({
          question: `좋아요를 취소하면 리스트에서 지워집니다.\n취소하시겠어요?`,
          textForYes: "예",
          textForNo: "아니오",
          functionForYes: toggleLikeRequest,
        }),
      );

      dispatch(openFirstModal("confirm"));
    }
  };

  // Set meta tags //
  const userImg = useAppSelector((state) => state.userProfile.user.userImg);

  const metaTags = () => {
    const text = isCreated ? "만든" : "좋아하는";
    const title = userName ? `${userName}님이 ${text} 리스트` : "";

    return {
      title,
      description: `${listDetailedResult.data?.novelList.listTitle || ""}`,
      image: userImg.src || logoImg,
      url: window.location.href,
    };
  };

  //
  const contentPageMark = contentMark(userName as string, loginUser.userName, isCreated, false);

  useEffect(() => {
    if (!listDetailedResult.data) return;

    dispatch(setMetaTags(metaTags()));
  }, [listDetailedResult.data]);

  // Darken user content while editing userBG
  const isEditingBG = !!useAppSelector((state) => state.userProfile.temporaryUserBG.src);

  if (isRemovingNovels) {
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
            <ButtonToEdit onClick={finishOrCancelRemoving}>취소</ButtonToEdit>
          </ButtonToEditContainer>
        </CategoryMark>

        {/* title list container */}
        <ListTitlesContnr
          isTitlesScrollable={isTitlesScrollable}
          isTitlesSpread={isTitlesSpread}
          ref={titleContnrRef}
        >
          <ListTitles isTitlesSpread={isTitlesSpread}>
            <ListTitle>{listDetailedResult.data?.novelList.listTitle}</ListTitle>
          </ListTitles>
        </ListTitlesContnr>

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

  // list detailed the user created
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
              <ButtonToEdit isNoBorder onClick={() => handleRemovingNovels(true)}>
                편집
              </ButtonToEdit>
            </ButtonToEditContainer>
          )}
        </CategoryMark>

        {isTitlesScrollable && (
          <SpreadingBtnSpace>
            <SpreadingBtnBox
              size={28}
              onClick={() => {
                handleToSpreadTitles((prev) => !prev);
              }}
            >
              {isTitlesSpread && <Icon.SmallUp />}
              {!isTitlesSpread && <Icon.SmallDown />}
            </SpreadingBtnBox>
          </SpreadingBtnSpace>
        )}

        {/* title list container */}
        {allTitles && (
          <ListTitlesContnr
            isTitlesScrollable={isTitlesScrollable}
            isTitlesSpread={isTitlesSpread}
            ref={titleContnrRef}
          >
            <ListTitles isTitlesSpread={isTitlesSpread}>
              {/* except when login user sees my list in his/her user page */}
              {userName !== loginUser.userName && !!listDetailedResult.data && (
                <HearIconBox
                  isLike={listDetailedResult.data.novelList.isLike}
                  size={28}
                  onClick={handleLike}
                >
                  <Icon.TogglingBigHeartIcon
                    isLike={listDetailedResult.data.novelList.isLike}
                    isEditingBG={isEditingBG}
                  />
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
                      setOrderNumber(1); // reset 1 to order
                      novelsAsPreviousOrder.current = []; // reset previous novels
                    }}
                  >
                    {_.listTitle}
                  </ListTitle>
                ))}
            </ListTitles>
          </ListTitlesContnr>
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

  // list detailed the user likes
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

      {isTitlesScrollable && (
        <SpreadingBtnSpace>
          <SpreadingBtnBox
            size={28}
            onClick={() => {
              handleToSpreadTitles((prev) => !prev);
            }}
          >
            {isTitlesSpread && <Icon.SmallUp />}
            {!isTitlesSpread && <Icon.SmallDown />}
          </SpreadingBtnBox>
        </SpreadingBtnSpace>
      )}

      {/* title list container */}
      {allTitles && (
        <ListTitlesContnr
          isTitlesScrollable={isTitlesScrollable}
          isTitlesSpread={isTitlesSpread}
          ref={titleContnrRef}
        >
          <ListTitles isTitlesSpread={isTitlesSpread}>
            {/* isLike */}
            {!!listDetailedResult.data && (
              <HearIconBox
                isLike={listDetailedResult.data.novelList.isLike}
                size={28}
                onClick={handleLike}
              >
                <Icon.TogglingBigHeartIcon
                  isLike={listDetailedResult.data.novelList.isLike}
                  isEditingBG={isEditingBG}
                />
              </HearIconBox>
            )}

            {/* title of selected novel list */}
            {listDetailedResult.data && (
              <ListTitle key={listId} listId={listId} selectedListId={listId}>
                <OthersTitleContnr>
                  <UserImg userImg={listDetailedResult.data.novelList.userImg as Img} isTitle />
                  {listDetailedResult.data.novelList.userName}
                  <ListTitleNormalStyle>의 리스트 : </ListTitleNormalStyle>
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
                    setOrderNumber(1); // initialize
                    novelsAsPreviousOrder.current = []; // initialize previous novels
                  }}
                >
                  <OthersTitleContnr>
                    <UserImg userImg={_.userImg as Img} isTitle />
                    {_.userName}
                    <ListTitleNormalStyle>의 리스트 : </ListTitleNormalStyle>
                    {_.listTitle}
                  </OthersTitleContnr>
                </ListTitle>
              ))}
          </ListTitles>
        </ListTitlesContnr>
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
