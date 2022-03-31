import SectionBG from "components/SectionBG";
import { useCallback, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "assets/Icon";
import { handleWritingSubmit } from "../../store/clientSlices/writingSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

import {
  NovelTitleContainer,
  NovelTitle,
  Board,
  BoardContainer,
  WritingContent,
  WritingTitle,
  ContentPlusContnrMobile,
  ContentPlusAlignMobile,
  ContentPlusCotnrPC,
  WritingContentContnr,
  WritingTitleContanr,
  SubmitBtnPC,
  SubmitBtnContnr,
} from "./AddWriting.styles";

export default function AddWriting() {
  // get novelInfo from params : when entering this page from novel detail page
  const { novelId, novelTitle } = useParams();

  // server request for submit----------------------------
  const handleSubmit = () => {
    // server request : submit writing info //
    // - novelId, boardCategory, writingTitle, writingContent, userId(or userName), etc... //
  };
  // for mobile and tablet : when clicked submit button at the top navigation
  const dispatch = useAppDispatch();
  const { isWritingSubmit } = useAppSelector((state) => state.writing);
  if (isWritingSubmit) {
    handleSubmit();
    dispatch(handleWritingSubmit(false)); // reset writing-submit state
  }

  // ----------------------------------------------------//

  // handle title of novel --------------------------------
  const [novel, setNovel] = useState({ novelId, novelTitle });

  // ----------------------------------------------------//

  // handle title of writing ------------------------------
  const titleRef = useRef<HTMLTextAreaElement>(null);
  const [title, setTitle] = useState("");

  // auto-set height of title element
  const writeTitle = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!titleRef.current) return;

    setTitle(e.target.value); // store content of Title
    titleRef.current.style.height = "28px"; // Default: height of 1 line
    const titleHeight = titleRef.current.scrollHeight; // current scroll height

    // max-height : 5 lines of 124px
    titleRef.current.style.height = `${titleHeight <= 124 ? titleRef.current.scrollHeight : 124}px`;
  }, []);
  // ----------------------------------------------------//

  // handle content of writing ----------------------------
  const contentRef = useRef("");
  const writeContent = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    contentRef.current = e.target.value;
  };
  // ----------------------------------------------------//

  // handle board -----------------------------------------
  type Board = "FreeTalk" | "Recommend";
  const [board, setBoard] = useState("FreeTalk");
  // ----------------------------------------------------//
  return (
    <SectionBG>
      <NovelTitleContainer>
        <NovelTitle>{novel.novelTitle ? novel.novelTitle : "소설제목"}</NovelTitle>
        {!novelTitle && (
          <Icon.IconBox>
            <Icon.Search />
          </Icon.IconBox>
        )}
      </NovelTitleContainer>
      <BoardContainer>
        <Board category="FreeTalk" selected={board as Board} onClick={() => setBoard("FreeTalk")}>
          FreeTalk
        </Board>
        <Board category="Recommend" selected={board as Board} onClick={() => setBoard("Recommend")}>
          Recommend
        </Board>
      </BoardContainer>
      <WritingTitleContanr>
        <WritingTitle ref={titleRef} placeholder="글 제목을 입력하세요" onChange={writeTitle} />
      </WritingTitleContanr>

      <ContentPlusCotnrPC>사진/간단텍스트설정/이모지</ContentPlusCotnrPC>
      <WritingContentContnr>
        <WritingContent placeholder="글 내용을 입력하세요" onChange={writeContent} />
      </WritingContentContnr>

      <SubmitBtnContnr>
        <SubmitBtnPC onClick={handleSubmit}>작성</SubmitBtnPC>
      </SubmitBtnContnr>

      <ContentPlusContnrMobile>
        <ContentPlusAlignMobile>사진/간단텍스트설정/이모지</ContentPlusAlignMobile>
      </ContentPlusContnrMobile>
    </SectionBG>
  );
}
