import { CategoryMark } from "components/CategoryMark";
import { ReactNode } from "react";
import { ColumnBG, ColumnListContainer } from "./ColumnDetailList.styles";

type Props = React.PropsWithChildren<{
  categoryId?: string;
  isShowAllMark?: boolean;
  categoryText: string;
  categoryFilter?: ReactNode;
}>;

export default function ColumnDetail({
  categoryId,
  isShowAllMark,
  categoryText,
  children,
  categoryFilter,
}: Props) {
  return (
    <ColumnBG>
      <CategoryMark
        isShowAllMark={isShowAllMark}
        categoryId={categoryId}
        categoryText={categoryText}
      />
      {categoryFilter}
      <ColumnListContainer>{children}</ColumnListContainer>
    </ColumnBG>
  );
}
