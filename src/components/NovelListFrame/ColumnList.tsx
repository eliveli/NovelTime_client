import { CategoryMark } from "../CategoryMark";
import { ColumnBG, ColumnListContainer } from "./ColumnList.styles";

type Props = React.PropsWithChildren<{ categoryId: string; categoryText: string }>;

export default function ColumnList({ categoryId, categoryText, children }: Props) {
  return (
    <ColumnBG>
      <CategoryMark categoryText={categoryText} categoryId={categoryId} />
      <ColumnListContainer>{children}</ColumnListContainer>
    </ColumnBG>
  );
}
