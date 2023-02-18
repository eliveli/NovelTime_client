import { closeModal, SortTypeFromFilter, sortWriting } from "store/clientSlices/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { MobileBG, SortBox, SortText, ClosingSpace } from "./Modal.styles";

export default function SortWriting() {
  const dispatch = useAppDispatch();

  // get selected category text to mark in the list
  const sortType = useAppSelector((state) => state.modal.sortType);

  const sortTypes: SortTypeFromFilter[] = [
    "작성일New",
    "작성일Old",
    "댓글Up",
    "댓글Down",
    "좋아요Up",
    "좋아요Down",
  ];

  return (
    <MobileBG>
      <SortBox>
        {sortTypes.map((_) => (
          <SortText
            key={_}
            selectedCategory={sortType}
            category={_}
            onClick={() => {
              dispatch(sortWriting(_));
              dispatch(closeModal());
            }}
          >
            {_}
          </SortText>
        ))}
      </SortBox>
      <ClosingSpace
        onClick={() => {
          dispatch(closeModal());
        }}
      />
    </MobileBG>
  );
}
