import {
  CategoryContainer,
  CategoryDesc,
  LinkCategory,
  ShowAllText,
  ShowAllIcon,
} from "./CategoryMark.styles";

export default function CategoryMark({
  category,
  isShowAll,
}: {
  category: string;
  isShowAll?: boolean;
}) {
  return (
    <CategoryContainer>
      <CategoryDesc>{category}</CategoryDesc>
      {isShowAll === undefined && (
        <LinkCategory to={`/novel_list/${category}`}>
          <ShowAllText>전체보기</ShowAllText>
          <ShowAllIcon />
        </LinkCategory>
      )}
    </CategoryContainer>
  );
}
