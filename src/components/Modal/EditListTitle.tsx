import { useState, useRef } from "react";
import { closeModal } from "store/clientSlices/modalSlice";
import { handleUserNovelListToEdit } from "store/clientSlices/userNovelListSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  ModalTitle,
  ContentContnr,
  TranslucentBG,
  ButtonForEditing,
  ButtonContainerForEditing,
  ListTitleInput,
  ListTitleInputContainer,
  BoxForPadding,
  ModalBox,
} from "./Modal.styles";

export default function EditListTitle() {
  const dispatch = useAppDispatch();

  const { listId, listTitle } = useAppSelector((state) => state.userNovelList.userNovelListToEdit);

  const titleRef = useRef<HTMLInputElement>(null);

  const closeAndInitialize = () => {
    dispatch(closeModal());

    dispatch(
      handleUserNovelListToEdit({
        listId: "",
        listTitle: "",
      }),
    );
  };
  const handleToEdit = () => {
    if (!titleRef.current?.value) return; // when title is empty

    // if (editUserNovelListTitleResult.isLoading) return;

    // await editUserNovelListTitle({
    //   listId,
    //   listTitle
    // });

    // and update userNovelListTitle automatically with the invalidate and provide tags

    // if (editUserNovelListTitleResult.isError) {
    //   alert("리스트 제목을 수정할 수 없습니다. 새로고침 후 다시 시도해 보세요");
    //   return;
    // }

    closeAndInitialize();
  };
  const handleToCancel = () => {
    closeAndInitialize();
  };

  return (
    <TranslucentBG onClick={() => dispatch(closeModal())}>
      <ModalBox
        padding="0"
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();
        }}
      >
        <BoxForPadding>
          <ContentContnr>
            <ModalTitle>리스트 제목 수정</ModalTitle>
          </ContentContnr>

          <ListTitleInputContainer>
            <ListTitleInput ref={titleRef} defaultValue={listTitle} />
          </ListTitleInputContainer>
        </BoxForPadding>
        <ButtonContainerForEditing>
          <ButtonForEditing onClick={handleToEdit}>수정</ButtonForEditing>
          <ButtonForEditing onClick={handleToCancel}>취소</ButtonForEditing>
        </ButtonContainerForEditing>
      </ModalBox>
    </TranslucentBG>
  );
}
