import { GenresFromFilter, SearchTypeFromFilter } from "store/clientSlices/filterSlice";
import { SortTypeFromFilter } from "store/clientSlices/modalSlice";
import { NovelGenre } from "store/serverAPIs/types";

export function matchPlatformName(platformSelected: string) {
  if (platformSelected === "카카페") return "kakape";
  if (platformSelected === "시리즈") return "series";
  if (platformSelected === "리디북스") return "ridi";
  if (platformSelected === "조아라") return "joara";

  throw Error("플랫폼 선택 오류");
}

export function matchGenreName(genre: string) {
  if (genre === "All") return "all";
  if (genre === "그 외") return "extra";

  if (
    ["패러디", "로판", "로맨스", "현판", "판타지", "무협", "라이트노벨", "BL", "미스터리"].includes(
      genre,
    )
  ) {
    return genre as NovelGenre;
  }

  return genre as NovelGenre;
  // ㄴ최초 필터명이 맞지 않았어도 재설정되었을 것 by useResetFiltersFromUrl (이하 함수 동일)
}

export function matchSrchTypeName(searchType: string) {
  if (searchType === "no") return "no";
  if (searchType === "Title") return "writingTitle";
  if (searchType === "Desc") return "writingDesc";
  if (searchType === "Writer") return "userName";
  if (searchType === "Novel") return "novelTitle";
  return searchType as "no" | "writingTitle" | "writingDesc" | "userName" | "novelTitle";
}

export function matchSortTypeName(sortType: string) {
  if (sortType === "작성일New") {
    return "newDate";
  }
  if (sortType === "작성일Old") {
    return "oldDate";
  }
  if (sortType === "댓글Up") {
    return "manyComments";
  }
  if (sortType === "댓글Down") {
    return "fewComments";
  }
  if (sortType === "좋아요Up") {
    return "manyLikes";
  }
  if (sortType === "좋아요Down") {
    return "fewLikes";
  }
  return sortType as
    | "newDate"
    | "oldDate"
    | "manyComments"
    | "fewComments"
    | "manyLikes"
    | "fewLikes";
}

export function matchFilterNames(filters: {
  genre?: string;
  searchType?: string;
  sortType?: string;
}) {
  const filterEntries = Object.entries(filters);

  const filtersMatched = {
    genreMatched: "",
    searchTypeMatched: "",
    sortTypeMatched: "",
  };

  filterEntries.map(([filterType, filterValue]) => {
    if (filterType === "genre") {
      filtersMatched.genreMatched = matchGenreName(filterValue);
      //
    } else if (filterType === "searchType") {
      filtersMatched.searchTypeMatched = matchSrchTypeName(filterValue);
      //
    } else if (filterType === "sortType") {
      filtersMatched.sortTypeMatched = matchSortTypeName(filterValue);
    }
  });

  return filtersMatched;
}
