import { useSearchParams } from "react-router-dom";

const genres = [
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
  "그 외",
];

const searchTypes = ["no", "Title", "Desc", "Writer", "Novel"];

const sortTypes = ["작성일New", "작성일Old", "댓글Up", "댓글Down", "좋아요Up", "좋아요Down"];

// 필터 from url 이 설정된 목록에 없을 때 재설정
export default function useResetFiltersFromUrl(
  filters: { filter: string; value: string | null }[],
) {
  const [searchParams, setSearchParams] = useSearchParams();

  // url에 어떤 필터값도 없다면 필터 재설정 안 함. then for infinite scroll
  const filtersWithRealValues = filters.filter((f) => f.value !== null);
  if (filtersWithRealValues.length === 0) return;

  filters.map((f) => {
    const { filter, value } = f;

    if (filter === "genre") {
      if (!genres.includes(value as string)) {
        searchParams.set("genre", "All");
        setSearchParams(searchParams);
      }
    } else if (filter === "searchType") {
      if (!searchTypes.includes(value as string)) {
        searchParams.set("searchType", "no");
        setSearchParams(searchParams);
      }
    } else if (filter === "sortType") {
      if (!sortTypes.includes(value as string)) {
        searchParams.set("sortType", "작성일New");
        setSearchParams(searchParams);
      }
    } else if (filter === "pageNo") {
      const pageNoToNumber = Number(value);
      if (
        !(typeof pageNoToNumber === "number" && pageNoToNumber >= 1 && pageNoToNumber % 1 === 0)
      ) {
        searchParams.set("pageNo", "1");
        setSearchParams(searchParams);
      }
    } else throw Error("filter type error");
  });
}
