import { Genres, SortMobile, SortTablet } from "./Filter.components";
import { FilterBG } from "./Filter.styles";

// required server request : Filter Genre & Sort for Writing!
export default function Filter() {
  return (
    <FilterBG>
      <Genres />
      <SortMobile />
      <SortTablet />
    </FilterBG>
  );
}
