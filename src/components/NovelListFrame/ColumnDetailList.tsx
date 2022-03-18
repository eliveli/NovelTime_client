import { CategoryMark } from "components/CategoryMark";
import { ColumnBG, ColumnListContainer } from "./ColumnDetailList.styles";

type Props = React.PropsWithChildren<{ isShowAll?: boolean; category: string }>;

export default function ColumnDetail({ isShowAll, category, children }: Props) {
  return (
    <ColumnBG>
      <CategoryMark isShowAll={isShowAll} category={category} />
      <ColumnListContainer>{children}</ColumnListContainer>
    </ColumnBG>
  );
}
