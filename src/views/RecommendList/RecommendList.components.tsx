import { useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";
import { adjustCreateDate, useComponentWidth } from "utils";
import { Img } from "store/serverAPIs/types";
import Icon from "../../assets/Icon";

import {
  CreateDate,
  LastLineContainer,
  NovelImg,
  UserName,
  Text,
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
} from "./RecommendList.styles";

interface RecommendProps {
  recommendInfo: {
    recommend: {
      recommendId: string;

      userName: string;
      userImg: Img;
      createDate: string;

      likeNO: number;

      recommendTitle: string;
    };
    novel: {
      novelImg: string;
      novelTitle: string;
      novelAuthor: string;
      novelGenre: string;
      novelIsEnd: boolean;
    };
  };
  isLast?: boolean;
}

export default function Recommend({ recommendInfo, isLast }: RecommendProps) {
  // props or default props
  const { recommend, novel } = recommendInfo;
  const {
    recommendId,

    userName,
    userImg,
    createDate,

    likeNO,

    recommendTitle,
  } = recommend;
  const { novelImg, novelTitle, novelAuthor, novelGenre, novelIsEnd } = novel;
  const theme = {
    novelImg,
    userImg,
  };

  const contnrRef = useRef<HTMLElement>(null);
  const contnrWidth = useComponentWidth(contnrRef); // 인포컨테이너 width 받아와 제목 엘립시스에 적용

  const navigate = useNavigate();

  const dateToShow = adjustCreateDate(createDate);

  return (
    <ThemeProvider theme={theme}>
      <Text
        isLast={isLast}
        ref={contnrRef}
        onClick={() => {
          navigate(`/recommend-detail/${recommendId}`);
        }}
      >
        <NovelContainer>
          <NovelImg />
          <NovelInfoBox>
            <NovelTitle contnrWidth={contnrWidth}>{novelTitle}</NovelTitle>
            <NovelSubInfoBox>
              <NovelInfoLineHeight>{novelAuthor}</NovelInfoLineHeight>
              <NovelInfo>{`${novelGenre} | ${novelIsEnd ? "완결" : "미완"}`}</NovelInfo>
            </NovelSubInfoBox>
          </NovelInfoBox>
        </NovelContainer>

        <UserContainer>
          <RecommendPreview>
            <RecommendTitle contnrWidth={contnrWidth}>{recommendTitle}</RecommendTitle>
            <RightIconBox>
              <RightIcon />
            </RightIconBox>
          </RecommendPreview>

          <LastLineContainer>
            <UserNameBox>
              <UserImg />
              <UserName>{userName}</UserName>
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
      </Text>
    </ThemeProvider>
  );
}
