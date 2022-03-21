import { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "styled-components";
// import { useComponentWidth } from "utils";
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

type NovelProps = React.PropsWithChildren<{
  novel: {
    novelId: string;
    novelImg: string;
    novelTitle: string;
    novelAuthor: string;
    novelGenre: string;
    novelIsEnd: string;
    novelAge: string;
    novelDesc: string;
    novelPlatform: string;
    novelPlatform2?: string;
    novelPlatform3?: string;
    novelUrl: string;
    novelUrl2?: string;
    novelUrl3?: string;

    writingNO: number;
    likeNO: number;

    isLike: boolean;
  };
}>;

export default function NovelDetailInfo({ novel }: NovelProps) {
  // props or default props
  const {
    novelId,
    novelImg = "https://comicthumb-phinf.pstatic.net/20220126_148/pocket_16431735084292970r_JPEG/%C5%A9%B8%AE%BD%BA%C5%BB%BE%C6%B0%A1%BE%BE%B4%C2%B3%B2%C0%DA%B4%D9-%C0%CF%B7%AF%BD%BA%C6%AE%C7%A5%C1%F61.jpg?type=m260", // 시리즈
    // "//dn-img-page.kakao.com/download/resource?kid=1Opki/hzmU0W8saq/pEkrur7BcK1FgYESJqDyXK", // 카카페
    // "https://img.ridicdn.net/cover/372009713/xxlarge#1", // 리디북스
    novelTitle = "제목",
    novelAuthor = "작가",
    novelGenre = "장르",
    novelIsEnd = "완결여부",
    novelAge = "이용가능연령",
    novelDesc = `작품소개`,
    novelPlatform,
    novelPlatform2,
    novelPlatform3, // 없을 경우 백엔드에서 제외해 가져오기
    novelUrl,
    novelUrl2,
    novelUrl3, // 없을 경우 백엔드에서 제외해 가져오기

    writingNO = 0, // 백엔드 - talk, recommend 테이블에서 가져오기
    likeNO = 0, // 백엔드 - talk, recommend 테이블에서 가져오기

    isLike,
  } = novel;
  const theme = {
    novelImg,
  };
  // const infoRef = useRef<HTMLDivElement>(null);
  // const infoWidth = useComponentWidth(infoRef); // 인포컨테이너 width 받아와 제목 엘립시스에 적용

  const [isShowAll, handleShowAll] = useState(false);

  const dispatch = useAppDispatch();
  // const { isLikeNovel } = useAppSelector((state) => state.modal.novelLike);
  // useEffect(() => {
  // 최초 서버스테이트 받아올 때 글로벌 하트여부 설정
  // if (isLikeNovel === undefined) {
  // setLikeNovel({ novelId, isLike });
  // }
  // 아래 [] 안에 넣어야 되나?
  // }, []);

  // 좋아요 수 설정 : 최초 받아온 값 저장 & 이후 버튼 클릭 시
  const [likeNumber, setLikeNumber] = useState(novel.likeNO);

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
                  <NovelInfoTablet>{`${novelGenre} | ${novelIsEnd} | ${novelAge}`}</NovelInfoTablet>

                  <NovelInfoMobile>{`${novelGenre} | ${novelIsEnd}`}</NovelInfoMobile>
                  <NovelInfoMobileAge>{novelAge}</NovelInfoMobileAge>
                </NovelInfoAuthorBox>
                <InfoIconBox>
                  <TextIconBox>
                    <TextIcon />
                    <IconNumber>{writingNO}</IconNumber>
                  </TextIconBox>
                  <LikeIconBox onClick={requestHeart}>
                    <LikeIcon />
                    {/* {isLikeNovel && (
                        <LikeIcon />
                    )}
                    {!isLikeNovel && (
                        <LikeIcon />
                    )} */}
                    <IconNumber>{likeNumber}</IconNumber>
                  </LikeIconBox>
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
                if (_.platform !== undefined) {
                  return (
                    <PlatformText
                      platform={
                        _.platform as "카카오페이지" | "네이버 시리즈" | "리디북스" | "조아라"
                      }
                      href={_.url}
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
