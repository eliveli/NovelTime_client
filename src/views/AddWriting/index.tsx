/* eslint-disable max-len */
import MainBG from "components/MainBG";
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

  // search novel : when entering this page with clicking add-writing ---------------------------//

  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeSrch, showIframeSrch] = useState(true); // show or not iframe of search
  const [isPlatform, showPlatform] = useState(false); // show or not elements for novel platform to get novel info

  const [iframePlatform, markIfrmPlfm] = useState("시리즈"); // mark selected platform
  const [newTabPlatform, markTabPlfm] = useState(""); // mark selected platform

  const changePlatform = (platformSrch: string) => {
    if (!iframeRef.current) return;
    iframeRef.current.src = platformSrch;
  };

  // get novel info from iframe  // Called sometime after postMessage is called
  window.addEventListener(
    "message",
    (event) => {
      if (event.origin !== "http://localhost:3000") {
        return;
      }

      // get novel info from my website
      if (iframeRef.current && (event.data.novelId as string)) {
        console.log("outside iframe: ", event.data);
        setNovel({ novelId: event.data.novelId, novelTitle: event.data.novelTitle });
        showIframeSrch(false); // close iframe element
        // iframeRef.current.style.display = "none"; // don't show iframe element
      }

      // show component of novel platform to search novel info
      if (iframeRef.current && (event.data.sign as string)) {
        showPlatform(true);
        changePlatform("https://m.series.naver.com/search/search.series?t=novel&fs=default&q=");
      }
    },
    false,
  );

  // set novel url from novel platform to get novel info
  const novelUrlRef = useRef<HTMLTextAreaElement>(null);
  const [novelUrl, setNovelUrl] = useState("");

  // auto-set height of novelUrl element
  const putNovelUrl = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!novelUrlRef.current) return;

    setNovelUrl(e.target.value); // store content of novelUrl
    novelUrlRef.current.style.height = "28px"; // Default: height of 1 line
    const novelUrlHeight = novelUrlRef.current.scrollHeight; // current scroll height

    // max-height : 5 lines of 124px
    novelUrlRef.current.style.height = `${
      novelUrlHeight <= 124 ? novelUrlRef.current.scrollHeight : 124
    }px`;
  }, []);

  // close elements of iframe and something else, if novel info is set
  const closeIframe = () => {
    if (!novel.novelTitle) {
      // change this to modal
      alert("소설을 선택해 주세요");
      return;
    }
    showIframeSrch(false);
    showPlatform(false);
    markIfrmPlfm("시리즈"); // reset mark when closing the iframe
    markTabPlfm(""); // reset mark when closing the iframe
  };
  const sendNovelUrl = () => {
    // server request : send novel url, get response of novel id and novel title//
    // if it is success, show alarm modal like "소설 정보가 성공적으로 등록되었어요"
    // then set the novel info of novel id and novel title

    // close elements of iframe and something else
    closeIframe();
  };

  const showHowTo = () => {
    // show images that guide how to get link from novel platform
  };

  // -------------------------------------------------------------------------------------------//

  return (
    <MainBG>
      <NovelTitleContainer>
        <NovelTitle>{novel.novelTitle ? novel.novelTitle : "소설제목"}</NovelTitle>
        {!novelTitle && !isIframeSrch && (
          <Icon.IconBox>
            <Icon.Search onClick={() => showIframeSrch(true)} />
          </Icon.IconBox>
        )}
      </NovelTitleContainer>

      {/* search for novel from novel platform */}
      {!novelId && isIframeSrch && isPlatform && (
        <>
          <NovelUrlContnr>
            <NovelUrl
              ref={novelUrlRef}
              placeholder="작품별 공유링크(or URL)를 넣어주세요"
              onChange={putNovelUrl}
            />
            <SelectPlatform onClick={sendNovelUrl}>선택</SelectPlatform>
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
                    selectedPlatform={iframePlatform}
                    platform={_[0]}
                    onClick={() => {
                      changePlatform(_[1]);
                      markIfrmPlfm(_[0]);
                    }}
                  >
                    {_[0]}
                  </PlatformBtn>
                ))}
              </PlatformBtnContnr>
            </PlatformContnrFirst>
            <PlatformContnrSecond>
              <GuideText>작품 URL 찾기</GuideText>
              <PlatformBtnContnr isNewTab>
                {[
                  ["카카페", "https://page.kakao.com/search"],
                  ["리디북스", "https://ridibooks.com/search?q=&adult_exclude=n"],
                  ["시리즈", "https://series.naver.com/search/search.series?t=novel&fs=default&q="],
                  ["조아라", "https://www.joara.com/search"],
                ].map((_) => (
                  <PlatformNewTab href={_[1]} target="_blank">
                    <PlatformBtn
                      onClick={() => markTabPlfm(_[0])}
                      selectedPlatform={newTabPlatform}
                      platform={_[0]}
                    >
                      {_[0]}
                    </PlatformBtn>
                  </PlatformNewTab>
                ))}
              </PlatformBtnContnr>
            </PlatformContnrSecond>
          </AllPlatformContnr>
          <HowToGetLink>
            <SrchGuideText isHowTo onClick={showHowTo}>
              &nbsp;&nbsp;어떻게 하나요?(그냥 페이지 진입 직후 이미지 보여줄까?)&nbsp;&nbsp;
            </SrchGuideText>
            <MoreIconBox>
              <Icon.More />
            </MoreIconBox>
          </HowToGetLink>
          if you want to review the novel of JOARA, you should get the url or shared link for the
          novel. Because I don't scrape the free novel even if it is only a info not a content
          <SrchGuideText
            onClick={() => {
              changePlatform("/search/novel/iframe");
              showPlatform(false);
              markIfrmPlfm("시리즈"); // reset mark when closing the iframe
              markTabPlfm(""); // reset mark when closing the iframe
            }}
          >
            &nbsp;&nbsp;다시 노블타임에서 찾아보기&nbsp;&nbsp;
          </SrchGuideText>
        </>
      )}
      {/* search for novel with iframe */}
      {!novelId && isIframeSrch && <Iframe ref={iframeRef} src="/search/novel/iframe" />}

      {/* show this after setting false of isIframeSrch */}
      {/* or when entering here from novel detail page */}
      {(!isIframeSrch || novelTitle) && (
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
