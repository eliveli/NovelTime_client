import { useParams } from "react-router-dom";
import MainBG from "components/MainBG";
import { useState } from "react";
import { FilterForWeeklyNovelsFromPlatform } from "views/Home";
import { matchPlatformName } from "utils";
import {
  useGetNovelsForLoginUserQuery,
  useGetPopularNovelsInNovelTimeQuery,
  useGetUserNovelListPeopleLikeQuery,
  useGetWeeklyNovelsFromPlatformQuery,
} from "store/serverAPIs/novelTime";
import { useAppSelector } from "store/hooks";
import { CategoryMark } from "components/CategoryMark";
import { Note } from "views/NovelList/NovelList.styles";
import { WritingSection } from "views/UserPage/UserPage.styles";
import NovelColumnSkeleton from "components/Novel/NovelColumnSkeleton";
import UserNovelList from "views/UserPage/UserNovelListSummary.components";
import Icon from "assets/Icon";
import theme from "assets/styles/theme";
import { NovelColumnDetail } from "../../components/Novel";

export default function NovelListByCategory() {
  const { categoryId } = useParams();

  const popularNovels = useGetPopularNovelsInNovelTimeQuery(20, {
    skip: categoryId !== "popularNovels",
  });

  // weekly novels from each platforms //
  const [platformFilter, setPlatformFilter] = useState("카카페"); // for clicking the platform tab
  const platformSelected = matchPlatformName(platformFilter); // for matching the name to request

  const weeklyNovels = useGetWeeklyNovelsFromPlatformQuery(
    {
      platform: platformSelected,
      limitedNo: 20,
    },
    {
      skip: categoryId !== "weeklyNovels",
    },
  );
  const weeklyNovelsFromPlatform = weeklyNovels.data && weeklyNovels.data[platformSelected];

  const novelListPeopleLike = useGetUserNovelListPeopleLikeQuery(
    {
      limitedNo: 20,
      isWithListSummaryCard: String(true),
    },
    { skip: categoryId !== "listLiked" },
  );

  const loginUserName = useAppSelector((state) => state.user.loginUserInfo.userName);
  const novelsForLoginUser = useGetNovelsForLoginUserQuery(20, {
    skip: categoryId !== "novelsForYou",
  });

  type Category = "popularNovels" | "weeklyNovels" | "listLiked" | "novelsForYou";

  const category = {
    popularNovels: "popular novels in Novel Time",
    weeklyNovels: "weekly novels from each platform",
    listLiked: "user's novel list people like",
    novelsForYou: "novels for you",
  };

  const [isToolTipOpened, handleToolTip] = useState(false);

  return (
    <MainBG
      onClick={() => {
        if (isToolTipOpened) {
          handleToolTip(false);
        }
      }}
    >
      <CategoryMark categoryText={category[String(categoryId) as Category]}>
        {categoryId === "novelsForYou" && (
          <Icon.IconBox
            color={theme.color.mainLight}
            size={22}
            styles="margin: 0 0 2px 5px;"
            onClick={() => handleToolTip(true)}
          >
            <Icon.QuestionMark />
          </Icon.IconBox>
        )}

        {isToolTipOpened && (
          <Note>
            {loginUserName || "방문자"}
            님이 글을 남긴 소설을 기준으로 다른 독자가 본 소설을 추천해 드려요
          </Note>
        )}
      </CategoryMark>

      {categoryId === "popularNovels" &&
        popularNovels.data?.map((novel) => <NovelColumnDetail key={novel.novelId} novel={novel} />)}

      {categoryId === "weeklyNovels" && (
        <>
          <FilterForWeeklyNovelsFromPlatform
            platformFilter={platformFilter}
            setPlatformFilter={setPlatformFilter}
          />

          {weeklyNovelsFromPlatform?.map((novel) => (
            <NovelColumnDetail key={novel.novelId} novel={novel} />
          ))}
        </>
      )}

      {categoryId === "listLiked" && (
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
      )}

      {categoryId === "novelsForYou" &&
        (novelsForLoginUser.data?.length ? (
          novelsForLoginUser.data.map((novel) => (
            <NovelColumnDetail key={novel.novelId} novel={novel} />
          ))
        ) : (
          <NovelColumnSkeleton
            text={`아직 ${loginUserName || "방문자"}님이 남긴 글이 없어 추천이 어려워요`}
          />
        ))}
    </MainBG>
  );
}
