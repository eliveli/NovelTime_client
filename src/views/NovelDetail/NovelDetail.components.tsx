import { useState } from "react";
import { ThemeProvider } from "styled-components";
// import { useComponentWidth } from "utils";
import { CategoryMark } from "components/NovelCategoryMark";
import { useAppDispatch } from "../../store/hooks";
import { showBigImage } from "../../store/clientSlices/modalSlice";

import {
  NovelsBG,
  NovelMainInfo,
  NovelImgSmall,
  NovelInfoBox,
  NovelTitle,
  NovelSubInfoBox,
  NovelInfoAuthor,
  NovelInfoAuthorBox,
  NovelInfoMobile,
  NovelInfoTablet,
  ColumnBG,
  ColumnListContainer,
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

type Props = React.PropsWithChildren<{ isShowAll?: boolean; category: string }>;

type NovelProps = React.PropsWithChildren<{
  novel: {
    novelId: string;
    novelImg: string;
    userImg: string;
  };
}>;
export default function Novel({ children }: { children: React.ReactNode }) {
  return <NovelsBG>{children}</NovelsBG>;
}

Novel.NovelInfo = function NovelDetailInfo({ novel }: NovelProps) {
  // props or default props
  const {
    // novelId = "20220225082010201",
    novelImg = "https://dn-img-page.kakao.com/download/resource?kid=xsaRM/hzhOfrO85M/k1jHoCWYGpQkLzI11JXbA0&filename=th1",
    userImg = "https://cdn.pixabay.com/photo/2018/08/31/08/35/toys-3644073_960_720.png",
  } = novel;
  const theme = {
    novelImg,
    userImg,
  };
  // const infoRef = useRef<HTMLDivElement>(null);
  // const infoWidth = useComponentWidth(infoRef); // 인포컨테이너 width 받아와 제목 엘립시스에 적용

  const [isShowAll, handleShowAll] = useState(false);

  const dispatch = useAppDispatch();

  const desc = `[에이번데일 백작의 저택]

  “누구세요……?”
  “그건 내가 할 말인 것 같은데.”
  
  히든 에피소드를 열고 들어간 폐가에서 만난 금발의 미남자.
  알고 보니 그는 이미 죽었어야 할 천재 마도 공학자였다.
  
  가상 현실 게임 ‘황금 발톱’의 배경으로부터 13년 전에 떨어진 에스페란사.
  졸지에 몬스터도 없는 세상에서 세계 최강이 되고 말았다.
  원래 세상으로 돌아가기 위해선 '황금 발톱'을 찾아 퀘스트를 클리어해야 하는데…!
  
  “당신을 왜 해부하겠어요? 살아 있는 채로 연구할 수 있는 게 훨씬 많은데.”
  
  유일한 조력자는 이런 소름 돋는 소리를 아무렇지 않게 하질 않나,
  
  “그럼 피 한 방울만 주지 않을래요? 딱 한 방울만.”
  
  피까지 뽑아 가려고 한다.
  
  이 퀘스트… 성공할 수 있을까?`;

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
              <NovelTitle>헌터와 매드 사이언티스트</NovelTitle>
              <NovelSubInfoBox>
                <NovelInfoAuthorBox>
                  <NovelInfoAuthor>델마르</NovelInfoAuthor>
                  <NovelInfoTablet>로판 | 완결 | 전체연령가</NovelInfoTablet>

                  <NovelInfoMobile>로판 | 완결</NovelInfoMobile>
                  <NovelInfoMobileAge>전체연령가</NovelInfoMobileAge>
                </NovelInfoAuthorBox>
                <InfoIconBox>
                  <TextIconBox>
                    <TextIcon />
                    <IconNumber>9</IconNumber>
                  </TextIconBox>
                  <LikeIconBox>
                    <LikeIcon />
                    <IconNumber>7</IconNumber>
                  </LikeIconBox>
                </InfoIconBox>
              </NovelSubInfoBox>
            </NovelUpDescBox>

            <NovelDescTablet>{desc}</NovelDescTablet>
          </NovelInfoBox>
        </NovelMainInfo>
        {isShowAll && (
          <NovelDescMobile>
            <NovelDescAll>{desc}</NovelDescAll>
            <UpIconBox onClick={() => handleShowAll(false)}>
              <UpIcon />
            </UpIconBox>
          </NovelDescMobile>
        )}
        {!isShowAll && (
          <NovelDescMobile>
            <NovelDescPart>{desc}</NovelDescPart>
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
            <PlatformTextBox>
              <PlatformText
                platform="카카오페이지"
                href="https://page.kakao.com/main"
                target="_blank"
              >
                카카페
              </PlatformText>
              <PlatformText platform="네이버 시리즈" href="" target="_blank">
                시리즈
              </PlatformText>
              <PlatformText platform="리디북스" href="" target="_blank">
                리디북스
              </PlatformText>
              <PlatformText platform="조아라" href="" target="_blank">
                조아라
              </PlatformText>
            </PlatformTextBox>
            <PlatformIconBox>
              <ReaderIcon />
            </PlatformIconBox>
          </PlatformBorder>
        </NovelPlatformBox>
      </NovelContainer>
    </ThemeProvider>
  );
};
Novel.Column = function Column({ category, children }: Props) {
  return (
    <ColumnBG>
      <CategoryMark category={category} />
      <ColumnListContainer>{children}</ColumnListContainer>
    </ColumnBG>
  );
};
