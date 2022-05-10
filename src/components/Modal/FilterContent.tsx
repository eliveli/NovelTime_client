import { closeModal, filterContent } from "store/clientSlices/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import { MobileBG, SortBox, SortText, ClosingSpace } from "./Modal.styles";

export default function FilterContent() {
  const dispatch = useAppDispatch();

  // get selected category text to mark in the list
  const filteringContent = useAppSelector((state) => state.modal.filteringContent);

  return (
    <MobileBG>
      <SortBox>
        {["Novel", "FreeTalk", "Recommend"].map((_) => (
          <SortText
            key={_}
            selectedCategory={filteringContent}
            category={_}
            onClick={() => {
              dispatch(filterContent(_));
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
