// /* eslint-disable */
// 지금은 뷰 구성에 집중할 것임. 린트 무시하는 주석은 나중에 해제하기
import React from "react";
import { ThemeProvider } from "styled-components";
import { useNavigate } from "react-router-dom";
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
  isNotNavigation?: true;
}>;
const NovelRow = React.memo(
  ({ novel, isFromSameAuthor, isWidth100, isNotSubInfo, isNotNavigation }: MyComponentProps) => {
    const { novelId, novelImg, novelTitle, novelAuthor, novelGenre, novelAge } = novel;
    const theme = {};

    const navigate = useNavigate();

    return (
      <ThemeProvider theme={theme}>
        <NovelLink
          isNotNavigation={isNotNavigation}
          isWidth100={isWidth100}
          onClick={() => {
            if (isNotNavigation) return;
            navigate(`/novel-detail/${novelId}`);
          }}
        >
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
