import React from "react";
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
    const { novelId, novelImg, novelTitle, novelAuthor, novelGenre } = novel;

    const navigate = useNavigate();

    return (
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
    );
  },
);
export default NovelRow;
