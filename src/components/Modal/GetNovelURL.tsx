import { closeModal } from "store/clientSlices/modalSlice";
import { useState, useRef } from "react";
import { useWhetherItIsMobile } from "utils";
import Icon from "assets/Icon";
import { useAppDispatch } from "../../store/hooks";

import {
  ModalTitle,
  ContentContnr,
  TranslucentBG,
  ClosingBox,
  ClosingIcon,
  ModalBox,
  SelectHowToContainer,
  SelectHowTo,
  GuideImg,
  GuideImgAlbumContainer,
  GuideImgAlbum,
  ArrowBox,
} from "./Modal.styles";

export default function GetNovelURL() {
  const dispatch = useAppDispatch();

  const imgAlbumContainerRef = useRef<HTMLDivElement>(null);

  const [guideToGetURL, handleGuideToGetURL] = useState<"WithShareLink" | "Directly">(
    "WithShareLink",
  );

  const getImagesWithShareLink = [
    "https://i.imgur.com/fbTkUge.jpg",
    "https://i.imgur.com/VMtHMiv.jpg",
    "https://i.imgur.com/hXapj8A.jpg",
    "https://i.imgur.com/4zkybUu.jpg",
    "https://i.imgur.com/O0s1oK6.jpg",
  ];
  const getImagesDirectly = [
    "https://i.imgur.com/f2Izj4l.jpg",
    "https://i.imgur.com/riX9T5R.jpg",
    "https://i.imgur.com/uIxuKZI.jpg",
    "https://i.imgur.com/hSDSyfz.jpg",
    "https://i.imgur.com/zyk9Jqs.jpg",
  ];

  const getImages = guideToGetURL === "WithShareLink" ? getImagesWithShareLink : getImagesDirectly;

  const isMobile = useWhetherItIsMobile();

  const changeGuide = (category: "WithShareLink" | "Directly") => {
    handleGuideToGetURL(category);

    // go to top in images to guide
    imgAlbumContainerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <TranslucentBG onClick={() => dispatch(closeModal())}>
      <ModalBox
        padding={isMobile ? "25px 15px" : undefined}
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();
        }}
      >
        <ClosingBox isSmallWidth onClick={() => dispatch(closeModal())}>
          <ClosingIcon />
        </ClosingBox>

        <ContentContnr>
          <ModalTitle marginBottom={isMobile ? 10 : undefined}>작품 주소 찾는 법</ModalTitle>
          <SelectHowToContainer>
            <SelectHowTo
              category="WithShareLink"
              selected={guideToGetURL}
              onClick={() => changeGuide("WithShareLink")}
            >
              공유링크 찾기
            </SelectHowTo>
            <SelectHowTo
              category="Directly"
              selected={guideToGetURL}
              onClick={() => changeGuide("Directly")}
            >
              주소 직접 찾기
            </SelectHowTo>
          </SelectHowToContainer>

          <GuideImgAlbumContainer ref={imgAlbumContainerRef}>
            <GuideImgAlbum>
              {getImages.map((img, idx) => (
                <>
                  <GuideImg key={img} src={img} alt="imgToGuide" />
                  {idx !== 4 && (
                    <ArrowBox>
                      <Icon.BigDown />
                    </ArrowBox>
                  )}
                </>
              ))}
            </GuideImgAlbum>
          </GuideImgAlbumContainer>
        </ContentContnr>
      </ModalBox>
    </TranslucentBG>
  );
}
