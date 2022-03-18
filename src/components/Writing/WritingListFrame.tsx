import { CategoryMark } from "components/CategoryMark";
import {
  ColumnBG,
  ColumnListContainer,
  WritingTabContainer,
  WritingTab,
  WritingTabText,
} from "./WritingListFrame.styles";

type Props = React.PropsWithChildren<{
  isTalk: boolean;
  handleTalk: React.Dispatch<React.SetStateAction<boolean>>;
  isShowAll?: boolean;
  category: string;
}>;

export default function WritingListFrame({ category, isTalk, handleTalk, children }: Props) {
  return (
    <ColumnBG>
      <CategoryMark category={category} />
      <WritingTabContainer>
        <WritingTab isTalk={isTalk} onClick={() => handleTalk(true)}>
          <WritingTabText>FreeTalking</WritingTabText>
        </WritingTab>
        <WritingTab isTalk={!isTalk} onClick={() => handleTalk(false)}>
          <WritingTabText>Recommend</WritingTabText>
        </WritingTab>
      </WritingTabContainer>
      <ColumnListContainer>{children}</ColumnListContainer>
    </ColumnBG>
  );
}
