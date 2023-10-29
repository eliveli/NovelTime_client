import { CategoryMark } from "components/CategoryMark";
import { ReactNode } from "react";
import { ColumnBG, ColumnListContainer } from "./ColumnDetailList.styles";

type Props = React.PropsWithChildren<{
  categoryText: string;
  categoryFilter?: ReactNode;
}>;

export default function ColumnDetail({ categoryText, children, categoryFilter }: Props) {
  return (
    <ColumnBG>
      <CategoryMark categoryText={categoryText} />
      {categoryFilter}
      <ColumnListContainer>{children}</ColumnListContainer>
    </ColumnBG>
  );
}
