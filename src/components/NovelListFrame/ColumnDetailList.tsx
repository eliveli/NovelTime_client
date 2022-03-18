import { CategoryMark } from "components/CategoryMark";
import { ColumnBG, ColumnListContainer } from "./ColumnDetailList.styles";

type Props = React.PropsWithChildren<{
  categoryId?: string;
  isShowAll?: boolean;
  categoryText: string;
}>;

export default function ColumnDetail({ categoryId, isShowAll, categoryText, children }: Props) {
  return (
    <ColumnBG>
      <CategoryMark isShowAll={isShowAll} categoryId={categoryId} categoryText={categoryText} />
      <ColumnListContainer>{children}</ColumnListContainer>
    </ColumnBG>
  );
}
