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
  userInfo,
  isUserList,
  novelNO,
}: {
  writing?: boolean;
  categoryId?: string;
  categoryText: string; // category list request
  isShowAll?: boolean;
  novelId?: string; // writing list request by novelId
  fontSize?: number;
  userInfo?: {
    userImg: string;
    userName: string;
  };
  isUserList?: true;
  novelNO?: number;
}) {
  if (writing) {
    return (
      <CategoryContainer>
        <CategoryDesc fontSize={fontSize}>{categoryText}</CategoryDesc>
        {/* when is not show-all-page */}
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
        {/* when is not show-all-page */}
        {!isShowAll && (
          <LinkCategory to={`/novel_list/${categoryText}/${categoryId as string}/${novelId}`}>
            <ShowAllText>전체보기</ShowAllText>
            <ShowAllIcon />
          </LinkCategory>
        )}
      </CategoryContainer>
    );
  }
  if (isUserList) {
    return (
      <CategoryContainer>
        {!userInfo && <CategoryDesc isUserList>{`: ${categoryText}`}</CategoryDesc>}
        {userInfo && (
          <CategoryDescContnr>
            <CategoryDescUserContnr>
              <CategoryDescUserImg userImg={userInfo.userImg} />
              <CategoryDescUserName>
                {`${userInfo.userName}의 선호 리스트`}
                &nbsp;
              </CategoryDescUserName>
            </CategoryDescUserContnr>
            <CategoryDesc isUserList isOtherUser>
              {`: ${categoryText}`}
            </CategoryDesc>
          </CategoryDescContnr>
        )}
        {/* when is not show-all-page */}
        {!isShowAll && (
          <LinkCategory
            novelNO={novelNO}
            isOtherUser
            // change link later
            to={`/novel_list/${categoryText}/${categoryId as string}/${novelId}`}
          >
            <ShowAllText isUserList>리스트 전체보기</ShowAllText>
            <ShowAllIcon />
          </LinkCategory>
        )}
      </CategoryContainer>
    );
  }

  return (
    <CategoryContainer>
      <CategoryDesc>{categoryText}</CategoryDesc>
      {/* when is not show-all-page */}
      {!isShowAll && (
        <LinkCategory to={`/novel_list/${categoryText}/${categoryId as string}`}>
          <ShowAllText>전체보기</ShowAllText>
          <ShowAllIcon />
        </LinkCategory>
      )}
    </CategoryContainer>
  );
}
