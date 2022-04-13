import Icon from "assets/Icon";
import { CategoryMark } from "components/CategoryMark";
import MainBG from "components/MainBG";
import { NovelRow } from "components/Novel";
import { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useComponentWidth, useComponentScrollWidth, useComponentHeight } from "utils";
import {
  ContainerWidth,
  ListTitleLimitHeightContnr,
  ListTitleContnr,
  ListTitle,
  ListTitleNormalStyle,
  NovelListContnr,
  MoreBtnBox,
  MoreBtnBoxBG,
  MoreBtnParent,
} from "./UserPage.styles";
import contentMark from "./utils/contentMark";
// server request with listId

const novelList = {
  listInfo: {
    listId: "sddssss",
    listTitle: "0번째 list where is romance",
    userName: "asda",
    userImg: "",
  },
  otherList: [
    { listId: "ssdfsdfsdfdds", listTitle: "첫번째 list where is romance", userName: "asdaaa" },
    { listId: "sd00dfdssss", listTitle: "두번째 list where is romance", userName: "asdass" },
  ],
  novel: [
    {
      novelId: "20220225082010201",
      novelImg:
        "//dn-img-page.kakao.com/download/resource?kid=1Opki/hzmU0W8saq/pEkrur7BcK1FgYESJqDyXK", // 카카페
      novelTitle: "헌터와 매드 사이언티스트",
      novelAuthor: "델마르",
      novelGenre: "로판",
      novelIsEnd: "완결",
    },
    {
      novelId: "20220225082010201",
      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
      novelTitle: "헌터와 매드 사이언티스트",
      novelAuthor: "델마르",
      novelGenre: "로판",
      novelIsEnd: "완결",
    },
    {
      novelId: "20220225082010201",
      novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
      novelTitle: "헌터와 매드 사이언티스트",
      novelAuthor: "델마르",
      novelGenre: "로판",
      novelIsEnd: "완결",
    },
    {
      novelId: "20220225082010201",
      novelImg:
        "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
      novelTitle: "헌터와 매드 사이언티스트",
      novelAuthor: "델마르",
      novelGenre: "로판",
      novelIsEnd: "완결",
    },
    {
      novelId: "20220225082010201",
      novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
      novelTitle: "헌터와 매드 사이언티스트",
      novelAuthor: "델마르",
      novelGenre: "로판",
      novelIsEnd: "완결",
    },
    {
      novelId: "20220225082010201",
      novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
      novelTitle: "헌터와 매드 사이언티스트",
      novelAuthor: "델마르",
      novelGenre: "로판",
      novelIsEnd: "완결",
    },
    {
      novelId: "20220225082010201",
      novelImg: "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
      novelTitle: "헌터와 매드 사이언티스트",
      novelAuthor: "델마르",
      novelGenre: "로판",
      novelIsEnd: "완결",
    },
  ],
};

export default function UserPageNovelList({ isMyList }: { isMyList: boolean }) {
  //   const { userName } = useParams();
  const userName = "나나나" as string; // later remove this and cancel the comment mark above
  const loginUserName = "나나" as string; // later change it to real login user name

  // get the content page mark
  const contentPageMark = contentMark(userName, loginUserName, isMyList, false);

  // set list title
  const [currentList, selectList] = useState({
    listId: novelList.listInfo.listId,
    listTitle: novelList.listInfo.listTitle,
    userName: novelList.listInfo.userName,
  });

  // maintain previous title list : do not rerender every time getting novel list from server
  // when a user click a title that doesn't exist on server,
  //      show user alarm modal,
  //      and reset the title list that is new from server
  //     --------  I will do this work later    ---------     //
  //
  //        note : I get the title list always when clicking a title,
  //               but I don't use it except for case above.

  // initial title list getting from server at first
  const novelTitleList = useRef([
    {
      listId: novelList.listInfo.listId,
      listTitle: novelList.listInfo.listTitle,
      userName: novelList.listInfo.userName,
    },
    ...novelList.otherList,
  ]);

  // show or not all the list title
  const [isListMore, setListMore] = useState(false);

  // if the list title container is over than title list width, show the MoreBtn. //
  // - get shown width of title container
  const containerWidthRef = useRef<HTMLDivElement>(null);
  const containerWidth = useComponentWidth(containerWidthRef, isListMore);
  const limitContnrWidth = containerWidth - 35; // shown width
  // - get scrollable width including overflowed hidden space
  const titleListRef = useRef<HTMLDivElement>(null);
  const titleListWidthScrollable = useComponentScrollWidth(titleListRef, isListMore);

  // get title list height to show or not more button when isListMore is true //
  // - if titleListHeight is not longer than the height 32px that is 1 line of ListTitleContnr,
  // - then don't show the button even if isListMore is true
  const titleListHeight = useComponentHeight(titleListRef, isListMore);

  // to scroll to (0,0) when clicking the title
  const limitContainerRef = useRef<HTMLDivElement>(null);
  return (
    <MainBG>
      <CategoryMark isShowAll categoryText={contentPageMark} />
      {/* more button to show or not all the title list */}
      {/* when isListMore is true, always : limitContnrWidth === titleListWidthScrollable
          so the following should be divided two, not put together in one expression.
      */}
      <ContainerWidth ref={containerWidthRef} />
      {isListMore && titleListHeight > 32 && (
        <MoreBtnParent>
          <MoreBtnBoxBG>
            <MoreBtnBox
              size={28}
              onClick={() => {
                setListMore(!isListMore);
              }}
            >
              <Icon.SmallUp />
            </MoreBtnBox>
          </MoreBtnBoxBG>
        </MoreBtnParent>
      )}
      {!isListMore && limitContnrWidth < titleListWidthScrollable && (
        <MoreBtnParent>
          <MoreBtnBoxBG>
            <MoreBtnBox
              size={28}
              onClick={() => {
                setListMore(!isListMore);
              }}
            >
              <Icon.SmallDown />
            </MoreBtnBox>
          </MoreBtnBoxBG>
        </MoreBtnParent>
      )}
      {/* title list container */}
      <ListTitleLimitHeightContnr
        ref={limitContainerRef}
        limitContnrWidth={limitContnrWidth}
        isListMore={isListMore}
      >
        <ListTitleContnr
          limitContnrWidth={limitContnrWidth}
          isListMore={isListMore}
          ref={titleListRef}
        >
          {novelTitleList.current.map((_) => (
            <ListTitle
              key={_.listId}
              listId={_.listId}
              selectedListId={currentList.listId}
              onClick={() => {
                // server request with list id //
                selectList(_);
                // if the list of title doesn't exist on server,
                // set the state to first element of the title list

                limitContainerRef.current?.scroll(0, 0);
                // scroll to (0,0) to show the selected title arranged first in the title container
              }}
            >
              &nbsp;&nbsp;
              {isMyList ? (
                _.listTitle
              ) : (
                <>
                  {_.userName} <ListTitleNormalStyle>의 리스트 : </ListTitleNormalStyle>
                  {_.listTitle}
                </>
              )}
              &nbsp;&nbsp;
            </ListTitle>
          ))}
        </ListTitleContnr>
      </ListTitleLimitHeightContnr>

      <NovelListContnr>
        {novelList.novel.map((_) => (
          <NovelRow key={_.novelId} novel={_} isWidth100 isNotSubInfo />
        ))}
      </NovelListContnr>
    </MainBG>
  );
}
