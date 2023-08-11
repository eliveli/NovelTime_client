/* eslint-disable max-len */
import MainBG from "components/MainBG";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Icon from "assets/Icon";
import { SEARCH_NOVEL } from "utils/pathname";
import { setSearchList } from "store/clientSlices/filterSlice";
import { useAddNovelWithURLMutation } from "store/serverAPIs/novelTime";
import Spinner from "assets/Spinner";
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

  const [addNovel, addNovelResult] = useAddNovelWithURLMutation();

  // set novel from params when entering from novel detail page
  const { novelId, novelTitle } = useParams();
  const [novel, setNovel] = useState({ novelId, novelTitle });

  // search novel when entering as clicking add-writing
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isIframeSrch, showIframeSrch] = useState(true); // show or not iframe of search
  const [isPlatform, showPlatform] = useState(false); // show or not elements for novel platform to get novel info

  const [iframePlatform, markIfrmPlfm] = useState("시리즈"); // mark selected platform
  const [newTabPlatform, markTabPlfm] = useState(""); // mark selected platform

  const changePlatform = (platformSrch: string) => {
    if (!iframeRef.current) return;
    iframeRef.current.src = platformSrch;
  };

  // get novel info passed from iframe  // Called whenever postMessage is called
  window.addEventListener(
    "message",
    (event) => {
      if (event.origin !== "http://domainfordev.com") {
        return;
      }

      // get novel info from my website
      if (iframeRef.current && (event.data.novelId as string)) {
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

    if (addNovelResult.isLoading) return;

    await addNovel(novelUrlRef.current.value);

    if (addNovelResult.isError) {
      alert("작품 url을 확인해 주세요");
    }
  };

  useEffect(() => {
    if (!addNovelResult.data) return;
    if (!addNovelResult.data.novelId || !addNovelResult.data.novelTitle) {
      alert("작품 url을 확인해 주세요");
      return;
    }

    setNovel({
      novelId: addNovelResult.data.novelId,
      novelTitle: addNovelResult.data.novelTitle,
    });

    // close iframe and initialize related things
    showIframeSrch(false);
    showPlatform(false);
    markIfrmPlfm("시리즈");
    markTabPlfm("");
  }, [addNovelResult.data]);

  const showHowTo = () => {
    // show images that guide to get the link from novel platform
  };

  // initialize search filters when searching for novel with iframe
  useEffect(() => {
    if (!novelId && isIframeSrch) {
      dispatch(
        setSearchList({
          listType: "novel",
          list: "reset",
        }),
      );
    }
  }, [novelId, isIframeSrch]);

  return (
    <MainBG>
      {addNovelResult.isLoading && <Spinner styles="fixed" />}

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
              placeholder="작품 URL을 넣어주세요"
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
              <GuideText>플랫폼에서 찾아오기</GuideText>
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
          **성인작품은 가져올 수 없어요** if you want to review the novel of JOARA, you should get
          the url or shared link for the novel. Because I don't scrape the free novel even if it is
          only a info not a content
          <SrchGuideText
            onClick={() => {
              changePlatform(SEARCH_NOVEL);
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
      {/* use infinite scroll without search params */}
      {!novelId && isIframeSrch && <Iframe ref={iframeRef} src={`${SEARCH_NOVEL}/iframe`} />}

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
