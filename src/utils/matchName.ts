import { GenresFromFilter, SearchTypeFromFilter } from "store/clientSlices/filterSlice";
import { SortTypeFromFilter } from "store/clientSlices/modalSlice";

export function matchPlatformName(platformSelected: string) {
  if (platformSelected === "카카페") return "kakape";
  if (platformSelected === "시리즈") return "series";
  if (platformSelected === "리디북스") return "ridi";
  if (platformSelected === "조아라") return "joara";

  throw Error("플랫폼 선택 오류");
}

export function matchGenreName(genre: GenresFromFilter) {
  if (genre === "All") return "all";
  if (genre === "그 외") return "extra";
  return genre;
}

export function matchSrchTypeName(srchType: SearchTypeFromFilter) {
  if (srchType === "Title") return "writingTitle";
  if (srchType === "Desc") return "writingDesc";
  if (srchType === "Writer") return "userName";
  if (srchType === "Novel") return "novelTitle";
  throw Error("search Type error");
}

export function matchSortTypeName(sortType: SortTypeFromFilter) {
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
