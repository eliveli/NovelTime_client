import { useNavigate } from "react-router-dom";
import { CategoryMark } from "components/CategoryMark";
import WritingButton from "./WritingButton";
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

  const stylesForWritingButton = `
    height: 34px;
    border: 1px solid rgba(0,0,0,0.1);
    align-items: flex-end;
    padding: 4px 7px;
    position: absolute;
    top: 17px;
    left: 162px;
  `;

  return (
    <ColumnBG>
      <CategoryMark
        writing={writing}
        isShowAllMark={isShowAllMark}
        categoryText={categoryText}
        novelId={novelId}
        fontSize={fontSize}
      />

      <WritingButton
        styles={stylesForWritingButton}
        clickToWrite={() => {
          navigate(`/add-writing/${novelId}/${novelTitle}`);
        }}
      />

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
