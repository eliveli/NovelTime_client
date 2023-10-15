import MainBG from "components/MainBG";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Icon from "assets/Icon";
import { NOVEL_DETAIL, RECOMMEND_LIST, SEARCH_NOVEL, TALK_LIST } from "utils/pathname";
import { useAddNovelWithURLMutation, useAddWritingMutation } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { handleAlert, openModal } from "store/clientSlices/modalSlice";
import { useWhetherItIsDesktop } from "utils";
import { setSearchList } from "store/clientSlices/filterSlice";
import { handleWritingToSubmitOnMobile } from "../../store/clientSlices/writingSlice";
import { useAppSelector, useAppDispatch } from "../../store/hooks";

import {
  NovelTitleContainer,
  NovelTitle,
  Board,
  BoardContainer,
  WritingContent,
  WritingTitle,
  WritingContentContnr,
  WritingTitleContanr,
  SubmitBtnPC,
  SubmitBtnContnr,
  Iframe,
  PlatformContnrFirst,
  PlatformContnrSecond,
  PlatformBtn,
  PlatformNewTab,
  SelectPlatform,
  NovelUrlContnr,
  NovelUrl,
  GuideText,
  PlatformBtnContnr,
  AllPlatformContnr,
  SrchGuideText,
  TextToBack,
  Note,
  NoteContainer,
} from "./AddWriting.styles";

export default function AddWriting() {
  // handle novel ------------- //

  const [addNovelWithURL, addNovelWithURLResult] = useAddNovelWithURLMutation();

  const [novelForReview, setNovelForReview] = useState({ novelId: "", novelTitle: "" });

  const [searchParams] = useSearchParams();

  // set novel id and novel title directly when entering from novel-detail page
  const novelIdInSearchParam = searchParams.get("novel-id");
  const novelTitleInSearchParam = searchParams.get("novel-title");
  useEffect(() => {
    if (novelIdInSearchParam && novelTitleInSearchParam) {
      setNovelForReview({ novelId: novelIdInSearchParam, novelTitle: novelTitleInSearchParam });
    }
  }, []);

  // how to get the novel to write its review //
  //  - way to search just to select
  //  - way to get the novel url from the novel platform
  //    . with share-link through iframe
  //    . directly through new tab opened

  // : if there is no novel to find in my website,
  //    user can get one by getting the novel url from novel platform
  //                     and giving it to the server
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // when searching for novels to select one without getting its url : onGoing true, inGettingURL false
  // when getting novel url to get novel : onGoing true, inGettingURL true
  // when finishing the process : onGoing false, inGettingURL false
  const [isGettingNovel, handleGettingNovel] = useState({ onGoing: false, inGettingURL: false });

  const [platformToGetURL, setPlatformToGetURL] = useState({
    withSharedLink: "시리즈",
    inNewTab: "",
  });

  const setIframeAddress = (platformToSearch: string) => {
    if (!iframeRef.current) return;
    iframeRef.current.src = platformToSearch;
  };

  // get the novel through iframe whenever calling with postMessage
  window.addEventListener(
    "message",
    (event) => {
      if (event.origin !== "http://domainfordev.com") {
        return;
      }

      // write review directly after selecting novel through iframe
      if (iframeRef.current && !!event.data.novelId) {
        setNovelForReview({ novelId: event.data.novelId, novelTitle: event.data.novelTitle });
        handleGettingNovel({ onGoing: false, inGettingURL: false });
      }

      // go to get the novel url to get a novel
      if (iframeRef.current && !!event.data.sign) {
        handleGettingNovel({ onGoing: true, inGettingURL: true });

        setIframeAddress("https://m.series.naver.com/search/search.series?t=novel&fs=default&q=");
      }
    },
    false,
  );

  const novelUrlRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeightOfNovelUrlElement = useCallback(() => {
    if (!novelUrlRef.current) return;

    novelUrlRef.current.style.height = "28px"; // Default: height of 1 line
    const novelUrlHeight = novelUrlRef.current.scrollHeight; // current scroll height

    // max-height : 5 lines of 124px
    novelUrlRef.current.style.height = `${
      novelUrlHeight <= 124 ? novelUrlRef.current.scrollHeight : 124
    }px`;
  }, []);

  const submitToAddNovel = async () => {
    // give novel url to server and get the novel id and novel title
    if (!novelUrlRef.current) return;

    if (!novelUrlRef.current.value) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("작품 url을 넣어주세요"));
      return;
    }

    if (addNovelWithURLResult.isLoading) return;

    await addNovelWithURL(novelUrlRef.current.value);

    if (addNovelWithURLResult.isError) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("작품 url을 확인해 주세요"));
    }
  };

  useEffect(() => {
    if (!addNovelWithURLResult.data) return;
    if (!addNovelWithURLResult.data.novelId || !addNovelWithURLResult.data.novelTitle) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("작품 url을 확인해 주세요"));
      return;
    }

    setNovelForReview({
      novelId: addNovelWithURLResult.data.novelId,
      novelTitle: addNovelWithURLResult.data.novelTitle,
    });

    // close iframe and initialize related things
    handleGettingNovel({ onGoing: false, inGettingURL: false });
    setPlatformToGetURL({ withSharedLink: "시리즈", inNewTab: "" });
  }, [addNovelWithURLResult.data]);

  const [isToolTipOpened, handleToolTip] = useState(false);

  // handle writing ------------- //

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const titleChanged = useRef("");
  const contentChanged = useRef("");

  const writeTitle = useCallback(() => {
    if (!titleRef.current) return;

    titleChanged.current = titleRef.current.value;

    // set the height of title automatically
    titleRef.current.style.height = "28px"; // Default: height of 1 line
    const titleHeight = titleRef.current.scrollHeight; // current scroll height

    // max-height : 5 lines of 124px
    titleRef.current.style.height = `${titleHeight <= 124 ? titleRef.current.scrollHeight : 124}px`;
  }, []);

  const writeContent = () => {
    if (!contentRef.current) return;
    contentChanged.current = contentRef.current?.value;
  };

  // after changing a novel, set the previous title and content again
  useEffect(() => {
    if (isGettingNovel.onGoing || !titleRef.current || !contentRef.current) return;

    titleRef.current.value = titleChanged.current;
    contentRef.current.value = contentChanged.current;
  }, [isGettingNovel.onGoing]);

  const [board, setBoard] = useState<"FreeTalk" | "Recommend">("FreeTalk");

  // set the board to "Recommend" directly when entering from recommend-list
  useEffect(() => {
    const boardType = searchParams.get("board");

    if (boardType === "Recommend") {
      setBoard(boardType);
    }
  }, []);

  const [addWriting, addWritingResult] = useAddWritingMutation();

  const loginUserId = useAppSelector((state) => state.loginUser.user.userId);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isDesktop = useWhetherItIsDesktop();

  const submitToAddWriting = async () => {
    if (!loginUserId) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("먼저 로그인을 해 주세요"));
      return;
    }
    if (!novelForReview.novelId) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("소설을 선택해 주세요"));
      return;
    }

    if (!board) {
      dispatch(openModal("alert"));
      dispatch(handleAlert("게시판 종류를 선택해 주세요"));
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

    if (addWritingResult.isLoading) return;

    await addWriting({
      novelId: novelForReview.novelId,
      writingType: board === "FreeTalk" ? "T" : "R",
      writingTitle: titleChanged.current,
      writingDesc: contentChanged.current,
      writingImg: undefined, // treat this later
    });

    if (addWritingResult.isError) {
      dispatch(openModal("alert"));
      dispatch(handleAlert(`글을 등록할 수 없습니다.\n새로고침 후 다시 시도해 보세요`));
    }

    // back to the novel-detail page
    if (novelIdInSearchParam && novelTitleInSearchParam) {
      navigate(`${NOVEL_DETAIL}/${novelIdInSearchParam}`, { replace: true });
      return;
    }

    // back to the list page
    const pathToGoTo = board === "FreeTalk" ? TALK_LIST : RECOMMEND_LIST;

    // with search params on desktop
    if (isDesktop) {
      navigate(`${pathToGoTo}?genre=All&searchType=no&searchWord=&sortType=작성일New&pageNo=1`, {
        replace: true,
      });
      return;
    }

    // on mobile
    const listType = board === "FreeTalk" ? "talk" : "recommend";

    dispatch(
      setSearchList({
        listType,
        list: "reset",
      }),
    );

    navigate(pathToGoTo, { replace: true });
  };

  // when clicking the submit button in nav bar on mobile or tablet
  const isWritingToSubmitOnMobile = useAppSelector(
    (state) => state.writing.isWritingToSubmitOnMobile,
  );

  useEffect(() => {
    async function submitOnMobile() {
      if (isWritingToSubmitOnMobile) {
        await submitToAddWriting();
        dispatch(handleWritingToSubmitOnMobile(false)); // initialize
      }
    }
    submitOnMobile();
  }, [isWritingToSubmitOnMobile]);

  return (
    <MainBG
      onClick={() => {
        if (isToolTipOpened) {
          handleToolTip(false);
        }
      }}
    >
      {addNovelWithURLResult.isLoading ||
        (addWritingResult.isLoading && <Spinner styles="fixed" />)}

      <NovelTitleContainer>
        <NovelTitle>
          {(!isGettingNovel.onGoing && novelForReview.novelTitle) || "소설제목"}
        </NovelTitle>

        {!novelIdInSearchParam && !isGettingNovel.onGoing ? (
          <Icon.IconBox>
            <Icon.Search
              onClick={() => handleGettingNovel({ onGoing: true, inGettingURL: false })}
            />
          </Icon.IconBox>
        ) : (
          <TextToBack onClick={() => handleGettingNovel({ onGoing: false, inGettingURL: false })}>
            이전으로
          </TextToBack>
        )}
      </NovelTitleContainer>

      {/* get a novel by getting its url */}
      {isGettingNovel.onGoing && isGettingNovel.inGettingURL && (
        <>
          <NovelUrlContnr>
            <SrchGuideText
              isHowTo
              onClick={() => {
                dispatch(openModal("getNovelURL"));
              }}
            >
              &nbsp;&nbsp;어떻게 주소를 찾나요?&nbsp;&nbsp;
            </SrchGuideText>
            <NovelUrl
              ref={novelUrlRef}
              placeholder="작품 주소를 넣어주세요"
              onChange={adjustHeightOfNovelUrlElement}
            />

            <SelectPlatform onClick={submitToAddNovel}>선택</SelectPlatform>
          </NovelUrlContnr>
          <AllPlatformContnr>
            <PlatformContnrFirst>
              <GuideText>공유링크 찾기</GuideText>
              <PlatformBtnContnr>
                {[
                  [
                    "시리즈",
                    "https://m.series.naver.com/search/search.series?t=novel&fs=default&q=",
                  ],
                  ["조아라", "https://www.joara.com/search"],
                ].map((_) => (
                  <PlatformBtn
                    selectedPlatform={platformToGetURL.withSharedLink}
                    platform={_[0]}
                    onClick={() => {
                      setIframeAddress(_[1]);
                      setPlatformToGetURL({ inNewTab: "", withSharedLink: _[0] });
                    }}
                  >
                    {_[0]}
                  </PlatformBtn>
                ))}
              </PlatformBtnContnr>
            </PlatformContnrFirst>
            <PlatformContnrSecond>
              <GuideText>주소 직접 찾기</GuideText>
              <PlatformBtnContnr isNewTab>
                {[
                  ["카카페", "https://page.kakao.com/search/result?keyword="],
                  ["리디북스", "https://ridibooks.com/search?q=&adult_exclude=n"],
                  ["시리즈", "https://series.naver.com/search/search.series?t=novel&fs=default&q="],
                  ["조아라", "https://www.joara.com/search"],
                ].map((_) => (
                  <PlatformNewTab href={_[1]} target="_blank">
                    <PlatformBtn
                      onClick={() => {
                        setPlatformToGetURL({ inNewTab: _[0], withSharedLink: "" });
                      }}
                      selectedPlatform={platformToGetURL.inNewTab}
                      platform={_[0]}
                    >
                      {_[0]}
                    </PlatformBtn>
                  </PlatformNewTab>
                ))}
              </PlatformBtnContnr>
            </PlatformContnrSecond>
          </AllPlatformContnr>

          <NoteContainer>
            <SrchGuideText
              onClick={() => {
                handleGettingNovel({ onGoing: true, inGettingURL: false });
                setIframeAddress(`${SEARCH_NOVEL}/iframe`);
                setPlatformToGetURL({ withSharedLink: "시리즈", inNewTab: "" }); // initialize
              }}
            >
              &nbsp;&nbsp;다시 노블타임에서 찾아보기&nbsp;&nbsp;
            </SrchGuideText>

            <SrchGuideText onClick={() => handleToolTip(true)}>유의사항</SrchGuideText>
            {isToolTipOpened && (
              <Note>
                * 성인 작품은 리뷰할 수 없습니다
                <br />
                * 조아라 작품은 작품 주소를 찾아와야 합니다
                <br />
                (작품 정보의 변동이 많아 미리 저장해두지 않습니다)
              </Note>
            )}
          </NoteContainer>
        </>
      )}

      {/* get a novel by searching for it or getting its url through iframe */}
      {isGettingNovel.onGoing && <Iframe ref={iframeRef} src={`${SEARCH_NOVEL}/iframe`} />}

      {/* write a review */}
      {!isGettingNovel.onGoing && (
        <>
          <BoardContainer>
            <Board category="FreeTalk" selected={board} onClick={() => setBoard("FreeTalk")}>
              FreeTalk
            </Board>
            <Board category="Recommend" selected={board} onClick={() => setBoard("Recommend")}>
              Recommend
            </Board>
          </BoardContainer>

          <WritingTitleContanr>
            <WritingTitle ref={titleRef} placeholder="글 제목을 입력하세요" onChange={writeTitle} />
          </WritingTitleContanr>
          {/* <ContentPlusCotnrPC>사진/간단텍스트설정/이모지</ContentPlusCotnrPC> */}

          <WritingContentContnr>
            <WritingContent
              ref={contentRef}
              placeholder="글 내용을 입력하세요"
              onChange={writeContent}
            />
          </WritingContentContnr>

          <SubmitBtnContnr>
            <SubmitBtnPC onClick={submitToAddWriting}>작성</SubmitBtnPC>
          </SubmitBtnContnr>

          {/* <ContentPlusContnrMobile>
            <ContentPlusAlignMobile>사진/간단텍스트설정/이모지</ContentPlusAlignMobile>
          </ContentPlusContnrMobile> */}
        </>
      )}
    </MainBG>
  );
}
