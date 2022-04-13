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
    novelTitle: string;
    novelAuthor: string;
    novelGenre: string;
    novelIsEnd: string;
  };
  isWidth100?: true;
  isNotSubInfo?: true;
}>;
export default function NovelRow({ novel, isWidth100, isNotSubInfo }: MyComponentProps) {
  // props or default props
  const {
    novelId = "",
    novelImg = "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
    // "//dn-img-page.kakao.com/download/resource?kid=1Opki/hzmU0W8saq/pEkrur7BcK1FgYESJqDyXK", // 카카페
    // "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
    novelTitle = "제목",
    novelAuthor = "작가",
    novelGenre = "장르",
    novelIsEnd = "완결여부",
  } = novel;
  const theme = {};

  return (
    <ThemeProvider theme={theme}>
      <NovelLink isWidth100={isWidth100} to={`/novel_detail/${novelId}`}>
        <NovelImgBox>
          <NovelImg novelImg={novelImg} />
        </NovelImgBox>
        <NovelInfoBox>
          <NovelTitleBox>
            <NovelTitle>{novelTitle}</NovelTitle>
          </NovelTitleBox>
          {!isNotSubInfo && (
            <NovelSubInfoBox>
              <NovelInfoLineHeight>{novelAuthor}</NovelInfoLineHeight>
              <NovelInfo>{`${novelGenre} | ${novelIsEnd}`}</NovelInfo>
            </NovelSubInfoBox>
          )}
        </NovelInfoBox>
      </NovelLink>
    </ThemeProvider>
  );
}
