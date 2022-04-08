import { useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useComponentWidth } from "utils";
import Icon from "../../assets/Icon";

import {
  CreateDate,
  LastLineContainer,
  NovelImg,
  UserName,
  Text,
  UserNameBox,
  IconBox,
  TalkTitle,
  NovelTitle,
  IconNO,
  TalkPreview,
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
      userImg: string;
      createDate: string;

      likeNO: number;

      recommendTitle: string;
    };
    novel: {
      novelImg: string;
      novelTitle: string;
      novelAuthor: string;
      novelGenre: string;
      isEnd: boolean;
    };
  };
}

export default function Recommend({ recommendInfo }: RecommendProps) {
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
  const { novelImg, novelTitle, novelAuthor, novelGenre, isEnd } = novel;
  const theme = {
    novelImg,
    userImg,
  };

  const infoRef = useRef<HTMLDivElement>(null);
  const infoWidth = useComponentWidth(infoRef); // 인포컨테이너 width 받아와 제목 엘립시스에 적용

  const navigate = useNavigate();
  return (
    <ThemeProvider theme={theme}>
      <Text
        onClick={() => {
          navigate(`/recommend_detail/${recommendId}`);
        }}
      >
        <NovelContainer>
          <NovelImg />
          <NovelInfoBox ref={infoRef}>
            <NovelTitle infoWidth={infoWidth}>{novelTitle}</NovelTitle>
            <NovelSubInfoBox>
              <NovelInfoLineHeight>{novelAuthor}</NovelInfoLineHeight>
              <NovelInfo>{`${novelGenre} | ${isEnd ? "완결" : "미완"}`}</NovelInfo>
            </NovelSubInfoBox>
          </NovelInfoBox>
        </NovelContainer>

        <UserContainer>
          <TalkPreview>
            <TalkTitle>{recommendTitle}</TalkTitle>
            <RightIconBox>
              <RightIcon />
            </RightIconBox>
          </TalkPreview>

          <LastLineContainer>
            <UserNameBox>
              <UserImg />
              <UserName>{userName}</UserName>
              <CreateDate>{createDate}</CreateDate>
            </UserNameBox>
            <IconBox>
              <Icon.IconBox noPointer size={20}>
                <Icon.Heart />
              </Icon.IconBox>
              <IconNO>{likeNO}</IconNO>
            </IconBox>
          </LastLineContainer>
        </UserContainer>
      </Text>
    </ThemeProvider>
  );
}
