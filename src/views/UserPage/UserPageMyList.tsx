import Icon from "assets/Icon";
import { CategoryMark } from "components/CategoryMark";
import MainBG from "components/MainBG";
import { NovelRow } from "components/Novel";
import { useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useComponentWidth, useComponentScrollWidth } from "utils";
import {
  ListTitleLimitHeight,
  ListTitleContnr,
  ListTitle,
  NovelListContnr,
  MoreBtnBox,
} from "./UserPage.styles";
// server request with listId

const novelList = {
  listInfo: {
    listId: "sddssss",
    listTitle: "0번째 list where is romance",
    userName: "asda",
    userImg: "",
  },
  otherList: [
    { listId: "ssdfsdfsdfdds", listTitle: "첫번째 list where is romance" },
    { listId: "sd00dfdssss", listTitle: "두번째 list where is romance" },
    // { listId: "sdssssdfds", listTitle: "세번쨔 list where is romance" },
    // { listId: "sd00aaadssss", listTitle: "list where is romance" },
    // { listId: "sdsdfds", listTitle: "list where is romance" },
    // { listId: "sd0wswr0dssss", listTitle: "list where is romance" },
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

export default function UserPageMyList() {
  const { userName } = useParams();

  // set list title
  const [currentList, selectList] = useState({
    listId: novelList.listInfo.listId,
    listTitle: novelList.listInfo.listTitle,
  });

  // show or not all the list title
  const [isListMore, setListMore] = useState(false);

  // if the list title container is over than title list width, show the MoreBtn.
  const containerWidthRef = useRef<HTMLDivElement>(null);
  const containerWidth = useComponentWidth(containerWidthRef);
  const titleListWidthRef = useRef<HTMLDivElement>(null);
  const titleListWidthShown = containerWidth - 35; // shown width
  // get scrollable width including overflowed hidden space
  const titleListWidthScrollable = useComponentScrollWidth(titleListWidthRef);

  return (
    <MainBG>
      <CategoryMark isShowAll categoryText="My Novel List" />
      <ListTitleLimitHeight isListMore={isListMore} ref={containerWidthRef}>
        <ListTitleContnr
          isListMore={isListMore}
          ref={titleListWidthRef}
          titleListWidthShown={titleListWidthShown}
        >
          {[
            { listId: novelList.listInfo.listId, listTitle: novelList.listInfo.listTitle },
            ...novelList.otherList,
          ].map((_) => (
            <ListTitle
              listId={_.listId}
              selectedListId={currentList.listId}
              onClick={() => {
                selectList(_);
                // server request with list id //
              }}
            >
              &nbsp;&nbsp;
              {_.listTitle}
              &nbsp;&nbsp;
            </ListTitle>
          ))}
        </ListTitleContnr>
        {titleListWidthShown < titleListWidthScrollable && (
          <MoreBtnBox
            size={28}
            onClick={() => {
              setListMore(!isListMore);
            }}
          >
            {isListMore ? <Icon.SmallUp /> : <Icon.SmallDown />}
          </MoreBtnBox>
        )}
      </ListTitleLimitHeight>

      <NovelListContnr>
        {novelList.novel.map((_) => (
          <NovelRow key={_.novelId} novel={_} isUserList />
        ))}
      </NovelListContnr>
    </MainBG>
  );
}
