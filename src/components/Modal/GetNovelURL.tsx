import { closeModal } from "store/clientSlices/modalSlice";
import { useState } from "react";
import { useAppDispatch } from "../../store/hooks";

import {
  ModalTitle,
  ContentContnr,
  TranslucentBG,
  ClosingBox,
  ClosingIcon,
  ModalBox,
  GuideImgContainer,
  SelectHowToContiner,
  SelectHowTo,
  GuideImg,
} from "./Modal.styles";

export default function GetNovelURL() {
  const dispatch = useAppDispatch();

  const [howTo, handleHowTo] = useState<"WithShareLink" | "Directly">("WithShareLink");

  const getImagesWithShareLink = ["https://imgur.com/zjHNbGc.jpg", "https://imgur.com/tgity5M.jpg"];
  const getImagesDirectly = ["https://imgur.com/OtG1C7x.jpg"];

  return (
    <TranslucentBG onClick={() => dispatch(closeModal())}>
      <ModalBox
        onClick={(event: React.MouseEvent<HTMLElement>) => {
          event.stopPropagation();
        }}
      >
        <ClosingBox isSmallWidth onClick={() => dispatch(closeModal())}>
          <ClosingIcon />
        </ClosingBox>
        <ContentContnr>
          <ModalTitle>작품 주소 찾아오기</ModalTitle>
          <SelectHowToContiner>
            <SelectHowTo
              category="WithShareLink"
              selected={howTo}
              onClick={() => handleHowTo("WithShareLink")}
            >
              공유링크 찾기
            </SelectHowTo>
            <SelectHowTo
              category="Directly"
              selected={howTo}
              onClick={() => handleHowTo("Directly")}
            >
              주소 직접 찾기
            </SelectHowTo>
          </SelectHowToContiner>
          <GuideImgContainer>
            {/* 좌/우 화살표 넣기 & 이미지 슬라이드 적용 */}

            {howTo === "WithShareLink" &&
              getImagesWithShareLink.map((img) => <GuideImg key={img} src={img} />)}
            {howTo === "Directly" &&
              getImagesDirectly.map((img) => <GuideImg key={img} src={img} />)}
          </GuideImgContainer>
        </ContentContnr>
      </ModalBox>
    </TranslucentBG>
  );
}
