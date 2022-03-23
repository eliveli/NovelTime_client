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
  categoryText: string;
  novelId: string;
  writing: boolean;
  novelTitle?: string;
  fontSize?: number;
}>;

export default function WritingListFrame({
  novelId,
  categoryText,
  isTalk,
  handleTalk,
  children,
  writing,
  isShowAll,
  fontSize,
}: Props) {
  return (
    <ColumnBG>
      <CategoryMark
        writing={writing}
        isShowAll={isShowAll}
        categoryText={categoryText}
        novelId={novelId}
        fontSize={fontSize}
      />
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
