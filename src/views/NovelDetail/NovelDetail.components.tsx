import { useState, useEffect, useRef } from "react";
import { NovelInDetailPage } from "store/serverAPIs/types";
import Icon from "assets/Icon";
import { useComponentHeight, useWhetherItIsMobile } from "utils";
import { useAppDispatch } from "../../store/hooks";
import { showBigImage } from "../../store/clientSlices/modalSlice";

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
  NovelDescPreview,
  NovelDescFull,
  NovelPlatformBox,
  NovelDescMobile,
  DownIcon,
  ArrowIconBox,
  UpIcon,
  NovelImgBox,
  TextIconBox,
  InfoIconBox,
  IconNumber,
  HandIconBox,
  PlatformIconBox,
  NovelDescTablet,
  NovelAboveDescTablet,
  NovelInfoAgeMobile,
  PlatformText,
  PlatformTextBox,
  PlatformBorder,
} from "./NovelDetail.styles";

export default function NovelDetailInfo({
  novel,
  writingNoWithAllType,
}: {
  novel: NovelInDetailPage;
  writingNoWithAllType?: number;
}) {
  const {
    novelId,
    novelTitle,
    novelImg,
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
  } = novel;

  const dispatch = useAppDispatch();

  const [isShowAll, handleShowAll] = useState(false);

  const descTablet = useRef<HTMLDivElement>(null);
  const descMobile = useRef<HTMLDivElement>(null);
  // - Don't combine refs. useComponentHeight below needs ref in param

  // Don't display down icon for full description when line is 1 in description
  const heightInDescMobile = useComponentHeight(descMobile, novelId, isShowAll);
  const isLine1 = heightInDescMobile < 45;
  // - In contrast, display the icon even if the line is 2, 3
  //               (line 3 is the maximum line in preview description on mobile)
  //   because line break is allowed in full description modal so that user can see with ease

  // Initialize in description component if user clicks other novel the author created
  useEffect(() => {
    handleShowAll(false); // Display description folded on mobile

    descTablet.current?.scrollTo(0, 0); // Scroll to top in description on tablet/desktop
  }, [novelId]);

  const isMobile = useWhetherItIsMobile();

  return (
    <NovelContainer>
      <NovelMainInfo>
        <NovelImgBox onClick={() => dispatch(showBigImage(novelImg))}>
          <NovelImgSmall novelImg={novelImg} />
          <HandIconBox>
            <Icon.Hand />
          </HandIconBox>
        </NovelImgBox>

        <NovelInfoBox>
          <NovelAboveDescTablet>
            <NovelTitle>{novelTitle}</NovelTitle>

            <NovelSubInfoBox>
              <NovelInfoAuthorBox>
                <NovelInfoAuthor>{novelAuthor}</NovelInfoAuthor>

                {isMobile && (
                  <>
                    <NovelInfoMobile>
                      {novelIsEnd ? `${novelGenre} | 완결` : `${novelGenre}`}
                    </NovelInfoMobile>
                    <NovelInfoAgeMobile>{novelAge}</NovelInfoAgeMobile>
                  </>
                )}

                {!isMobile && (
                  <NovelInfoTablet>
                    {novelIsEnd
                      ? `${novelGenre} | 완결 | ${novelAge}`
                      : `${novelGenre} | ${novelAge}`}
                  </NovelInfoTablet>
                )}
              </NovelInfoAuthorBox>

              {!!writingNoWithAllType && (
                <InfoIconBox>
                  <TextIconBox>
                    <Icon.Text />
                  </TextIconBox>
                  <IconNumber>{writingNoWithAllType}</IconNumber>
                </InfoIconBox>
              )}
            </NovelSubInfoBox>
          </NovelAboveDescTablet>

          {!isMobile && <NovelDescTablet ref={descTablet}>{novelDesc}</NovelDescTablet>}
        </NovelInfoBox>
      </NovelMainInfo>

      {isMobile && isShowAll && (
        <NovelDescMobile>
          <NovelDescFull>{novelDesc}</NovelDescFull>

          <ArrowIconBox onClick={() => handleShowAll(false)}>
            <UpIcon />
          </ArrowIconBox>
        </NovelDescMobile>
      )}

      {isMobile && !isShowAll && (
        <NovelDescMobile>
          <NovelDescPreview ref={descMobile}>{novelDesc}</NovelDescPreview>

          {!isLine1 && (
            <ArrowIconBox>
              <DownIcon onClick={() => handleShowAll(true)} />
            </ArrowIconBox>
          )}
        </NovelDescMobile>
      )}

      <NovelPlatformBox>
        <PlatformBorder>
          <PlatformIconBox>
            <Icon.Runner />
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
            <Icon.Reader />
          </PlatformIconBox>
        </PlatformBorder>
      </NovelPlatformBox>
    </NovelContainer>
  );
}
