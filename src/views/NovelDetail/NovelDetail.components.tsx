import { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
// import { useComponentWidth } from "utils";
import { NovelInDetailPage } from "store/serverAPIs/types";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
// import { setLikeNovel } from "../../store/clientSlices/modalSlice";
import { showBigImage, setLikeNovel } from "../../store/clientSlices/modalSlice";

import {
  NovelMainInfo,
  NovelImgSmall,
  NovelInfoBox,
  NovelTitle,
  NovelSubInfoBox,
  NovelInfoAuthor,
  NovelInfoAuthorBox,
  NovelInfoMobile,
  NovelInfoTablet,
  NovelContainer,
  NovelDescPart,
  NovelDescAll,
  NovelPlatformBox,
  NovelDescMobile,
  DownIconBox,
  DownIcon,
  UpIconBox,
  UpIcon,
  NovelImgBox,
  TextIconBox,
  TextIcon,
  LikeIconBox,
  LikeIcon,
  InfoIconBox,
  IconNumber,
  HandIconBox,
  HandIcon,
  PlatformIconBox,
  RunnerIcon,
  ReaderIcon,
  NovelDescTablet,
  NovelUpDescBox,
  NovelInfoMobileAge,
  PlatformText,
  PlatformTextBox,
  PlatformBorder,
} from "./NovelDetail.styles";

export default function NovelDetailInfo({ novel }: { novel: NovelInDetailPage }) {
  // props or default props
  const {
    novelId,
    novelImg,
    novelTitle,
    novelAuthor,
    novelGenre,
    novelIsEnd,
    novelAge,
    novelDesc,
    novelPlatform,
    novelPlatform2,
    novelPlatform3,
    novelUrl,
    novelUrl2,
    novelUrl3,

    writingNo,
  } = novel;
  const theme = {
    novelImg,
  };
  // const infoRef = useRef<HTMLDivElement>(null);
  // const infoWidth = useComponentWidth(infoRef); // 인포컨테이너 width 받아와 제목 엘립시스에 적용

  const [isShowAll, handleShowAll] = useState(false);

  const dispatch = useAppDispatch();

  const requestHeart = () => {
    // 하트 클릭 시
    // 1. server api request 서버에 요청, 하트 수 받아오기
    //  --좋아요 토글 후 해당 시점의 좋아요 수 받아오는 쿼리
    // const { data, error, isLoading } = useSetLikelByNovelIdQuery("20220227200633023");
    // setLikeNumber(data.likeNO);
    // 2. global state 하트 여부 변경
    // dispatch(setLikeNovel({ novelId, isLike: !isLikeNovel }));
  };
  return (
    <ThemeProvider theme={theme}>
      <NovelContainer>
        <NovelMainInfo>
          <NovelImgBox onClick={() => dispatch(showBigImage(novelImg))}>
            <NovelImgSmall />
            <HandIconBox>
              <HandIcon />
            </HandIconBox>
          </NovelImgBox>

          <NovelInfoBox>
            <NovelUpDescBox>
              <NovelTitle>{novelTitle}</NovelTitle>
              <NovelSubInfoBox>
                <NovelInfoAuthorBox>
                  <NovelInfoAuthor>{novelAuthor}</NovelInfoAuthor>
                  <NovelInfoTablet>
                    {`${novelGenre} | ${novelIsEnd ? "완결" : "미완"} | ${novelAge}`}
                  </NovelInfoTablet>

                  <NovelInfoMobile>
                    {`${novelGenre} | ${novelIsEnd ? "완결" : "미완"}`}
                  </NovelInfoMobile>
                  <NovelInfoMobileAge>{novelAge}</NovelInfoMobileAge>
                </NovelInfoAuthorBox>
                <InfoIconBox>
                  <TextIconBox>
                    <TextIcon />
                    <IconNumber>{writingNo}</IconNumber>
                  </TextIconBox>
                </InfoIconBox>
              </NovelSubInfoBox>
            </NovelUpDescBox>

            <NovelDescTablet>{novelDesc}</NovelDescTablet>
          </NovelInfoBox>
        </NovelMainInfo>
        {isShowAll && (
          <NovelDescMobile>
            <NovelDescAll>{novelDesc}</NovelDescAll>
            <UpIconBox onClick={() => handleShowAll(false)}>
              <UpIcon />
            </UpIconBox>
          </NovelDescMobile>
        )}
        {!isShowAll && (
          <NovelDescMobile>
            <NovelDescPart>{novelDesc}</NovelDescPart>
            <DownIconBox>
              <DownIcon onClick={() => handleShowAll(true)} />
            </DownIconBox>
          </NovelDescMobile>
        )}
        <NovelPlatformBox>
          <PlatformBorder>
            <PlatformIconBox>
              <RunnerIcon />
            </PlatformIconBox>

            {/* 넘어온 플랫폼에 한해 플랫폼 보이기 */}
            <PlatformTextBox>
              {[
                { platform: novelPlatform, url: novelUrl },
                { platform: novelPlatform2, url: novelUrl2 },
                { platform: novelPlatform3, url: novelUrl3 },
              ].map((_) => {
                if (_.platform) {
                  return (
                    <PlatformText
                      key={_.platform}
                      platform={
                        _.platform as "카카오페이지" | "네이버 시리즈" | "리디북스" | "조아라"
                      }
                      href={_.url.includes("https://") ? _.url : `https://${_.url}`}
                      target="_blank"
                    >
                      {(() => {
                        switch (_.platform) {
                          case "카카오페이지":
                            return "카카페";
                          case "네이버 시리즈":
                            return "시리즈";
                          case "리디북스":
                            return _.platform;
                          case "조아라":
                            return _.platform;
                          default:
                            return "플랫폼";
                        }
                      })()}
                    </PlatformText>
                  );
                }
              })}
            </PlatformTextBox>
            <PlatformIconBox>
              <ReaderIcon />
            </PlatformIconBox>
          </PlatformBorder>
        </NovelPlatformBox>
      </NovelContainer>
    </ThemeProvider>
  );
}
