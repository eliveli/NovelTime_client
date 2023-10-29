import MainBG from "components/MainBG";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RECOMMEND_DETAIL, RECOMMEND_LIST, TALK_DETAIL, TALK_LIST } from "utils/pathname";
import { useEditWritingMutation } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { handleAlert, openFirstModal } from "store/clientSlices/modalSlice";
import { useComponentHeight, useWhetherItIsDesktop } from "utils";
import {
  handleWritingToSubmitOnMobile,
  handleWritingToEdit,
} from "../../store/clientSlices/writingSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

import {
  NovelTitleContainer,
  NovelTitle,
  BoardContainer,
  WritingContent,
  WritingTitle,
  WritingContentContnr,
  WritingTitleContnr,
  SubmitBtnPC,
  SubmitBtnContnr,
} from "../AddWriting/AddWriting.styles";
import { Board } from "./EditWriting.styles";

export default function EditWriting() {
  const dispatch = useAppDispatch();

  const { writingId, novelId, novelTitle, writingType, writingTitle, writingDesc } = useAppSelector(
    (state) => state.writing.writingToEdit,
  );

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  // adjust height in content considering this
  const novelTitleContnrRef = useRef<HTMLDivElement>(null);
  const novelTitleContnrHeight = useComponentHeight(novelTitleContnrRef);

  // change height in WritingContentContnr whenever lines change in title
  const [titleHeightChanged, getTitleHeight] = useState("");

  const setHeightOfTitle = () => {
    if (!titleRef.current) return;

    titleRef.current.style.height = "28px"; // Default: height in 1 line

    const titleHeight = titleRef.current.scrollHeight; // current scroll height

    // max-height : 124px in 5 lines
    titleRef.current.style.height = `${titleHeight <= 124 ? titleRef.current.scrollHeight : 124}px`;

    getTitleHeight(titleRef.current.style.height);
  };

  const preventEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  const [editWriting, editWritingResult] = useEditWritingMutation();

  const loginUserId = useAppSelector((state) => state.loginUser.user.userId);

  const navigate = useNavigate();

  const submitToEditWriting = async () => {
    if (!loginUserId) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "먼저 로그인을 해 주세요" }));
      return;
    }
    if (!titleRef.current?.value) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "제목을 입력해 주세요" }));
      return;
    }

    if (!contentRef.current?.value) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "내용을 입력해 주세요" }));
      return;
    }

    if (editWritingResult.isLoading) return;

    await editWriting({
      writingId,
      writingTitle: titleRef.current.value,
      writingDesc: contentRef.current.value,
      writingImg: undefined, // treat this later
      writingType: writingType === "FreeTalk" ? "T" : "R",
      novelId,
    });

    if (editWritingResult.isError) {
      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: `글을 수정할 수 없습니다.\n새로고침 후 다시 시도해 보세요` }));
    }

    const pathToGoTo = writingType === "FreeTalk" ? TALK_DETAIL : RECOMMEND_DETAIL;
    navigate(`${pathToGoTo}/${writingId}`, { replace: true }); // go to the writing detail page

    dispatch(
      handleWritingToEdit({
        writingId: "",
        writingTitle: "",
        writingDesc: "",
        writingType: "FreeTalk",
        novelId: "",
        novelTitle: "",
      }),
    );
  };

  // set the title and content to edit the post when entering at first
  useEffect(() => {
    if (!titleRef.current || !contentRef.current) return;

    titleRef.current.value = writingTitle;
    contentRef.current.value = writingDesc;

    setHeightOfTitle();
  }, []);

  // when clicking the submit button in nav bar on mobile or tablet
  const isWritingToSubmitOnMobile = useAppSelector(
    (state) => state.writing.isWritingToSubmitOnMobile,
  );
  useEffect(() => {
    async function submitOnMobile() {
      if (isWritingToSubmitOnMobile) {
        await submitToEditWriting();
        dispatch(handleWritingToSubmitOnMobile(false)); // initialize
      }
    }
    submitOnMobile();
  }, [isWritingToSubmitOnMobile]);

  // when this page was refreshed
  useEffect(() => {
    if (!writingId) {
      const pathToGoTo = writingType === "FreeTalk" ? TALK_LIST : RECOMMEND_LIST;

      dispatch(openFirstModal("alert"));
      dispatch(handleAlert({ text: "비정상적인 접근입니다" }));
      navigate(pathToGoTo);
    }
  }, [writingId]);

  const isDesktop = useWhetherItIsDesktop();

  return (
    <MainBG>
      {editWritingResult.isLoading && <Spinner styles="fixed" />}

      <NovelTitleContainer ref={novelTitleContnrRef}>
        <NovelTitle>{novelTitle}</NovelTitle>
      </NovelTitleContainer>

      <BoardContainer>
        <Board>{writingType}</Board>
      </BoardContainer>

      <WritingTitleContnr>
        <WritingTitle
          ref={titleRef}
          placeholder="글 제목을 입력하세요"
          onChange={setHeightOfTitle}
          onKeyPress={preventEnter}
        />
      </WritingTitleContnr>

      {/* <ContentPlusCotnrPC>사진/간단텍스트설정/이모지</ContentPlusCotnrPC> */}

      <WritingContentContnr
        titleHeight={titleHeightChanged}
        novelTitleContnrHeight={`${novelTitleContnrHeight}px`}
      >
        <WritingContent ref={contentRef} placeholder="글 내용을 입력하세요" />
      </WritingContentContnr>

      {isDesktop && (
        <SubmitBtnContnr>
          <SubmitBtnPC onClick={submitToEditWriting}>수정</SubmitBtnPC>
        </SubmitBtnContnr>
      )}
      {/* <ContentPlusContnrMobile>
        <ContentPlusAlignMobile>사진/간단텍스트설정/이모지</ContentPlusAlignMobile>
      </ContentPlusContnrMobile> */}
    </MainBG>
  );
}
