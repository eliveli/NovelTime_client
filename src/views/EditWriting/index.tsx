import MainBG from "components/MainBG";
import { useCallback, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { RECOMMEND_DETAIL, RECOMMEND_LIST, TALK_DETAIL, TALK_LIST } from "utils/pathname";
import { useEditWritingMutation } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { handleAlert, openModal } from "store/clientSlices/modalSlice";
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
  WritingTitleContanr,
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

  const setHeightOfTitle = useCallback(() => {
    if (!titleRef.current) return;

    titleRef.current.style.height = "28px"; // Default: height of 1 line
    const titleHeight = titleRef.current.scrollHeight; // current scroll height

    // max-height : 5 lines of 124px
    titleRef.current.style.height = `${titleHeight <= 124 ? titleRef.current.scrollHeight : 124}px`;
  }, []);
  const [editWriting, editWritingResult] = useEditWritingMutation();

  const loginUserId = useAppSelector((state) => state.loginUser.user.userId);

  const navigate = useNavigate();

  const submitToEditWriting = async () => {
    if (!loginUserId) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("먼저 로그인을 해 주세요"));
      return;
    }
    if (!titleRef.current?.value) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("제목을 입력해 주세요"));
      return;
    }

    if (!contentRef.current?.value) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("내용을 입력해 주세요"));
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
      dispatch(openModal("alert"));
      dispatch(handleAlert(`글을 수정할 수 없습니다.\n새로고침 후 다시 시도해 보세요`));
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

      dispatch(openModal("alert"));
      dispatch(handleAlert("비정상적인 접근입니다"));
      navigate(pathToGoTo);
    }
  }, [writingId]);

  return (
    <MainBG>
      {editWritingResult.isLoading && <Spinner styles="fixed" />}

      <NovelTitleContainer>
        <NovelTitle>{novelTitle}</NovelTitle>
      </NovelTitleContainer>

      <BoardContainer>
        <Board>{writingType}</Board>
      </BoardContainer>

      <WritingTitleContanr>
        <WritingTitle
          ref={titleRef}
          placeholder="글 제목을 입력하세요"
          onChange={setHeightOfTitle}
        />
      </WritingTitleContanr>

      {/* <ContentPlusCotnrPC>사진/간단텍스트설정/이모지</ContentPlusCotnrPC> */}

      <WritingContentContnr>
        <WritingContent ref={contentRef} placeholder="글 내용을 입력하세요" />
      </WritingContentContnr>

      <SubmitBtnContnr>
        <SubmitBtnPC onClick={submitToEditWriting}>수정</SubmitBtnPC>
      </SubmitBtnContnr>

      {/* <ContentPlusContnrMobile>
        <ContentPlusAlignMobile>사진/간단텍스트설정/이모지</ContentPlusAlignMobile>
      </ContentPlusContnrMobile> */}
    </MainBG>
  );
}
