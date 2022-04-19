import { CategoryMark } from "../CategoryMark";
import { ColumnBG, ColumnListContainer } from "./ColumnList.styles";

type Props = React.PropsWithChildren<{
  categoryId: string;
  categoryText: string;
  isShowAllMark: boolean;
}>;

export default function ColumnList({ categoryId, categoryText, isShowAllMark, children }: Props) {
  return (
    <ColumnBG>
      <CategoryMark
        categoryText={categoryText}
        categoryId={categoryId}
        isShowAllMark={isShowAllMark}
      />
      <ColumnListContainer>{children}</ColumnListContainer>
    </ColumnBG>
  );
}
