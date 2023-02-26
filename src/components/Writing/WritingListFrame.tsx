import { useNavigate } from "react-router-dom";
import { CategoryMark } from "components/CategoryMark";
import { addWritingInPage } from "assets/images";
import {
  ColumnBG,
  ColumnListContainer,
  WritingTabContainer,
  WritingTab,
  WritingTabText,
  AddWritingContainer,
  AddWriting,
} from "./WritingListFrame.styles";

type Props = React.PropsWithChildren<{
  isTalk: boolean;
  handleTalk: React.Dispatch<React.SetStateAction<boolean>>;
  isShowAllMark?: boolean;
  categoryText: string;
  novelId: string;
  writing: boolean;
  novelTitle: string;
  fontSize?: number;
}>;

export default function WritingListFrame({
  novelId,
  novelTitle,
  categoryText,
  isTalk,
  handleTalk,
  children,
  writing,
  isShowAllMark,
  fontSize,
}: Props) {
  const navigate = useNavigate();

  return (
    <ColumnBG>
      <CategoryMark
        writing={writing}
        isShowAllMark={isShowAllMark}
        categoryText={categoryText}
        novelId={novelId}
        fontSize={fontSize}
      />
      <AddWritingContainer
        onClick={() => {
          navigate(`/add-writing/${novelId}/${novelTitle}`);
        }}
      >
        <AddWriting src={addWritingInPage} alt="addWriting" />
      </AddWritingContainer>
      <WritingTabContainer>
        <WritingTab isTalk={isTalk} onClick={() => handleTalk(true)}>
          <WritingTabText>FreeTalk</WritingTabText>
        </WritingTab>
        <WritingTab isTalk={!isTalk} onClick={() => handleTalk(false)}>
          <WritingTabText>Recommend</WritingTabText>
        </WritingTab>
      </WritingTabContainer>
      <ColumnListContainer>{children}</ColumnListContainer>
    </ColumnBG>
  );
}
