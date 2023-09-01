import { useRef } from "react";
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
    novelIsEnd?: boolean;
  };

  isBorder?: true;
}>;

export default function NovelColumn({ novel, isBorder }: MyComponentProps) {
  const { novelId, novelImg, novelTitle, novelAuthor, novelGenre, novelIsEnd } = novel;
  const theme = {};
  const infoRef = useRef<HTMLDivElement>(null);
  const infoWidth = useComponentWidth(infoRef); // 인포컨테이너 width 받아와 제목 엘립시스에 적용

  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <NovelLink
        isBorder={isBorder}
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
