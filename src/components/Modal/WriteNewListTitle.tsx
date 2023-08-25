import { useRef } from "react";
import { openModal } from "store/clientSlices/modalSlice";
import { useCreateMyNovelListMutation } from "store/serverAPIs/novelTime";
import { useAppDispatch } from "../../store/hooks";

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

export default function WriteNewListTitle() {
  const dispatch = useAppDispatch();

  const titleRef = useRef<HTMLInputElement>(null);

  const [createList, createListResult] = useCreateMyNovelListMutation();

  const openPrevModal = () => {
    dispatch(openModal("addToMyNovelList"));
  };

  const handleToCreateList = async () => {
    if (!titleRef.current?.value) {
      alert("리스트 제목을 입력해 주세요");
      return;
    }

    if (createListResult.isLoading) return;

    await createList(titleRef.current.value);

    // my novel lists updated automatically with provide and invalidate tags

    if (createListResult.isError) {
      alert("리스트를 생성할 수 없습니다. 새로고침 후 시도해보세요");
    }

    openPrevModal();
  };

  return (
    <TranslucentBG onClick={openPrevModal}>
      <ModalBox
        padding="0"
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();
        }}
      >
        <BoxForPadding>
          <ContentContnr>
            <ModalTitle>새 리스트 만들기</ModalTitle>
          </ContentContnr>

          <ListTitleInputContainer>
            <ListTitleInput placeholder="제목을 입력하세요" ref={titleRef} />
          </ListTitleInputContainer>
        </BoxForPadding>
        <ButtonContainerForAnswer>
          <ButtonForAnswer onClick={handleToCreateList}>추가</ButtonForAnswer>
          <ButtonForAnswer onClick={openPrevModal}>취소</ButtonForAnswer>
        </ButtonContainerForAnswer>
      </ModalBox>
    </TranslucentBG>
  );
}
