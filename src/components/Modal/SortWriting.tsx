import { setSortTypes } from "store/clientSlices/filterSlice";
import { closeModal } from "store/clientSlices/modalSlice";
import { useMultipleSearchFilters } from "utils/useSearchFilterForWriting";

import { useAppDispatch } from "../../store/hooks";

import { MobileBG, SortBox, SortText, ClosingSpace } from "./Modal.styles";

export default function SortWriting({ isSecond }: { isSecond?: true }) {
  const dispatch = useAppDispatch();

  const {
    currentFilters: { currentSortType },
    setFilters,
  } = useMultipleSearchFilters();

  const sortTypes = setSortTypes();

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
                setFilters({ sortType: _, pageNo: 1 });
              } else {
                setFilters({ sortType: _ });
              }

              dispatch(closeModal({ isSecond }));
            }}
          >
            {_}
          </SortText>
        ))}
      </SortBox>
      <ClosingSpace onClick={() => dispatch(closeModal({ isSecond }))} />
    </MobileBG>
  );
}
