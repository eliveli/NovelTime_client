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

// genreFromUrl for pagination, genreFromState for infinite scroll
export function matchGenreName(genreFromUrl: string | null, genreFromState: string) {
  const genre = genreFromUrl || genreFromState;
  if (genre === "All") return "all";
  if (genre === "그 외") return "extra";
  if (
    ["패러디", "로판", "로맨스", "현판", "판타지", "무협", "라이트노벨", "BL", "미스터리"].includes(
      genre,
    )
  ) {
    return genre as NovelGenre;
  }
  throw Error("genre name error");
}

export function matchSrchTypeName(searchTypeFromUrl: string | null, searchTypeFromState: string) {
  const srchType = searchTypeFromUrl || searchTypeFromState;
  if (srchType === "Title") return "writingTitle";
  if (srchType === "Desc") return "writingDesc";
  if (srchType === "Writer") return "userName";
  if (srchType === "Novel") return "novelTitle";
  throw Error("search Type error");
}

export function matchSortTypeName(sortTypeFromUrl: string | null, sortTypeFromState: string) {
  const sortType = sortTypeFromUrl || sortTypeFromState;
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
  throw Error("sort Type error");
}
