import { closeModal, handleConfirm } from "store/clientSlices/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  TranslucentBG,
  ButtonForAnswer,
  ButtonContainerForAnswer,
  TextForAlertOrConfirm,
  ModalBox,
  BoxForPadding,
} from "./Modal.styles";

export default function Confirm({ isSecond }: { isSecond?: true }) {
  const dispatch = useAppDispatch();

  const { question, textForYes, textForNo, functionForYes, functionForNo } = useAppSelector(
    (state) => state.modal.confirm,
  );

  const closeAndInitialize = () => {
    dispatch(closeModal({ isSecond }));

    dispatch(
      handleConfirm({
        question: "",
        textForYes: "",
        textForNo: "",
        functionForYes: () => {},
        functionForNo: () => {},
      }),
    );
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
          <TextForAlertOrConfirm>{question}</TextForAlertOrConfirm>
        </BoxForPadding>
        <ButtonContainerForAnswer>
          <ButtonForAnswer
            onClick={() => {
              functionForYes();
              closeAndInitialize();
            }}
          >
            {textForYes}
          </ButtonForAnswer>
          <ButtonForAnswer
            onClick={() => {
              if (functionForNo) {
                functionForNo();
              }
              closeAndInitialize();
            }}
          >
            {textForNo}
          </ButtonForAnswer>
        </ButtonContainerForAnswer>
      </ModalBox>
    </TranslucentBG>
  );
}
