/* eslint-disable no-nested-ternary */
import { useNavigate } from "react-router-dom";
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
  GoToAllContentBtn,
} from "./CategoryMark.styles";

export default function CategoryMark({
  writing,
  categoryId,
  categoryText,
  isShowAllMark,
  novelId,
  fontSize,
  userMark,
  novelNO,

  infoFromUserPage,
  linkPath,

  isShowAllButton,

  isNoContent,

  children,
}: {
  writing?: boolean;
  categoryId?: string;
  categoryText: string; // category list request
  isShowAllMark?: boolean;
  novelId?: string; // writing list request by novelId
  fontSize?: number;
  userMark?: {
    userImg: { src: string; position: string };
    userName: string;
  };

  infoFromUserPage?: {
    userName: string;
    path: string;
    list?: {
      isMainCategory: boolean;
      // true when user's all novel list mark, false when user's one novel list mark
      listId: string;
    };
  };

  linkPath?: string;

  isShowAllButton?: string;

  isNoContent?: boolean;

  novelNO?: number;
  children?: React.ReactChild | React.ReactChildren;
}) {
  const navigate = useNavigate();

  if (linkPath) {
    return (
      <CategoryContainer>
        <CategoryDesc fontSize={fontSize}>{categoryText}</CategoryDesc>
        {/* display show-all mark */}
        {isShowAllMark && (
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
        {/* display show-all mark */}
        {isShowAllMark && (
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
        {/* display show-all mark */}
        {isShowAllMark && (
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
        {!userMark && <CategoryDesc isUserNovelList>{`: ${categoryText}`}</CategoryDesc>}
        {userMark && (
          <CategoryDescContnr>
            <CategoryDescUserContnr>
              <CategoryDescUserImg userImg={userMark.userImg} />
              <CategoryDescUserName>
                {`${userMark.userName}의 선호 리스트`}
                &nbsp;
              </CategoryDescUserName>
            </CategoryDescUserContnr>
            <CategoryDesc isUserNovelList isUserMark={userMark !== undefined}>
              {`: ${categoryText}`}
            </CategoryDesc>
          </CategoryDescContnr>
        )}
        {/* the page is not show-all-page */}
        {isShowAllMark && (
          <LinkCategory
            novelNO={novelNO}
            isUserMark={userMark !== undefined}
            to={`/user_page/${infoFromUserPage.userName}/${infoFromUserPage.path}/${infoFromUserPage.list.listId}`}
          >
            <ShowAllText isUserNovelList>이 리스트 모두 보기</ShowAllText>
            <ShowAllIcon />
          </LinkCategory>
        )}
      </CategoryContainer>
    );
  }

  // category mark for all novel list or writings in user page
  if (infoFromUserPage?.list?.isMainCategory || infoFromUserPage) {
    // writing or novel list
    const userPagePath = infoFromUserPage.list?.isMainCategory
      ? `/user_page/${infoFromUserPage.userName}/${infoFromUserPage.path}/${infoFromUserPage.list.listId}`
      : `/user_page/${infoFromUserPage.userName}/${infoFromUserPage.path}`;

    return (
      <CategoryContainer>
        <CategoryDesc fontSize={fontSize}>{categoryText}</CategoryDesc>

        {isShowAllButton && (
          <GoToAllContentBtn
            onClick={() => {
              if (isNoContent) {
                alert("게시글이 존재하지 않아요.");
                return;
              }
              navigate(userPagePath);
            }}
          >
            {isShowAllButton}
          </GoToAllContentBtn>
        )}
      </CategoryContainer>
    );
  }
  return (
    <CategoryContainer>
      <CategoryDesc>{categoryText}</CategoryDesc>
      {/* display show-all mark */}
      {isShowAllMark && (
        <LinkCategory to={`/novel_list/${categoryText}/${categoryId as string}`}>
          <ShowAllText>전체보기</ShowAllText>
          <ShowAllIcon />
        </LinkCategory>
      )}
      {children}
    </CategoryContainer>
  );
}
