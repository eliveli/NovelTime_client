// /* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import { useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useComponentWidth } from "utils";
// import Icon from "../assets/Icon";

import {
  NovelImg,
  NovelTitle,
  NovelLink,
  NovelInfoBox,
  NovelInfo,
  NovelSubInfoBox,
  NovelInfoLineHeight,
} from "./NovelColumn.styles";

type MyComponentProps = React.PropsWithChildren<{
  novel: {
    novelId: string;
    novelImg: string;
    userImg: string;
  };
}>;

export default function NovelColumn({ novel }: MyComponentProps) {
  // props or default props
  const {
    novelId = "20220225082010201",
    novelImg = "https://dn-img-page.kakao.com/download/resource?kid=xsaRM/hzhOfrO85M/k1jHoCWYGpQkLzI11JXbA0&filename=th1",
    userImg = "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  } = novel;
  const theme = {
    novelImg,
    userImg,
  };
  const infoRef = useRef<HTMLDivElement>(null);
  const infoWidth = useComponentWidth(infoRef); // 인포컨테이너 width 받아와 제목 엘립시스에 적용
  return (
    <ThemeProvider theme={theme}>
      <NovelLink to={`/novel_detail/${novelId}`}>
        <NovelImg />
        <NovelInfoBox ref={infoRef}>
          <NovelTitle infoWidth={infoWidth}>[해리포터]지독한 후플푸프</NovelTitle>
          <NovelSubInfoBox>
            <NovelInfoLineHeight>곽정언</NovelInfoLineHeight>
            <NovelInfo>패러디 | 미완</NovelInfo>
          </NovelSubInfoBox>
        </NovelInfoBox>
      </NovelLink>
    </ThemeProvider>
  );
}
