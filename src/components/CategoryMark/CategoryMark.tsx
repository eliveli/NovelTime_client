import { useNavigate } from "react-router-dom";
import { goToUserPage } from "utils";
import { useAppDispatch } from "store/hooks";
import { handleAlert, openFirstModal } from "store/clientSlices/modalSlice";
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
  novelNO, // not used now

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
      listId?: string;
    };
  };

  linkPath?: string;

  isShowAllButton?: string;

  isNoContent?: boolean;

  novelNO?: number;
  children?: React.ReactChild | React.ReactChildren | React.ReactNode;
}) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  if (linkPath) {
    return (
      <CategoryContainer>
        <CategoryDesc fontSize={fontSize}>{categoryText}</CategoryDesc>

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

        {isShowAllMark && (
          <LinkCategory to={`/novel-detail/${novelId as string}/writing-list`}>
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
              <CategoryDescUserImg
                userImg={userMark.userImg}
                onClick={(e) => goToUserPage(navigate, e, userMark.userName)}
              />
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
        {isShowAllMark && infoFromUserPage.list.listId && (
          <LinkCategory
            // novelNO={novelNO}
            isUserMark={userMark !== undefined}
            to={`/user-page/${infoFromUserPage.userName}/${infoFromUserPage.path}/${infoFromUserPage.list.listId}`}
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
    const userPagePath = () => {
      if (infoFromUserPage.list?.isMainCategory && infoFromUserPage.list.listId) {
        return `/user-page/${infoFromUserPage.userName}/${infoFromUserPage.path}/${infoFromUserPage.list.listId}`;
      }
      if (infoFromUserPage.list?.isMainCategory) {
        return `/user-page/${infoFromUserPage.userName}/${infoFromUserPage.path}`;
      }
      return `/user-page/${infoFromUserPage.userName}/${infoFromUserPage.path}`;
    };

    return (
      <CategoryContainer>
        <CategoryDesc fontSize={fontSize}>{categoryText}</CategoryDesc>

        {isShowAllButton && (
          <GoToAllContentBtn
            onClick={() => {
              if (isNoContent) {
                dispatch(openFirstModal("alert"));
                dispatch(handleAlert({ text: "게시글이 존재하지 않아요." }));
                return;
              }
              navigate(userPagePath());
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

      {isShowAllMark && (
        <LinkCategory to={`/novel-list/${categoryText}/${categoryId as string}`}>
          <ShowAllText>전체보기</ShowAllText>
          <ShowAllIcon />
        </LinkCategory>
      )}
      {children}
    </CategoryContainer>
  );
}
