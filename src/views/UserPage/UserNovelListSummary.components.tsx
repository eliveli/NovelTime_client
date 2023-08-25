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

    const { userName: userNameInParam } = useParams();
    const navigate = useNavigate();

    const dispatch = useAppDispatch();

    const loginUserName = useAppSelector((state) => state.user.loginUserInfo.userName);
    const isWriter = loginUserName && loginUserName === userName;

    const handleToEdit = () => {
      dispatch(
        handleUserNovelListToEdit({
          listId,
          listTitle,
        }),
      );

      dispatch(openModal("editListTitle"));
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
