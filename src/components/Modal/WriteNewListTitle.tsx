import { useRef } from "react";
import { handleAlert, openFirstModal, openSecondModal } from "store/clientSlices/modalSlice";
import { useCreateMyNovelListMutation } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { useParams } from "react-router-dom";
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

export default function WriteNewListTitle({ isSecond }: { isSecond?: true }) {
  const dispatch = useAppDispatch();

  const { userName } = useParams();

  const titleRef = useRef<HTMLInputElement>(null);

  const [createList, createListResult] = useCreateMyNovelListMutation();

  const openPrevModal = () => {
    dispatch(openFirstModal("addToMyNovelList"));
  };

  const handleToCreateList = async () => {
    if (!titleRef.current?.value) {
      dispatch(openSecondModal("alert"));
      dispatch(handleAlert({ text: "리스트 제목을 입력해 주세요" }));
      return;
    }

    if (createListResult.isLoading) return;

    if (titleRef.current.value.length > 100) {
      dispatch(openSecondModal("alert"));
      dispatch(handleAlert({ text: "제목은 100자까지 가능합니다" }));
      return;
    }

    await createList({ listTitle: titleRef.current.value, userName: userName as string });

    // my novel lists updated automatically with provide and invalidate tags

    if (createListResult.isError) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: `리스트를 생성할 수 없습니다.\n새로고침 후 시도해보세요` }));
      return;
    }

    openPrevModal();
  };

  return (
    <TranslucentBG onClick={openPrevModal}>
      {createListResult.isLoading && <Spinner styles="fixed" />}

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
