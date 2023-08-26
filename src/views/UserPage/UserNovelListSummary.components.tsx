import Icon from "assets/Icon";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Img, ListSummary } from "store/serverAPIs/types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { EditAndDelete } from "components/Writing";
import { handleConfirm, openModal } from "store/clientSlices/modalSlice";
import { handleUserNovelListToEdit } from "store/clientSlices/userNovelListSlice";
import {
  HeartIcon,
  IconInfoContnr,
  IconNoInfo,
  NovelTitle,
  WritingUserName,
  NovelImgContainer,
  NovelImgForListAll,
  UserImgForListAll,
  UserImgContainerForListAll,
  ListInfoSubContainer,
  ListInfoContnr,
  EditAndDeleteContainer,
  IconsContnrForListAll,
} from "./UserPage.styles";

const UserNovelList = React.memo(
  ({ novelList, isMyList }: { novelList: ListSummary; isMyList: boolean }) => {
    const {
      listId,
      listTitle,

      novelNo,
      novelImgs,
      likeNo,

      userName,
      userImg,
    } = novelList;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const { userName: userNameInParam } = useParams();

    const loginUserName = useAppSelector((state) => state.user.loginUserInfo.userName);
    const isWriter = loginUserName && loginUserName === userNameInParam && isMyList;

    const handleToEdit = () => {
      dispatch(
        handleUserNovelListToEdit({
          listId,
          listTitle,
        }),
      );

      dispatch(openModal("changeListTitle"));
    };
    async function handleToDelete() {
      dispatch(
        handleConfirm({
          question: "리스트를 삭제하시겠습니까?",
          textForYes: "삭제",
          textForNo: "취소",
          functionForYes: () => {}, // * 뮤테이션 함수 보낼 수 있는지 확인 필요
          functionForNo: () => {},
        }),
      );

      dispatch(openModal("confirm"));

      // if (!talk.data) return;
      // // * ask whether you really want to delete the comment
      // // * change this after making the modal
      // if (deleteWritingResult.isLoading) return; // prevent click while loading for prev request
      // await deleteWriting({
      //   writingId: talk.data.talk.talkId,
      //   writingType: "T",
      //   novelId: talk.data.novel.novelId,
      // });
      // if (deleteWritingResult.isError) {
      //   alert("글을 삭제할 수 없습니다. 새로고침 후 다시 시도해 보세요");
      // }
      // // back to the novel-detail page
      // const { search } = window.location;
      // if (search === "?is-from-novel-detail=true") {
      //   navigate(`${NOVEL_DETAIL}/${talk.data.novel.novelId}`, { replace: true });
      //   return;
      // }
      // // back to the talk list page
      // if (isDesktop) {
      //   navigate(`${TALK_LIST}?genre=All&searchType=no&searchWord=&sortType=작성일New&pageNo=1`, {
      //     replace: true,
      //   });
      //   return;
      // }
      // // on mobile
      // dispatch(
      //   setSearchList({
      //     listType: "talk",
      //     list: "reset",
      //   }),
      // );
      // navigate(TALK_LIST, { replace: true });
    }

    return (
      <ListInfoContnr
        onClick={() => {
          navigate(
            `/user-page/${userName || (userNameInParam as string)}/${
              isMyList ? `my-list` : `others-list`
            }/${listId}`,
          );
        }}
      >
        {isWriter && (
          <EditAndDeleteContainer
            onClick={(event: React.MouseEvent<HTMLElement>) => event.stopPropagation()}
          >
            <EditAndDelete
              buttonStyles="font-weight: 600;"
              clickToEdit={handleToEdit}
              clickToDelete={async () => handleToDelete()}
            />
          </EditAndDeleteContainer>
        )}

        <ListInfoSubContainer>
          <NovelTitle>{listTitle}</NovelTitle>
          {userName && (
            <UserImgContainerForListAll>
              <UserImgForListAll userImg={userImg as Img} />
              <WritingUserName>{userName}</WritingUserName>
            </UserImgContainerForListAll>
          )}
          <IconsContnrForListAll>
            <IconInfoContnr>
              <Icon.IconBox size={15}>
                <HeartIcon />
              </Icon.IconBox>
              <IconNoInfo>{likeNo}</IconNoInfo>
            </IconInfoContnr>
            <IconInfoContnr>
              <Icon.IconBox size={15}>
                <HeartIcon />
              </Icon.IconBox>
              <IconNoInfo>{novelNo}</IconNoInfo>
            </IconInfoContnr>
          </IconsContnrForListAll>
        </ListInfoSubContainer>
        <NovelImgContainer>
          <NovelImgForListAll idx={1} novelImg={novelImgs[0]} />
          <NovelImgForListAll idx={2} novelImg={novelImgs[1]} />
          <NovelImgForListAll idx={3} novelImg={novelImgs[2]} />
        </NovelImgContainer>
      </ListInfoContnr>
    );
  },
);

export default UserNovelList;
