import { closeModal, SortTypeFromFilter } from "store/clientSlices/modalSlice";
import { useMultipleSearchFilters } from "utils";
import { useAppDispatch } from "../../store/hooks";

import { MobileBG, SortBox, SortText, ClosingSpace } from "./Modal.styles";

export default function SortWriting() {
  const dispatch = useAppDispatch();

  const {
    currentFilters: { currentSortType },
    setFilters,
  } = useMultipleSearchFilters("sortType");

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
            selectedCategory={currentSortType}
            category={_}
            onClick={() => {
              if (currentSortType !== _) {
                // 직전과 필터가 다를 때 페이지넘버 1
                setFilters({ sortType: _, pageNo: 1 });
              } else {
                setFilters({ sortType: _ });
              }

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
