import SectionBG from "components/SectionBG";
import { useCallback, useRef, useState } from "react";
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

  return (
    <SectionBG>
      <NovelTitleContainer>
        <NovelTitle>소설제목</NovelTitle>
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
        <SubmitBtnPC>작성</SubmitBtnPC>
      </SubmitBtnContnr>

      <ContentPlusContnrMobile>
        <ContentPlusAlignMobile>사진/간단텍스트설정/이모지</ContentPlusAlignMobile>
      </ContentPlusContnrMobile>
    </SectionBG>
  );
}
