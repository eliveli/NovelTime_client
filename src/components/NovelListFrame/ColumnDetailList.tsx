import { CategoryMark } from "components/CategoryMark";
import { ColumnBG, ColumnListContainer } from "./ColumnDetailList.styles";

type Props = React.PropsWithChildren<{
  categoryId?: string;
  isShowAllMark?: boolean;
  categoryText: string;
}>;

export default function ColumnDetail({ categoryId, isShowAllMark, categoryText, children }: Props) {
  return (
    <ColumnBG>
      <CategoryMark
        isShowAllMark={isShowAllMark}
        categoryId={categoryId}
        categoryText={categoryText}
      />
      <ColumnListContainer>{children}</ColumnListContainer>
    </ColumnBG>
  );
}
