import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainBG from "components/MainBG";
import Icon from "assets/Icon";
import { matchPlatformName, useWhetherItIsDesktop } from "utils";
import { NOVEL_LIST, SEARCH_NOVEL } from "utils/pathname";
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
import { BtnToLoadContent } from "views/Home/Home.styles";
import { FilterForWeeklyNovelsFromPlatform } from "views/Home";
import { WritingSection } from "views/UserPage/UserPage.styles";
import UserNovelList from "views/UserPage/UserNovelListSummary.components";
import { RowSlideSimple } from "components/NovelListFrame/RowSlide";
import NovelColumnSkeleton from "components/Novel/NovelColumnSkeleton";
import theme from "assets/styles/theme";
import Spinner from "assets/Spinner";
import { SearchIconBox, IconContainer, Space, Note } from "./NovelList.styles";
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

  const loginUserName = useAppSelector((state) => state.loginUser.user.userName);
  const novelsForLoginUser = useGetNovelsForLoginUserQuery(4, { skip: !loginUserName });

  const category = {
    popularNovels: "popular novels in Novel Time",
    weeklyNovels: "weekly novels from each platform",
    listLiked: "user's novel list people like",
    randomList: "user's random novel list",
    novelsForYou: "novels for you",
  };

  const [isToolTipOpened, handleToolTip] = useState(false);

  const isDeskTop = useWhetherItIsDesktop();

  return (
    <MainBG
      isMarginBottom
      onClick={() => {
        if (isToolTipOpened) {
          handleToolTip(false);
        }
      }}
    >
      {(popularNovels.isFetching ||
        weeklyNovels.isFetching ||
        novelListPeopleLike.isFetching ||
        randomNovelList.isFetching ||
        lazyRandomList.isFetching ||
        novelsForLoginUser.isFetching) && <Spinner styles="fixed" />}

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

      <CategoryMark categoryText={category.popularNovels} categoryId="popularNovels">
        <BtnToLoadContent onClick={() => navigate(`${NOVEL_LIST}/popularNovels`)}>
          모두 보기
        </BtnToLoadContent>
      </CategoryMark>

      <Space height={12} />

      <WritingSection isNoContent={false}>
        {popularNovels.data?.map((novel) => (
          <NovelColumn key={novel.novelId} novel={novel} isBorder />
        ))}
      </WritingSection>

      <Space height={9} />

      <CategoryMark categoryText={category.weeklyNovels} categoryId="weeklyNovels">
        <BtnToLoadContent onClick={() => navigate(`${NOVEL_LIST}/weeklyNovels`)}>
          모두 보기
        </BtnToLoadContent>
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

      <CategoryMark categoryText={category.listLiked} categoryId="listLiked">
        <BtnToLoadContent onClick={() => navigate(`${NOVEL_LIST}/listLiked`)}>
          모두 보기
        </BtnToLoadContent>
      </CategoryMark>

      <WritingSection isNoContent={false} isForListAll>
        {novelListPeopleLike.data?.map((_) => (
          <UserNovelList
            key={_.listId}
            userNameFromNovelMain={_.userName}
            novelList={_}
            isCreated
          />
        ))}
      </WritingSection>

      <Space height={9} />

      <CategoryMark categoryText={category.randomList}>
        <BtnToLoadContent onClick={() => randomListTrigger(4)}>
          다른 유저의 리스트 보기
        </BtnToLoadContent>
      </CategoryMark>

      <WritingSection isNoContent={false} isForListAll>
        {userNovelListSelected?.map((_) => (
          <UserNovelList
            key={_.listId}
            userNameFromNovelMain={_.userName}
            novelList={_}
            isCreated
          />
        ))}
      </WritingSection>

      <Space height={9} />

      <CategoryMark categoryText={category.novelsForYou} categoryId="novelsForYou">
        {!!novelsForLoginUser.data?.length && (
          <BtnToLoadContent onClick={() => navigate(`${NOVEL_LIST}/novelsForYou`)}>
            모두 보기
          </BtnToLoadContent>
        )}

        <Icon.IconBox
          color={theme.color.mainLight}
          size={22}
          styles="margin: 0 0 2px 5px;"
          onClick={() => handleToolTip(true)}
        >
          <Icon.QuestionMark />
        </Icon.IconBox>
        {isToolTipOpened && (
          <Note isWithShowAllBtn={!!novelsForLoginUser.data?.length}>
            {loginUserName || "방문자"}
            님이 글을 남긴 소설을 기준으로 추천해 드려요
          </Note>
        )}
      </CategoryMark>

      {novelsForLoginUser.data?.length ? (
        novelsForLoginUser.data.map((novel) => (
          <NovelColumnDetail key={novel.novelId} novel={novel} />
        ))
      ) : (
        <NovelColumnSkeleton
          text={`아직 ${loginUserName || "방문자"}님이 남긴 글이 없어 추천이 어려워요`}
        />
      )}
    </MainBG>
  );
}
