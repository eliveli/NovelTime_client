import {
  CategoryContainer,
  CategoryDesc,
  LinkCategory,
  ShowAllText,
  ShowAllIcon,
} from "./CategoryMark.styles";

export default function CategoryMark({
  writing,
  categoryId,
  categoryText,
  isShowAll,
  novelId,
}: {
  writing?: boolean;
  categoryId?: string;
  categoryText: string; // category list request
  isShowAll?: boolean;
  novelId?: string; // writing list request by novelId
}) {
  if (writing) {
    return (
      <CategoryContainer>
        <CategoryDesc>{categoryText}</CategoryDesc>
        {/* 전체보기 페이지일 때 */}
        {isShowAll === undefined && (
          <LinkCategory to={`/writing_list/${novelId as string}`}>
            <ShowAllText>전체보기</ShowAllText>
            <ShowAllIcon />
          </LinkCategory>
        )}
      </CategoryContainer>
    );
  }
  if (novelId) {
    return (
      <CategoryContainer>
        <CategoryDesc>{categoryText}</CategoryDesc>
        {/* 전체보기 페이지일 때 */}
        {isShowAll === undefined && (
          <LinkCategory to={`/novel_list/${categoryText}/${categoryId as string}/${novelId}`}>
            <ShowAllText>전체보기</ShowAllText>
            <ShowAllIcon />
          </LinkCategory>
        )}
      </CategoryContainer>
    );
  }

  return (
    <CategoryContainer>
      <CategoryDesc>{categoryText}</CategoryDesc>
      {/* 전체보기 페이지일 때 */}
      {isShowAll === undefined && (
        <LinkCategory to={`/novel_list/${categoryText}/${categoryId as string}`}>
          <ShowAllText>전체보기</ShowAllText>
          <ShowAllIcon />
        </LinkCategory>
      )}
    </CategoryContainer>
  );
}
