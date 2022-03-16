// /* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import { ThemeProvider } from "styled-components";
import {
  NovelImg,
  NovelImgBox,
  NovelTitle,
  NovelLink,
  NovelInfoBox,
  NovelInfo,
  NovelSubInfoBox,
  NovelInfoLineHeight,
  NovelTitleBox,
} from "./NovelRow.styles";

type MyComponentProps = React.PropsWithChildren<{
  novel: {
    novelId: string;
    novelImg: string;
    userImg: string;
  };
}>;
export default function NovelRow({ novel }: MyComponentProps) {
  // props or default props
  const {
    novelId = "20220225082010201",
    novelImg = "https://dn-img-page.kakao.com/download/resource?kid=xsaRM/hzhOfrO85M/k1jHoCWYGpQkLzI11JXbA0",
    userImg = "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  } = novel;
  const theme = {
    novelImg,
    userImg,
  };

  return (
    <ThemeProvider theme={theme}>
      <NovelLink to={`/novel_detail/${novelId}`}>
        <NovelImgBox>
          <NovelImg />
        </NovelImgBox>
        <NovelInfoBox>
          <NovelTitleBox>
            <NovelTitle>[해리포터]지독한 후플푸프</NovelTitle>
          </NovelTitleBox>
          <NovelSubInfoBox>
            <NovelInfoLineHeight>곽정언</NovelInfoLineHeight>
            <NovelInfo>패러디 | 미완</NovelInfo>
          </NovelSubInfoBox>
        </NovelInfoBox>
      </NovelLink>
    </ThemeProvider>
  );
}
