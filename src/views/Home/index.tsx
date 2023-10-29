import Icon from "assets/Icon";
import Spinner from "assets/Spinner";
import { CategoryMark } from "components/CategoryMark";
import MainBG from "components/MainBG";
import { NovelRow } from "components/Novel";
import { RowSlide } from "components/NovelListFrame";
import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetHomeDataQuery,
  useGetUserNovelListAtRandomInHomeQuery,
  useLazyGetUserNovelListAtRandomInHomeQuery,
  useGetWeeklyNovelsFromPlatformQuery,
} from "store/serverAPIs/novelTime";
import { Img } from "store/serverAPIs/types";
import { goToUserPage, matchPlatformName, useComponentWidth, useWhetherItIsMobile } from "utils";
import FreeTalk from "views/FreeTalkList/FreeTalkList.components";
import Recommend from "views/RecommendList/RecommendList.components";
import { RowSlideSimple } from "components/NovelListFrame/RowSlide";
import { NOVEL_LIST } from "utils/pathname";
import { Filter, FilterContnr } from "views/UserPage/UserPage.styles";
import {
  UserAct,
  UserContnr,
  UserImg,
  UserInfo,
  UserName,
  UserRankCntnr,
  UserRankNO,
  SectionTitle,
  SectionMark,
  RankSectionContnr,
  IconContainer,
  IconNO,
  AllArrowContnr,
  ArrowContnr,
  TitleNormalStyle,
  TitleEmphasis,
  BtnToLoadContent,
  AddSpace,
} from "./Home.styles";

export function FilterForWeeklyNovelsFromPlatform({
  platformFilter,
  setPlatformFilter,
}: {
  platformFilter: string;
  setPlatformFilter: React.Dispatch<React.SetStateAction<string>>;
}) {
  // category for platform novel list
  const categoryArray = ["카카페", "시리즈", "리디북스", "조아라"];

  return (
    <FilterContnr category="novelPlatform">
      {categoryArray.map((_) => (
        <Filter
          category={_}
          selectedCtgr={platformFilter}
          onClick={() => {
            setPlatformFilter(_);
          }}
        >
          {_}
        </Filter>
      ))}
    </FilterContnr>
  );
}
interface RankUserProps {
  category: {
    main: Category;
    sub: string;
  };
  info: {
    userImg: Img;
    userName: string;
    count: number;
  };
  idx: number;
}

function CategoryIcon({ mainCtgr, subCtgr }: { mainCtgr: Category; subCtgr: string }) {
  if (subCtgr === "좋아요") return <Icon.SmallHeart />;

  if (mainCtgr === "소설 리스트") return <Icon.NovelList />;

  if (subCtgr === "작성글") return <Icon.Write />;

  if (subCtgr === "작성댓글") return <Icon.Comment />;

  throw Error("정해진 카테고리가 아니에요");
}

function RankUser({ category, info, idx }: RankUserProps) {
  const { userImg, userName, count } = info;

  const navigate = useNavigate();

  return (
    <UserContnr onClick={(e) => goToUserPage(navigate, e, userName)}>
      <UserImg userImg={userImg} />
      <UserInfo>
        <UserAct>
          <IconContainer>
            <Icon.IconBox noPointer size={17}>
              <CategoryIcon mainCtgr={category.main} subCtgr={category.sub} />
            </Icon.IconBox>
            <IconNO>{count}</IconNO>
          </IconContainer>
        </UserAct>

        <UserName>{userName}</UserName>
      </UserInfo>

      <UserRankNO>{idx + 1}</UserRankNO>
    </UserContnr>
  );
}
type UserRanks = {
  userImg: Img;
  userName: string;
  count: number;
}[];

type Category = "소설 한담" | "소설 추천" | "소설 리스트";

type RankList = {
  talk?: UserRanks;
  comment?: UserRanks;
  recommend?: UserRanks;
  novelList?: UserRanks;
  likeReceived?: UserRanks;
};
interface UserRankSectionProps {
  category: Category;
  rankList: RankList;
}

function setSubCategories(category: Category) {
  if (category === "소설 한담") return ["작성글", "작성댓글", "좋아요"];
  if (category === "소설 추천") return ["작성글", "좋아요"];
  if (category === "소설 리스트") return ["작성리스트", "좋아요"];
  throw Error("정해진 카테고리가 아니에요");
}

function setUserRanks(category: Category, rankFilter: string, rankList: RankList) {
  if (rankFilter === "좋아요") return rankList.likeReceived;

  if (category === "소설 리스트") return rankList.novelList;

  if (category === "소설 추천") return rankList.recommend;

  if (category === "소설 한담" && rankFilter === "작성글") return rankList.talk;

  if (category === "소설 한담" && rankFilter === "작성댓글") return rankList.comment;

  throw Error("정해진 카테고리가 아니에요");
}

function UserRankSection({ category, rankList }: UserRankSectionProps) {
  const subCategories = setSubCategories(category);

  const [rankFilter, setRankFilter] = useState(subCategories[0]);

  const userRanks = setUserRanks(category, rankFilter, rankList);

  const contnrRef = useRef<HTMLDivElement>(null);
  const contnrWidth = useComponentWidth(contnrRef);
  const rankContnrWidth = contnrWidth - 32;

  const rankContnrRef = useRef<HTMLDivElement>(null);

  // when clicking arrow, scroll user ranks
  const scrollRank = (isLeft: boolean) => {
    if (rankContnrRef.current && isLeft) {
      rankContnrRef.current.scrollTo({
        top: 0,
        left: rankContnrRef.current.scrollLeft - rankContnrWidth,
        behavior: "smooth",
      });
    }
    if (rankContnrRef.current && !isLeft) {
      rankContnrRef.current.scrollTo({
        top: 0,
        left: rankContnrRef.current.scrollLeft + rankContnrWidth,
        behavior: "smooth",
      });
    }
  };

  const isMobile = useWhetherItIsMobile();

  return (
    <RankSectionContnr ref={contnrRef}>
      <SectionMark>
        <SectionTitle>
          <TitleNormalStyle>{`${category} - `}</TitleNormalStyle>
          <TitleEmphasis>유저 활동</TitleEmphasis>
        </SectionTitle>
        <FilterContnr category="contentInHome">
          {subCategories.map((_) => (
            <Filter
              category={_}
              selectedCtgr={rankFilter}
              onClick={() => {
                setRankFilter(_);
                rankContnrRef.current?.scrollTo(0, 0); // reset scroll value
              }}
            >
              {_}
            </Filter>
          ))}

          {!isMobile && (
            <AllArrowContnr>
              <ArrowContnr size={24} onClick={() => scrollRank(true)}>
                <Icon.SmallLeft />
              </ArrowContnr>
              <ArrowContnr size={24} onClick={() => scrollRank(false)}>
                <Icon.SmallRight />
              </ArrowContnr>
            </AllArrowContnr>
          )}
        </FilterContnr>
      </SectionMark>
      <UserRankCntnr rankContnrWidth={rankContnrWidth} ref={rankContnrRef}>
        {userRanks?.map((_, idx) => (
          <RankUser
            category={{ main: category, sub: rankFilter }}
            info={_}
            idx={idx}
            key={_.userName}
          />
        ))}
      </UserRankCntnr>
    </RankSectionContnr>
  );
}
export default function Home() {
  const homeResult = useGetHomeDataQuery(undefined);

  // userNovelListResult //
  // 1. default value
  const userNovelListResult = useGetUserNovelListAtRandomInHomeQuery(2);
  // 2. when clicking the button "다른 유저의 리스트 보기" below
  const [userNovelListTrigger, lazyUserNovelListResult] =
    useLazyGetUserNovelListAtRandomInHomeQuery();
  // => 2 or 1
  const userNovelListSelected = lazyUserNovelListResult?.data || userNovelListResult?.data;

  // weekly novels from each platforms //
  const [platformFilter, setPlatformFilter] = useState("카카페"); // for clicking the platform tab

  const platformSelected = matchPlatformName(platformFilter); // for matching the name to request

  const weeklyNovelsResult = useGetWeeklyNovelsFromPlatformQuery({
    platform: platformSelected,
    limitedNo: 10,
  });
  // use cached data when requesting novels for each platforms
  // 10 novels displayed in home page. 20 in its list page

  const weeklyNovelsFromPlatform =
    weeklyNovelsResult.data && weeklyNovelsResult.data[platformSelected];

  // for popular novels in novel time and weekly novels from each platforms //
  // display 10 novels in home page
  // and 20 in each novel list page after clicking show-all button

  // "전체보기" 클릭 in popular novels and weekly novels //
  // - 특정 카테고리 아이디를 url param에 넣어 리스트 페이지로 이동
  //  : i.e. categoryId ("weeklyNovelsFromPlatform"),
  // - 이동한 리스트 페이지에서는 desc 포함 여러 정보를 요청해야 함

  const category = {
    popularNovels: "popular novels in Novel Time",
    weeklyNovels: "weekly novels from each platform",
    randomList: "user's random novel list",
  };

  const navigate = useNavigate();
  return (
    <MainBG isMarginBottom>
      {homeResult.isFetching && <Spinner styles="fixed" />}

      <CategoryMark categoryText="소설 한담 new" path="talk-list" />
      {homeResult.data?.talkList?.map((talk, idx) => (
        <FreeTalk talk={talk} isLast={idx + 1 === homeResult.data?.talkList.length} />
      ))}

      {homeResult.data?.talkUserRank && (
        <UserRankSection category="소설 한담" rankList={homeResult.data.talkUserRank} />
      )}

      <CategoryMark categoryText="소설 추천 new" path="recommend-list" />
      {homeResult.data?.recommendList?.map((recommendInfo, idx) => (
        <Recommend
          recommendInfo={recommendInfo}
          isLast={idx + 1 === homeResult.data?.recommendList.length}
        />
      ))}

      {homeResult.data?.recommendUserRank && (
        <UserRankSection category="소설 추천" rankList={homeResult.data.recommendUserRank} />
      )}

      <CategoryMark categoryText={category.randomList}>
        <BtnToLoadContent onClick={() => userNovelListTrigger(2)}>
          다른 유저의 리스트 보기
        </BtnToLoadContent>
      </CategoryMark>

      {userNovelListSelected?.map((list) => (
        <RowSlide
          categoryText={list.listTitle}
          novelNo={list.novel.length}
          novelListInSlide={{
            user: { userImg: list.userImg, userName: list.userName },
            path: "novel-list/created",
            listId: list.listId,
          }}
        >
          {list.novel.map((_) => (
            <NovelRow key={_.novelId} novel={_} isNotSubInfo />
          ))}
        </RowSlide>
      ))}

      {homeResult.data?.novelListUserRank && (
        <UserRankSection category="소설 리스트" rankList={homeResult.data.novelListUserRank} />
      )}

      <CategoryMark categoryText={category.popularNovels}>
        <BtnToLoadContent onClick={() => navigate(`${NOVEL_LIST}/popularNovels`)}>
          모두 보기
        </BtnToLoadContent>
      </CategoryMark>

      {homeResult.data?.popularNovelsInNovelTime && (
        <RowSlideSimple novelNO={homeResult.data.popularNovelsInNovelTime.length}>
          {homeResult.data.popularNovelsInNovelTime.map((novel) => (
            <NovelRow key={novel.novelId} novel={novel} />
          ))}
        </RowSlideSimple>
      )}

      <AddSpace height={16} />

      <CategoryMark categoryText={category.weeklyNovels}>
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
    </MainBG>
  );
}
