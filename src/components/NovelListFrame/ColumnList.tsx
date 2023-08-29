import { ReactNode } from "react";
import { CategoryMark } from "../CategoryMark";
import { ColumnBG, ColumnListContainer } from "./ColumnList.styles";

type Props = React.PropsWithChildren<{
  categoryId: string;
  categoryText: string;
  isShowAllMark: boolean;
  categoryFilter?: ReactNode;
}>;

export default function ColumnList({
  categoryId,
  categoryText,
  isShowAllMark,
  categoryFilter,
  children,
}: Props) {
  return (
    <ColumnBG>
      <CategoryMark
        categoryText={categoryText}
        categoryId={categoryId}
        isShowAllMark={isShowAllMark}
      />
      {categoryFilter}
      <ColumnListContainer>{children}</ColumnListContainer>
    </ColumnBG>
  );
}
