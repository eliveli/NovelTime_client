import { useNavigate } from "react-router-dom";
import { CategoryMark } from "components/CategoryMark";
import { setSearchList } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ADD_WRITING } from "utils/pathname";
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
  selectWritingType: (writingType: "T" | "R") => void;
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
  selectWritingType,
  children,
  writing,
  isShowAllMark,
  fontSize,
}: Props) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const isLoginUser = !!useAppSelector((state) => state.user.loginUserInfo.userId);

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
          if (!isLoginUser) {
            alert("로그인이 필요합니다");
            return;
          }

          dispatch(
            setSearchList({
              listType: "novel",
              list: "reset",
            }),
          );

          navigate(`${ADD_WRITING}?novelId=${novelId}&novelTitle=${novelTitle}`);
        }}
      />

      <WritingTabContainer>
        <WritingTab isTalk={isTalk} onClick={() => selectWritingType("T")}>
          <WritingTabText>FreeTalk</WritingTabText>
        </WritingTab>
        <WritingTab isTalk={!isTalk} onClick={() => selectWritingType("R")}>
          <WritingTabText>Recommend</WritingTabText>
        </WritingTab>
      </WritingTabContainer>
      <ColumnListContainer>{children}</ColumnListContainer>
    </ColumnBG>
  );
}
