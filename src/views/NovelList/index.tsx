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
  useGetUserNovelListAtRandomInNovelMainQuery,
  useGetUserNovelListPeopleLikeQuery,
  useGetWeeklyNovelsFromPlatformQuery,
  useLazyGetUserNovelListAtRandomInNovelMainQuery,
} from "store/serverAPIs/novelTime";
import { CategoryMark } from "components/CategoryMark";
import { LoadNovelListBtn } from "views/Home/Home.styles";
import { FilterForWeeklyNovelsFromPlatform } from "views/Home";
import { WritingSection } from "views/UserPage/UserPage.styles";
import UserNovelList from "views/UserPage/UserNovelListSummary.components";
import { RowSlideSimple } from "components/NovelListFrame/RowSlide";
import { SearchIconBox, IconContainer, Space } from "./NovelList.styles";
import { NovelColumn, NovelColumnDetail, NovelRow } from "../../components/Novel";

export default function NovelList() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const popularNovels = useGetPopularNovelsInNovelTimeQuery(4);

  // weekly novels from each platforms //
  const [platformFilter, setPlatformFilter] = useState("카카페"); // for clicking the platform tab
  const platformSelected = matchPlatformName(platformFilter); // for matching the name to request

  const weeklyNovels = useGetWeeklyNovelsFromPlatformQuery({
    platform: platformSelected,
    limitedNo: 10,
  });
  const weeklyNovelsFromPlatform = weeklyNovels.data && weeklyNovels.data[platformSelected];

  const novelListPeopleLike = useGetUserNovelListPeopleLikeQuery({
    limitedNo: 4,
    isWithListSummaryCard: String(true),
  });

  const randomNovelList = useGetUserNovelListAtRandomInNovelMainQuery(4);
  // clicking the button to display other lists
  const [randomListTrigger, lazyRandomList] = useLazyGetUserNovelListAtRandomInNovelMainQuery();
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

      <CategoryMark
        categoryText="popular novels in Novel Time"
        categoryId="popularNovelsInNovelTime"
      >
        <LoadNovelListBtn onClick={() => {}}>모두 보기</LoadNovelListBtn>
      </CategoryMark>

      <Space height={12} />

      <WritingSection isNoContent={false}>
        {popularNovels.data?.map((novel) => (
          <NovelColumn key={novel.novelId} novel={novel} isBorder />
        ))}
      </WritingSection>

      <Space height={9} />

      <CategoryMark
        categoryText="weekly novels from each platform"
        categoryId="weeklyNovelsFromEachPlatform"
      >
        <LoadNovelListBtn onClick={() => {}}>모두 보기</LoadNovelListBtn>
      </CategoryMark>

      <FilterForWeeklyNovelsFromPlatform
        platformFilter={platformFilter}
        setPlatformFilter={setPlatformFilter}
      />

      {weeklyNovelsFromPlatform && (
        <RowSlideSimple novelNO={weeklyNovelsFromPlatform.length}>
          {weeklyNovelsFromPlatform.map((novel) => (
            <NovelRow key={novel.novelId} novel={novel} />
          ))}
        </RowSlideSimple>
      )}

      <Space />

      <CategoryMark
        categoryText="user's novel list people like"
        categoryId="userNovelListPeopleLike"
      >
        <LoadNovelListBtn onClick={() => {}}>모두 보기</LoadNovelListBtn>
      </CategoryMark>

      <WritingSection isNoContent={false} isForListAll>
        {novelListPeopleLike.data?.map((_) => (
          <UserNovelList key={_.listId} novelList={_} isCreated={false} />
        ))}
      </WritingSection>

      <Space height={9} />

      <CategoryMark categoryText="user's novel list">
        <LoadNovelListBtn onClick={() => randomListTrigger(4)}>
          다른 유저의 리스트 보기
        </LoadNovelListBtn>
      </CategoryMark>

      <WritingSection isNoContent={false} isForListAll>
        {userNovelListSelected?.map((_) => (
          <UserNovelList key={_.listId} novelList={_} isCreated={false} />
        ))}
      </WritingSection>

      <Space height={9} />

      <CategoryMark categoryText="novels for you" categoryId="novelsForLoginUser">
        <LoadNovelListBtn onClick={() => {}}>모두 보기</LoadNovelListBtn>
      </CategoryMark>

      {novelsForLoginUser.data?.map((novel) => (
        <NovelColumnDetail key={novel.novelId} novel={novel} />
      ))}
    </MainBG>
  );
}
