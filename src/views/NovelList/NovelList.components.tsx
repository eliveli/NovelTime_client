/* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import { ThemeProvider } from "styled-components";

import {
  CreateDate,
  LastLineContainer,
  NovelImg,
  UserName,
  NovelsBG,
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
  RowBG,
  ColumnBG,
  RowSlideContainer,
  SlideLeft,
  SlideRight,
  LeftIcon,
  RightIcon,
} from "./NovelList.styles";

type MyComponentProps = React.PropsWithChildren<{ imgHeight?: number }>;

interface TextProps {
  novelImg: string;
  userImg: string;
}
export default function Novels({ children }: MyComponentProps) {
  return <NovelsBG>{children}</NovelsBG>;
}

Novels.RowSlide = function ({ imgHeight = 133, children }: MyComponentProps) {
  return (
    <RowSlideContainer>
      <RowBG>{children}</RowBG>
      <LeftIcon imgHeight={imgHeight}>
        <SlideLeft />
      </LeftIcon>
      <RightIcon imgHeight={imgHeight}>
        <SlideRight />
      </RightIcon>
    </RowSlideContainer>
  );
};
Novels.ColumnSlide = function ({ children }: MyComponentProps) {
  return <ColumnBG>{children}</ColumnBG>;
};

//--------------------아래는 참고용-------------------------------------------------------------

Novels.Text = function ({ novel }: { novel: TextProps }) {
  // props or default props
  const {
    novelImg = "https://dn-img-page.kakao.com/download/resource?kid=xsaRM/hzhOfrO85M/k1jHoCWYGpQkLzI11JXbA0&filename=th1",
    userImg = "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  } = novel;
  const theme = {
    novelImg,
    userImg,
  };

  return (
    <ThemeProvider theme={theme}>
      {/* <Text>
        <NovelContainer>
          <NovelImg />
          <NovelInfoBox>
            <NovelTitle>[해리포터]지독한 후플푸프</NovelTitle>
            <NovelSubInfoBox>
              <NovelInfoLineHeight>곽정언</NovelInfoLineHeight>
              <NovelInfo>패러디 | 미완</NovelInfo>
            </NovelSubInfoBox>
          </NovelInfoBox>
        </NovelContainer>

        <UserContainer>
          <TalkPreview>
            <TalkTitle>꾸준히 인기 많은 해포 패러디 계의 탑 작품이야 한 번 봐 봐</TalkTitle>
            <Icon.Right />
          </TalkPreview>

          <LastLineContainer>
            <UserNameBox>
              <UserImg />
              <UserName>Nana</UserName>
              <CreateDate>22.01.01</CreateDate>
            </UserNameBox>
            <IconBox>
              <Icon.Heart />
              <IconNO>7</IconNO>
            </IconBox>
          </LastLineContainer>
        </UserContainer>
      </Text> */}
    </ThemeProvider>
  );
};
