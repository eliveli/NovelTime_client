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
  const alert = useAppSelector((state) => state.modal.alert);

  const dispatch = useAppDispatch();

  const closeAndInitialize = () => {
    dispatch(closeModal());

    dispatch(handleAlert({ text: "", nextFunction: undefined }));

    if (alert.nextFunction) {
      alert.nextFunction();
    }
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
          <TextForAlertOrConfirm>{alert.text}</TextForAlertOrConfirm>
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
