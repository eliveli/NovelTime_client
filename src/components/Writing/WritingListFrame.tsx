import { useNavigate } from "react-router-dom";
import { CategoryMark } from "components/CategoryMark";
import { setSearchList } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { ADD_WRITING } from "utils/pathname";
import { openModal } from "store/clientSlices/modalSlice";
import Icon from "assets/Icon";
import { useWhetherItIsMobile } from "utils";
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
  const isLoginUser = !!useAppSelector((state) => state.user.loginUserInfo.userId);

  return (
    <ButtonContainer
      isForMyList={isForMyList}
      onClick={() => {
        if (!isLoginUser) {
          alert("로그인이 필요합니다");
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

  return (
    <ColumnBG>
      <CategoryMark
        writing={writing}
        isShowAllMark={isShowAllMark}
        categoryText={categoryText}
        novelId={novelId}
        fontSize={fontSize}
      />

      <ButtonsContainer>
        <ButtonInNovelDetail
          _onClick={() => {
            dispatch(
              setSearchList({
                listType: "novel",
                list: "reset",
              }),
            );
            navigate(`${ADD_WRITING}?novel-id=${novelId}&novel-title=${novelTitle}`);
          }}
        >
          <Icon.IconBox>
            <Icon.Write2 />
          </Icon.IconBox>
          {isNotMobile && <ButtonText>글쓰기</ButtonText>}
        </ButtonInNovelDetail>

        <ButtonInNovelDetail
          isForMyList
          _onClick={() => {
            dispatch(openModal("addToMyNovelList"));
          }}
        >
          <Icon.IconBox>
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
