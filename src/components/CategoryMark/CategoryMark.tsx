/* eslint-disable no-nested-ternary */
import {
  CategoryContainer,
  CategoryDesc,
  LinkCategory,
  ShowAllText,
  ShowAllIcon,
  CategoryDescContnr,
  CategoryDescUserImg,
  CategoryDescUserName,
  CategoryDescUserContnr,
} from "./CategoryMark.styles";

export default function CategoryMark({
  writing,
  categoryId,
  categoryText,
  isShowAll,
  novelId,
  fontSize,
  otherUser,
  novelNO,

  infoFromUserPage,
  linkPath,

  children,
}: {
  writing?: boolean;
  categoryId?: string;
  categoryText: string; // category list request
  isShowAll?: boolean;
  novelId?: string; // writing list request by novelId
  fontSize?: number;
  otherUser?: {
    userImg: string;
    userName: string;
  };

  infoFromUserPage?: {
    userName: string;
    path: string;
    list?: {
      isMainCategory: boolean;
      listId: string;
    };
  };

  linkPath?: string;

  novelNO?: number;
  children?: React.ReactChild | React.ReactChildren;
}) {
  if (linkPath) {
    return (
      <CategoryContainer>
        <CategoryDesc fontSize={fontSize}>{categoryText}</CategoryDesc>
        {/* the page is not show-all-page */}
        {!isShowAll && (
          <LinkCategory to={linkPath}>
            <ShowAllText>전체보기</ShowAllText>
            <ShowAllIcon />
          </LinkCategory>
        )}
      </CategoryContainer>
    );
  }
  if (writing) {
    return (
      <CategoryContainer>
        <CategoryDesc fontSize={fontSize}>{categoryText}</CategoryDesc>
        {/* the page is not show-all-page */}
        {!isShowAll && (
          <LinkCategory to={`/novel_detail/${novelId as string}/writing_list`}>
            <ShowAllText>전체보기</ShowAllText>
            <ShowAllIcon />
          </LinkCategory>
        )}
      </CategoryContainer>
    );
  }
  if (novelId) {
    return (
      <CategoryContainer>
        <CategoryDesc>{categoryText}</CategoryDesc>
        {/* the page is not show-all-page */}
        {!isShowAll && (
          <LinkCategory to={`/novel_list/${categoryText}/${categoryId as string}/${novelId}`}>
            <ShowAllText>전체보기</ShowAllText>
            <ShowAllIcon />
          </LinkCategory>
        )}
      </CategoryContainer>
    );
  }

  // category mark for each novel list title on my novel list or other's novel list in user page
  if (infoFromUserPage?.list?.isMainCategory === false) {
    return (
      <CategoryContainer>
        {!otherUser && <CategoryDesc isUserNovelList>{`: ${categoryText}`}</CategoryDesc>}
        {otherUser && (
          <CategoryDescContnr>
            <CategoryDescUserContnr>
              <CategoryDescUserImg userImg={otherUser.userImg} />
              <CategoryDescUserName>
                {`${otherUser.userName}의 선호 리스트`}
                &nbsp;
              </CategoryDescUserName>
            </CategoryDescUserContnr>
            <CategoryDesc isUserNovelList isOtherUser={infoFromUserPage.path === "othersList"}>
              {`: ${categoryText}`}
            </CategoryDesc>
          </CategoryDescContnr>
        )}
        {/* the page is not show-all-page */}
        {!isShowAll && (
          <LinkCategory
            novelNO={novelNO}
            isOtherUser={infoFromUserPage.path === "othersList"}
            to={`/user_page/${infoFromUserPage.userName}/${infoFromUserPage.path}/${infoFromUserPage.list.listId}`}
          >
            <ShowAllText isUserNovelList>이 리스트 전체보기</ShowAllText>
            <ShowAllIcon />
          </LinkCategory>
        )}
      </CategoryContainer>
    );
  }

  // category mark for all novel list or writings in user page
  if (infoFromUserPage?.list?.isMainCategory || infoFromUserPage) {
    // writing or novel list
    const userPageInfo = infoFromUserPage.list?.isMainCategory
      ? {
          path: `/user_page/${infoFromUserPage.userName}/${infoFromUserPage.path}/${infoFromUserPage.list.listId}`,
          text: "더보기",
        }
      : {
          path: `/user_page/${infoFromUserPage.userName}/${infoFromUserPage.path}`,
          text: "전체보기",
        };
    return (
      <CategoryContainer>
        <CategoryDesc fontSize={fontSize}>{categoryText}</CategoryDesc>
        {/* the page is not show-all-page */}
        {!isShowAll && (
          <LinkCategory to={userPageInfo.path}>
            <ShowAllText>{userPageInfo.text}</ShowAllText>
            <ShowAllIcon />
          </LinkCategory>
        )}
      </CategoryContainer>
    );
  }
  return (
    <CategoryContainer>
      <CategoryDesc>{categoryText}</CategoryDesc>
      {/* the page is not show-all-page */}
      {!isShowAll && (
        <LinkCategory to={`/novel_list/${categoryText}/${categoryId as string}`}>
          <ShowAllText>전체보기</ShowAllText>
          <ShowAllIcon />
        </LinkCategory>
      )}
      {children}
    </CategoryContainer>
  );
}
