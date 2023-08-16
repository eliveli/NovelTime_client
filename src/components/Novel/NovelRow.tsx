// /* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import React from "react";
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
    novelAge?: string;
  };
  isFromSameAuthor?: true;
  isWidth100?: true;
  isNotSubInfo?: true;
}>;
const NovelRow = React.memo(
  ({ novel, isFromSameAuthor, isWidth100, isNotSubInfo }: MyComponentProps) => {
    const { novelId, novelImg, novelTitle, novelAuthor, novelGenre, novelAge } = novel;
    const theme = {};

    return (
      <ThemeProvider theme={theme}>
        <NovelLink isWidth100={isWidth100} to={`/novel-detail/${novelId}`}>
          <NovelImgBox>
            <NovelImg novelImg={novelImg} />
          </NovelImgBox>
          <NovelInfoBox>
            <NovelTitleBox>
              <NovelTitle>{novelTitle}</NovelTitle>
            </NovelTitleBox>
            {!isNotSubInfo && (
              <NovelSubInfoBox>
                {isFromSameAuthor && <NovelInfo>{novelGenre}</NovelInfo>}
                {!isFromSameAuthor && (
                  <NovelInfoLineHeight>{`${novelGenre} | ${novelAuthor}`}</NovelInfoLineHeight>
                )}
              </NovelSubInfoBox>
            )}
          </NovelInfoBox>
        </NovelLink>
      </ThemeProvider>
    );
  },
);
export default NovelRow;
