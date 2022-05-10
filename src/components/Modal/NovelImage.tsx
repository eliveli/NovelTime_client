import { closeModal } from "store/clientSlices/modalSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import {
  NovelImgBG,
  NovelImgBig,
  ClosingIcon,
  ClosingBox,
  NovelImgContainer,
} from "./Modal.styles";

export default function NovelImage() {
  const dispatch = useAppDispatch();
  const novelImage = useAppSelector((state) => state.modal.novelImage);

  // 네이버 시리즈 이미지 url 변경, 큰 사이즈 가져오기
  let imgSrc;
  if (novelImage.slice(novelImage.length - 10, novelImage.length) === "?type=m260") {
    imgSrc = novelImage.slice(0, novelImage.indexOf("?type=m260"));
  } else {
    imgSrc = novelImage;
  }

  return (
    <NovelImgBG>
      <NovelImgContainer>
        {/* <NovelImgBig src={imgSrc} /> */}
        <NovelImgBig src={imgSrc} alt="BigSize Image" />
        <ClosingBox onClick={() => dispatch(closeModal())}>
          <ClosingIcon />
        </ClosingBox>
      </NovelImgContainer>
    </NovelImgBG>
  );
}
