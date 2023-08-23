import { closeModal, handleAlert } from "store/clientSlices/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  TranslucentBG,
  ButtonForAnswer,
  ButtonContainerForAnswer,
  TextForAlertOrConfirm,
  ModalBox,
  BoxForPadding,
} from "./Modal.styles";

export default function Alert() {
  const TextForAlert = useAppSelector((state) => state.modal.alert);

  const dispatch = useAppDispatch();

  const closeAndInitialize = () => {
    dispatch(closeModal());

    dispatch(handleAlert(""));
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
          <TextForAlertOrConfirm>{TextForAlert}</TextForAlertOrConfirm>
        </BoxForPadding>
        <ButtonContainerForAnswer>
          <ButtonForAnswer isSingleButton onClick={closeAndInitialize}>
            확인
          </ButtonForAnswer>
        </ButtonContainerForAnswer>
      </ModalBox>
    </TranslucentBG>
  );
}
