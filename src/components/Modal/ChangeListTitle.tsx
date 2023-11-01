import { useRef } from "react";
import {
  closeModal,
  handleAlert,
  openFirstModal,
  openSecondModal,
} from "store/clientSlices/modalSlice";
import { handleUserNovelListToEdit } from "store/clientSlices/userNovelListSlice";
import { useChangeMyListTitleMutation } from "store/serverAPIs/novelTime";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  ModalTitle,
  ContentContnr,
  TranslucentBG,
  ButtonForAnswer,
  ButtonContainerForAnswer,
  ListTitleInput,
  ListTitleInputContainer,
  BoxForPadding,
  ModalBox,
} from "./Modal.styles";

export default function ChangeListTitle({ isSecond }: { isSecond?: true }) {
  const { userName } = useParams();

  const [changeListTitle, changeListTitleResult] = useChangeMyListTitleMutation();

  const dispatch = useAppDispatch();

  const { listId, listTitle } = useAppSelector((state) => state.userNovelList.userNovelListToEdit);

  const titleRef = useRef<HTMLInputElement>(null);

  const closeAndInitialize = () => {
    dispatch(closeModal({ isSecond }));

    dispatch(
      handleUserNovelListToEdit({
        listId: "",
        listTitle: "",
      }),
    );
  };
  const handleToEdit = async () => {
    if (!titleRef.current?.value) return;

    if (changeListTitleResult.isLoading) return;

    if (titleRef.current.value.length > 100) {
      dispatch(openSecondModal("alert"));
      dispatch(handleAlert({ text: "제목은 100자까지 가능합니다" }));
      return;
    }

    await changeListTitle({
      listId,
      listTitle: titleRef.current.value,
      userName: userName as string,
    });

    // update list automatically with the invalidate and provide tags

    if (changeListTitleResult.isError) {
      dispatch(openFirstModal("alert"));
      dispatch(
        handleAlert({ text: `리스트 제목을 수정할 수 없습니다.\n새로고침 후 다시 시도해 보세요` }),
      );
      return;
    }

    closeAndInitialize();
  };
  const handleToCancel = () => {
    closeAndInitialize();
  };

  return (
    <TranslucentBG onClick={closeAndInitialize}>
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
            <ListTitleInput
              placeholder="제목을 입력하세요"
              ref={titleRef}
              defaultValue={listTitle}
            />
          </ListTitleInputContainer>
        </BoxForPadding>
        <ButtonContainerForAnswer>
          <ButtonForAnswer onClick={handleToEdit}>수정</ButtonForAnswer>
          <ButtonForAnswer onClick={handleToCancel}>취소</ButtonForAnswer>
        </ButtonContainerForAnswer>
      </ModalBox>
    </TranslucentBG>
  );
}
