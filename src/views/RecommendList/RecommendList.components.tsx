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

interface TextProps {
  recommendId: string;
  novelImg: string;
  userImg: string;
}

export default function Recommend({ text }: { text: TextProps }) {
  // props or default props
  const {
    novelImg = "https://dn-img-page.kakao.com/download/resource?kid=xsaRM/hzhOfrO85M/k1jHoCWYGpQkLzI11JXbA0&filename=th1",
    userImg = "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
    recommendId,
  } = text;
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
            <NovelTitle infoWidth={infoWidth}>[해리포터]지독한 후플푸프</NovelTitle>
            <NovelSubInfoBox>
              <NovelInfoLineHeight>곽정언</NovelInfoLineHeight>
              <NovelInfo>패러디 | 미완</NovelInfo>
            </NovelSubInfoBox>
          </NovelInfoBox>
        </NovelContainer>

        <UserContainer>
          <TalkPreview>
            <TalkTitle>꾸준히 인기 많은 해포 패러디 계의 탑 작품이야 한 번 봐 봐</TalkTitle>
            <RightIconBox>
              <RightIcon />
            </RightIconBox>
          </TalkPreview>

          <LastLineContainer>
            <UserNameBox>
              <UserImg />
              <UserName>Nana</UserName>
              <CreateDate>22.01.01</CreateDate>
            </UserNameBox>
            <IconBox>
              <Icon.IconBox noPointer size={20}>
                <Icon.Heart />
              </Icon.IconBox>
              <IconNO>7</IconNO>
            </IconBox>
          </LastLineContainer>
        </UserContainer>
      </Text>
    </ThemeProvider>
  );
}
