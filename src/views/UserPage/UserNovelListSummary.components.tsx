import Icon from "assets/Icon";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Img, ListSummary } from "store/serverAPIs/types";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { EditAndDelete } from "components/Writing";
import { handleConfirm, openModal } from "store/clientSlices/modalSlice";
import { handleUserNovelListToEdit } from "store/clientSlices/userNovelListSlice";
import { useDeleteMyNovelListMutation } from "store/serverAPIs/novelTime";
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

    const [deleteList, deleteListResult] = useDeleteMyNovelListMutation();

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
      if (deleteListResult.isLoading) return;

      await deleteList({ listId, userName: userNameInParam as string });

      if (deleteListResult.isError) {
        alert("리스트를 삭제할 수 없습니다. 새로고침 후 다시 시도해 보세요");
      }
    }
    async function handleToDeleteInModal() {
      dispatch(
        handleConfirm({
          question: "리스트를 삭제하시겠습니까?",
          textForYes: "삭제",
          textForNo: "취소",
          functionForYes: handleToDelete,
          functionForNo: () => {},
        }),
      );

      dispatch(openModal("confirm"));
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
              clickToDelete={async () => handleToDeleteInModal()}
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
