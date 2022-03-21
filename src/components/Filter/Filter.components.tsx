import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { openModal, sortWriting } from "../../store/clientSlices/modalSlice";

import {
  SortMobileContainer,
  SortTabletContainer,
  SortText,
  SortTab,
  Genre,
  GenreBox,
  DownIconBox,
  DownIcon,
  SortMobileContent,
  CustomArrowBox,
} from "./Filter.styles";

export function Genres() {
  const [genre, selectGenre] = useState("All");
  return (
    <GenreBox>
      {[
        "All",
        "로판",
        "판타지",
        "로맨스",
        "현판",
        "무협",
        "패러디",
        "라이트노벨",
        "미스터리",
        "BL",
        "그리고",
      ].map((_) => (
        <Genre
          genreName={_}
          selectedGenre={genre}
          onClick={() => {
            selectGenre(_);
            // require server request //
          }}
        >
          {_}
        </Genre>
      ))}
    </GenreBox>
  );
}
export function SortMobile() {
  const dispatch = useAppDispatch();
  const { sortingText } = useAppSelector((state) => state.modal);
  // when clicking, in Modal component,
  // require server request in this component!

  return (
    <SortMobileContainer>
      <SortMobileContent
        onClick={() => {
          dispatch(openModal("sortMobile"));
        }}
      >
        <SortText>{sortingText}</SortText>
        <DownIconBox>
          <DownIcon />
        </DownIconBox>
      </SortMobileContent>
    </SortMobileContainer>
  );
}
export function SortTablet() {
  return (
    <CustomArrowBox>
      <SortTabletContainer>
        {["작성일New", "작성일Old", "댓글Up", "댓글Down", "좋아요Up", "좋아요Down"].map((_) => (
          <SortTab
            onClick={() => {
              // require server request //
            }}
          >
            {_}
          </SortTab>
        ))}
      </SortTabletContainer>
    </CustomArrowBox>
    // <select name="cars" id="cars">
    //   <option value="volvo">Volvo</option>
    //   <option value="saab">Saab</option>
    //   <option value="opel">Opel</option>
    //   <option value="audi">Audi</option>
    // </select>
  );
}
