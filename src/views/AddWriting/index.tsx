/* eslint-disable max-len */
import MainBG from "components/MainBG";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "assets/Icon";
import { SEARCH_NOVEL } from "utils/pathname";
import { setSearchList } from "store/clientSlices/filterSlice";
import { useAddNovelWithURLMutation } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
import { openModal } from "store/clientSlices/modalSlice";
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
  HowToGetLink,
  MoreIconBox,
  TextToBack,
  Note,
  NoteContainer,
} from "./AddWriting.styles";

export default function AddWriting() {
  // server request for submit----------------------------
  const handleSubmit = () => {
    // server request : submit writing info //
    // - novelId, boardCategory, writingTitle, writingContent, userId(or userName), etc... //
  };
  // for mobile and tablet : when clicked submit button at the top navigation
  const dispatch = useAppDispatch();
  const isWritingSubmit = useAppSelector((state) => state.writing.isWritingSubmit);
  if (isWritingSubmit) {
    handleSubmit();
    dispatch(handleWritingSubmit(false)); // reset writing-submit state
  }
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

  const [addNovelWithURL, addNovelWithURLResult] = useAddNovelWithURLMutation();

  // set novel from params when entering from novel detail page
  const { novelId, novelTitle } = useParams();
  const [novelForReview, setNovelForReview] = useState({ novelId, novelTitle });

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
      alert("작품 url을 넣어주세요");
      return;
    }

    if (addNovelWithURLResult.isLoading) return;

    await addNovelWithURL(novelUrlRef.current.value);

    if (addNovelWithURLResult.isError) {
      alert("작품 url을 확인해 주세요");
    }
  };

  useEffect(() => {
    if (!addNovelWithURLResult.data) return;
    if (!addNovelWithURLResult.data.novelId || !addNovelWithURLResult.data.novelTitle) {
      alert("작품 url을 확인해 주세요");
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

  return (
    <MainBG
      onClick={() => {
        if (isToolTipOpened) {
          handleToolTip(false);
        }
      }}
    >
      {addNovelWithURLResult.isLoading && <Spinner styles="fixed" />}

      <NovelTitleContainer>
        <NovelTitle>
          {(!isGettingNovel.onGoing && novelForReview.novelTitle) || "소설제목"}
        </NovelTitle>

        {!isGettingNovel.onGoing ? (
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

      {/* get a novel by searching or getting its url through iframe */}
      {isGettingNovel.onGoing && <Iframe ref={iframeRef} src={`${SEARCH_NOVEL}/iframe`} />}

      {/* write a review */}
      {!isGettingNovel.onGoing && (
        <>
          <BoardContainer>
            <Board
              category="FreeTalk"
              selected={board as Board}
              onClick={() => setBoard("FreeTalk")}
            >
              FreeTalk
            </Board>
            <Board
              category="Recommend"
              selected={board as Board}
              onClick={() => setBoard("Recommend")}
            >
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
        </>
      )}
    </MainBG>
  );
}
