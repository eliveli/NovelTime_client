/* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import { ThemeProvider } from "styled-components";
import { FaChevronRight, FaRegHeart } from "react-icons/fa";
import { AiOutlineRight } from "react-icons/ai";
import {
  CreateDate,
  FirstLineContainer,
  NovelImg,
  UserName,
  RecommendBG,
  Text,
  UserNameBox,
  IconBox,
  TalkTitle,
  NovelTitle,
  TalkImg,
  IconNO,
  TalkPreview,
  UserContainer,
  TalkImgBox,
  NovelContainer,
  NovelInfoBox,
  UserImg,
  NovelInfo,
  NovelSubInfoBox,
  NovelInfoLineHeight,
  // setImgUrl,
} from "./RecommendList.styles";

type MyComponentProps = React.PropsWithChildren<{}>;

function Recommend({ children }: MyComponentProps) {
  return <RecommendBG>{children}</RecommendBG>;
}
export default Recommend;
// function TitleWithMore() {
//     return (
//       <TalkPreview>
//         <TalkTitle>꾸준히 인기 많은 해포 패러디 계의 탑 작품이야 한 번 봐 봐</TalkTitle>
//         <AiOutlinePlusCircle />
//       </TalkPreview>
//     );
//   }
Recommend.Text = function (textProps) {
  // props or default props
  const {
    novelImg = "https://dn-img-page.kakao.com/download/resource?kid=xsaRM/hzhOfrO85M/k1jHoCWYGpQkLzI11JXbA0&filename=th1",
    userImg = "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  } = textProps;
  const theme = {
    novelImg,
    userImg,
  };

  return (
    <ThemeProvider theme={theme}>
      <Text>
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
            <FaChevronRight
              style={{ margin: "auto", color: "rgba(100, 100, 100, 0.5)", marginLeft: "6px" }}
            />
          </TalkPreview>

          <FirstLineContainer>
            <UserNameBox>
              <UserImg />
              <UserName>Nana</UserName>
              <CreateDate>22.01.01</CreateDate>
            </UserNameBox>
            <IconBox>
              <FaRegHeart />
              <IconNO>7</IconNO>
            </IconBox>
          </FirstLineContainer>
        </UserContainer>
      </Text>
    </ThemeProvider>
  );
};
