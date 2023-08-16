// /* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import { useEffect, useRef } from "react";
import { ThemeProvider } from "styled-components";
import { useComponentWidth } from "utils";
import { useNavigate } from "react-router-dom";

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
    novelTitle: string;
    novelAuthor: string;
    novelGenre: string;
    novelIsEnd: boolean;
    // ㄴ only display this when it is true
    //    when this is false, this info can be wrong info
    //     because I couldn't get this whenever it had changed in the platform
    //     also even in the novel platform this info often doesn't change after the novel is end
  };
}>;

export default function NovelColumn({ novel }: MyComponentProps) {
  const { novelId, novelImg, novelTitle, novelAuthor, novelGenre, novelIsEnd } = novel;
  const theme = {};
  const infoRef = useRef<HTMLDivElement>(null);
  const infoWidth = useComponentWidth(infoRef); // 인포컨테이너 width 받아와 제목 엘립시스에 적용

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <NovelLink
        onClick={() => {
          navigate(`/novel-detail/${novelId}`);
        }}
      >
        <NovelImg novelImg={novelImg} />
        <NovelInfoBox ref={infoRef}>
          <NovelTitle infoWidth={infoWidth}>{novelTitle}</NovelTitle>
          <NovelSubInfoBox>
            <NovelInfoLineHeight>{novelAuthor}</NovelInfoLineHeight>
            {novelIsEnd ? (
              <NovelInfo>{`${novelGenre} | 완결`}</NovelInfo>
            ) : (
              <NovelInfo>{novelGenre}</NovelInfo>
            )}
          </NovelSubInfoBox>
        </NovelInfoBox>
      </NovelLink>
    </ThemeProvider>
  );
}
