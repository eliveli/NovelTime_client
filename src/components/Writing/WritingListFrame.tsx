import { useNavigate } from "react-router-dom";
import { CategoryMark } from "components/CategoryMark";
import { setSearchList } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ADD_WRITING } from "utils/pathname";
import { handleAlert, openFirstModal } from "store/clientSlices/modalSlice";
import Icon from "assets/Icon";
import { useWhetherItIsMobile } from "utils";
import { handleNovelIdToAddToList } from "store/clientSlices/userNovelListSlice";
import {
  ColumnBG,
  ColumnListContainer,
  WritingTabContainer,
  WritingTab,
  WritingTabText,
  ButtonContainer,
  ButtonText,
  ButtonsContainer,
} from "./WritingListFrame.styles";

function ButtonInNovelDetail({
  isForMyList,
  _onClick,
  children,
}: {
  isForMyList?: true;
  _onClick: () => void;
  children: React.ReactNode;
}) {
  const isLoginUser = !!useAppSelector((state) => state.loginUser.user.userId);
  const dispatch = useAppDispatch();

  return (
    <ButtonContainer
      isForMyList={isForMyList}
      onClick={() => {
        if (!isLoginUser) {
          dispatch(openFirstModal("alert"));
          dispatch(handleAlert({ text: "로그인이 필요합니다" }));
          return;
        }

        _onClick();
      }}
    >
      {children}
    </ButtonContainer>
  );
}

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

  const isNotMobile = !useWhetherItIsMobile();

  const isLoginUser = !!useAppSelector((state) => state.loginUser.user.userId);

  const handleToGoToWrite = () => {
    if (!isLoginUser) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "먼저 로그인해 주세요" }));
      return;
    }

    dispatch(
      setSearchList({
        listType: "novel",
        list: "reset",
      }),
    );
    navigate(`${ADD_WRITING}?novel-id=${novelId}&novel-title=${novelTitle}`);
  };

  const handleToGoToAddNovel = () => {
    if (!isLoginUser) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "먼저 로그인해 주세요" }));
      return;
    }

    dispatch(handleNovelIdToAddToList(novelId));

    dispatch(openFirstModal("addToMyNovelList"));
  };

  return (
    <ColumnBG>
      <CategoryMark
        writing={writing}
        isShowAllMark={isShowAllMark}
        categoryText={categoryText}
        fontSize={fontSize}
      />

      <ButtonsContainer>
        <ButtonInNovelDetail _onClick={handleToGoToWrite}>
          <Icon.IconBox hover="none">
            <Icon.Write2 />
          </Icon.IconBox>
          {isNotMobile && <ButtonText>글쓰기</ButtonText>}
        </ButtonInNovelDetail>

        <ButtonInNovelDetail isForMyList _onClick={handleToGoToAddNovel}>
          <Icon.IconBox hover="none">
            <Icon.Plus />
          </Icon.IconBox>
          {isNotMobile && <ButtonText>담기</ButtonText>}
        </ButtonInNovelDetail>
      </ButtonsContainer>

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
