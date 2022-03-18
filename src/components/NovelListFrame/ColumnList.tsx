import { CategoryMark } from "../CategoryMark";
import { ColumnBG, ColumnListContainer } from "./ColumnList.styles";

type Props = React.PropsWithChildren<{ isShowAll?: boolean; category: string }>;

export default function ColumnList({ category, children }: Props) {
  return (
    <ColumnBG>
      <CategoryMark category={category} />
      <ColumnListContainer>{children}</ColumnListContainer>
    </ColumnBG>
  );
}
