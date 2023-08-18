import { closeModal } from "store/clientSlices/modalSlice";
import { useMultipleSearchFilters } from "utils/useSearchFilterForSearchAll";
import { useAppDispatch } from "../../store/hooks";
import { MobileBG, SortBox, SortText, ClosingSpace } from "./Modal.styles";

export default function FilterContent() {
  const dispatch = useAppDispatch();

  const {
    currentFilters: { currentSearchCategory },
    setFilters,
  } = useMultipleSearchFilters();

  const searchCategories = ["Novel", "Talk", "Recommend"];

  return (
    <MobileBG>
      <SortBox>
        {searchCategories.map((_) => (
          <SortText
            key={_}
            selectedCategory={currentSearchCategory}
            category={_}
            onClick={() => {
              setFilters({ searchCategory: _, searchType: "Title" });
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
