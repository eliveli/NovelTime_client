import { useNavigate } from "react-router-dom";
import { adjustCreateDate, goToUserPage } from "utils";
import { RecommendInList } from "store/serverAPIs/types";
import Icon from "../../assets/Icon";

import {
  CreateDate,
  LastLineContainer,
  NovelImg,
  UserName,
  ContainerForAll,
  UserNameBox,
  IconBox,
  RecommendTitle,
  NovelTitle,
  IconNO,
  RecommendPreview,
  UserContainer,
  NovelContainer,
  NovelInfoBox,
  UserImg,
  NovelInfo,
  NovelSubInfoBox,
  NovelInfoLineHeight,
  RightIcon,
  RightIconBox,
  RecommendDesc,
  TitleAndDescContainer,
  RecommendTitleOnDesc,
  RecommendTitleContainer,
} from "./RecommendList.styles";

interface RecommendProps {
  recommendInfo: RecommendInList;
  isLast?: boolean;
}

export default function Recommend({ recommendInfo, isLast }: RecommendProps) {
  const { recommend, novel } = recommendInfo;
  const { recommendId, userName, userImg, createDate, likeNO, recommendTitle, recommendDesc } =
    recommend;
  const { novelImg, novelTitle, novelAuthor, novelGenre, novelIsEnd } = novel;

  const navigate = useNavigate();

  const dateToShow = adjustCreateDate(createDate);

  return (
    <ContainerForAll
      isLast={isLast}
      onClick={() => {
        navigate(`/recommend-detail/${recommendId}`);
      }}
    >
      <NovelContainer isDesc={!!recommendDesc}>
        <NovelImg novelImg={novelImg} />
        <NovelInfoBox>
          <NovelTitle>{novelTitle}</NovelTitle>
          <NovelSubInfoBox>
            <NovelInfoLineHeight>{novelAuthor}</NovelInfoLineHeight>
            {novelIsEnd ? (
              <NovelInfo>{`${novelGenre} | 완결`}</NovelInfo>
            ) : (
              <NovelInfo>{novelGenre}</NovelInfo>
            )}
          </NovelSubInfoBox>
        </NovelInfoBox>
      </NovelContainer>

      <UserContainer>
        <RecommendPreview isDesc={!!recommendDesc}>
          {recommendDesc ? (
            <TitleAndDescContainer>
              <RecommendTitleOnDesc>{recommendTitle}</RecommendTitleOnDesc>
              <RecommendDesc>{recommendDesc}</RecommendDesc>
            </TitleAndDescContainer>
          ) : (
            <RecommendTitleContainer>
              <RecommendTitle>{recommendTitle}</RecommendTitle>
            </RecommendTitleContainer>
          )}

          <RightIconBox>
            <RightIcon />
          </RightIconBox>
        </RecommendPreview>

        <LastLineContainer>
          <UserNameBox>
            <UserImg userImg={userImg} onClick={(e) => goToUserPage(navigate, e, userName)} />
            <UserName onClick={(e) => goToUserPage(navigate, e, userName)}>{userName}</UserName>
            <CreateDate>{dateToShow}</CreateDate>
          </UserNameBox>
          <IconBox>
            <Icon.IconBox noPointer size={20}>
              <Icon.SmallHeart />
            </Icon.IconBox>
            <IconNO>{likeNO}</IconNO>
          </IconBox>
        </LastLineContainer>
      </UserContainer>
    </ContainerForAll>
  );
}
