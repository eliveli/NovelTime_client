import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainBG from "components/MainBG";
import Icon from "assets/Icon";
import { matchPlatformName, useWhetherItIsDesktop } from "utils";
import { SEARCH_NOVEL } from "utils/pathname";
import { setSearchList } from "store/clientSlices/filterSlice";
import { useAppDispatch, useAppSelector } from "store/hooks";
import {
  useGetNovelsForLoginUserQuery,
  useGetPopularNovelsInNovelTimeQuery,
  useGetUserNovelListAtRandomQuery,
  useGetUserNovelListPeopleLikeQuery,
  useGetWeeklyNovelsFromPlatformQuery,
  useLazyGetUserNovelListAtRandomQuery,
} from "store/serverAPIs/novelTime";
import { CategoryMark } from "components/CategoryMark";
import { LoadNovelListBtn } from "views/Home/Home.styles";
import { FilterForWeeklyNovelsFromPlatform } from "views/Home";
import { SearchIconBox, IconContainer } from "./NovelList.styles";
import { ColumnList, ColumnDetailList, RowSlide } from "../../components/NovelListFrame";
import { NovelColumn, NovelColumnDetail, NovelRow } from "../../components/Novel";

export default function NovelList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const popularNovels = useGetPopularNovelsInNovelTimeQuery(5);

  // weekly novels from each platforms //
  const [platformFilter, setPlatformFilter] = useState("카카페"); // for clicking the platform tab
  const platformSelected = matchPlatformName(platformFilter); // for matching the name to request

  const weeklyNovels = useGetWeeklyNovelsFromPlatformQuery({
    platform: platformSelected,
    limitedNo: 5,
  });
  const weeklyNovelsFromPlatform = weeklyNovels.data && weeklyNovels.data[platformSelected];

  const novelListPeopleLike = useGetUserNovelListPeopleLikeQuery(4);

  const randomNovelList = useGetUserNovelListAtRandomQuery(4);
  // clicking the button to display other lists
  const [randomListTrigger, lazyRandomList] = useLazyGetUserNovelListAtRandomQuery();
  const userNovelListSelected = lazyRandomList?.data || randomNovelList?.data;

  const isLoginUser = !!useAppSelector((state) => state.user.loginUserInfo.userId);
  const novelsForLoginUser = useGetNovelsForLoginUserQuery(5, { skip: !isLoginUser });

  const isDeskTop = useWhetherItIsDesktop();

  return (
    <MainBG>
      <IconContainer>
        <SearchIconBox
          onClick={() => {
            if (isDeskTop) {
              navigate(`${SEARCH_NOVEL}?searchType=Title&searchWord=&pageNo=1`);
              return;
            }

            // initialize search filters
            dispatch(
              setSearchList({
                listType: "novel",
                list: "reset",
              }),
            );

            navigate(SEARCH_NOVEL);
          }}
        >
          <Icon.Search />
        </SearchIconBox>
      </IconContainer>

      <ColumnList
        isShowAllMark
        categoryText="popular novels in Novel Time"
        categoryId="popularNovelsInNovelTime"
      >
        {popularNovels.data?.map((novel) => (
          <NovelColumn key={novel.novelId} novel={novel} />
        ))}
      </ColumnList>

      <ColumnList
        isShowAllMark
        categoryText="weekly novels from each platform"
        categoryId="weeklyNovelsFromEachPlatform"
        categoryFilter={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <FilterForWeeklyNovelsFromPlatform
            platformFilter={platformFilter}
            setPlatformFilter={setPlatformFilter}
          />
        }
      >
        {weeklyNovelsFromPlatform?.map((novel) => (
          <NovelColumn key={novel.novelId} novel={novel} />
        ))}
      </ColumnList>
      <CategoryMark
        categoryText="user's novel list people like"
        categoryId="userNovelListPeopleLike"
        isShowAllMark
      />

      {novelListPeopleLike.data?.map((list) => (
        <RowSlide
          categoryId={list.listId}
          categoryText={list.listTitle}
          novelNO={list.novel.length}
          infoFromUserPage={{
            userName: list.userName,
            path: "novel-list/created",
            list: { isMainCategory: false, listId: list.listId },
          }}
          userMark={{ userImg: list.userImg, userName: list.userName }}
          isShowAllMark
        >
          {list.novel.map((_) => (
            <NovelRow key={_.novelId} novel={_} isNotSubInfo />
          ))}
        </RowSlide>
      ))}

      <CategoryMark categoryText="user's novel list">
        <LoadNovelListBtn onClick={() => randomListTrigger(4)}>
          다른 유저의 리스트 보기
        </LoadNovelListBtn>
      </CategoryMark>

      {userNovelListSelected?.map((list) => (
        <RowSlide
          categoryId={list.listId}
          categoryText={list.listTitle}
          novelNO={list.novel.length}
          infoFromUserPage={{
            userName: list.userName,
            path: "novel-list/created", // * change in this page and home later
            list: { isMainCategory: false, listId: list.listId },
          }}
          userMark={{ userImg: list.userImg, userName: list.userName }}
          isShowAllMark
        >
          {list.novel.map((_) => (
            <NovelRow key={_.novelId} novel={_} isNotSubInfo />
          ))}
        </RowSlide>
      ))}

      <ColumnDetailList
        isShowAllMark
        categoryText="novels for you"
        categoryId="novelsForLoginUser" // * hide this component when user didn't login
      >
        {novelsForLoginUser.data?.map((novel) => (
          <NovelColumnDetail key={novel.novelId} novel={novel} />
        ))}
      </ColumnDetailList>
    </MainBG>
  );
}
